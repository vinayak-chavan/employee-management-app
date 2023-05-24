import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import * as helpers from '../../helpers';
import { getTime, getTotalMinutes, getFinalLog } from '../../helpers/attendance';
import { DailyAttendance } from '../../models';


export const addAttendance = async (req, res) => {
  try {
    const day = new Date();
    const { employeeId } = req.params;

    const [attendance] = await DailyAttendance.findOrCreate({
      where: {
        [Op.and]: [{ employeeId }, { date: day.getDate() }],
      },
      defaults: {
        id: uuidv4(),
        employeeId,
        date: day.getDate(),
        log: [],
      },
    });

    // check whether employee is on leave
    // if true then attendance.isOnLeave = true; totalHour = 0;
    if (attendance.isOnLeave) {
      return helpers.errorResponse(req, res, 'employee is on leave', 400);
    }

    // else if not on leave
    const timeLog = attendance.log;
    if (req.body.startDate) {
      if (getTime(new Date(req.body.startDate)) < getTime(new Date())) {
        return helpers.errorResponse(req, res, 'Invalid input date', 406);
      }

      // if last log only have start but not end key then new session can't start
      if (timeLog.toString() && !Object.prototype.hasOwnProperty.call(timeLog[(timeLog.length || 1) - 1], 'end')) {
        return helpers.errorResponse(req, res, 'one session is already running', 401);
      }

      // take start date in boject and push it to array.
      const start = new Date(req.body.startDate);
      const obj = { start };
      timeLog.push(obj);
    } else if (req.body.endDate) {
      // if last session has end property than it can not be edited.
      if (!timeLog) {
        return helpers.errorResponse(req, res, 'no session running', 401);
      }

      if (Object.prototype.hasOwnProperty.call(timeLog[timeLog.length - 1], 'end')) {
        return helpers.errorResponse(req, res, 'session is already ended', 401);
      }

      const end = new Date(req.body.endDate);
      timeLog[timeLog.length - 1].end = end;

      // count total hour in current session and add to hour count
      // hour count stores total minutes.
      attendance.totalMinutes = getTotalMinutes(
        Number(attendance.totalMinutes),
        timeLog[timeLog.length - 1].start,
        timeLog[timeLog.length - 1].end,
      );

      // at end of session data dayId, log, will be passed to monthly table
      attendance.finalLog = getFinalLog(attendance);
    }

    attendance.log = timeLog;
    const result = await DailyAttendance.update(
      {
        totalMinutes: attendance.totalMinutes,
        log: attendance.log,
        finalLog: attendance.finalLog,
      },
      {
        where: {
          id: attendance.id,
          date: day.getDate(),
        },
        returning: true,
        plain: true,
      },
    );

    res.status(201);
    return helpers.successResponse(req, res, result, 201);
  } catch (error) {
    return helpers.errorResponse(req, res, 'Attendance punching Error', 500, error.message);
  }
};

export const getAttendance = async (req, res) => {
  try {
    const date = new Date();
    const month = (Number(req.query.month) || date.getMonth()) + 1;
    const year = Number(req.query.year) || date.getFullYear();

    const attendance = await DailyAttendance.findAll(
      {
        attributes: ['date', 'finalLog', 'log', 'isOnLeave'],
        where: {
          employeeId: req.params.employeeId,
          month,
          year,
        },
      },
    );

    res.status(200);
    if (!attendance.toString()) {
      return helpers.successResponse(req, res, 'NA', 200);
    }
    return helpers.successResponse(req, res, attendance, 200);
  } catch (error) {
    return helpers.errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

export const getAttendanceView = (req, res) => {
  res.status(200);
  return res.render('employee/attendance');
};
