import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { errorResponse, successResponse } from '../../helpers';
import {
  Leave, ProjectEmployee, Employee, DailyAttendance,
} from '../../models';
import transporter from '../../helpers/mail';
import * as constantVar from '../../constants/index';

// ------------ get dates between two dates
function getDatesBetween(startDate1, endDate2) {
  const arrayDates = [];
  const oneDay = 24 * 3600 * 1000;
  let ms = startDate1 * 1;
  const last = endDate2 * 1;
  for (; ms < last; ms += oneDay) {
    arrayDates.push(new Date(ms));
  }
  arrayDates.push(new Date(ms + 1));
  return arrayDates;
}

// ----------- send mail to pm(add leave)
async function sendMailToPM(req, leavedata) {
  const devId = req.user.id;

  // to find respective PM of DEVELOPER
  let projectIds = await ProjectEmployee.findAll({ where: { employeeId: devId } });
  projectIds = projectIds.map(element => element.projectId);
  let roleData = await Employee.findAll({
    include: [{
      model: ProjectEmployee,
      where: { projectId: projectIds },
    }],
    where: { role: constantVar.PM },
  });
  roleData = roleData.map(element => element.email);

  // to send leave request mail to all PM
  roleData.forEach((element) => {
    const mailOptions = {
      from: constantVar.MAIL_ID, // system address
      to: element,
      subject: 'Leave Request',
      text: `Employee ${req.user.email}, wants to take leave from ${leavedata.startDate},
        to ${leavedata.endDate} due to ${leavedata.reason}`,
    };
    transporter.sendMail(mailOptions);
  });
}

// ------------ send mail to PM(update leave)

async function sendUpdatedMailToPM(req, leavedata) {
  const devId = req.user.id;
  let mailOptions = {};

  // to find respective PM of DEVELOPER
  let projectIds = await ProjectEmployee.findAll({ where: { employeeId: devId } });
  projectIds = projectIds.map(element => element.projectId);
  let roleData = await Employee.findAll({
    include: [{
      model: ProjectEmployee,
      where: { projectId: projectIds },
    }],
    where: { role: constantVar.PM },
  });
  roleData = roleData.map(element => element.email);

  roleData.forEach((element) => {
    // to check if leave detail is not deleted by DEV
    if (leavedata.isArchived !== 'on') {
      mailOptions = {
        from: constantVar.MAIL_ID, // system address
        to: element, // PM address
        subject: 'Leave Request Updated',
        text: `Employee ${req.user.email}, updated his/her leave from ${leavedata.startDate},
      to ${leavedata.endDate} due to ${leavedata.reason}`,
      };
    } else { // if leave detail soft deleted by DEV
      mailOptions = {
        from: constantVar.MAIL_ID, // system address
        to: element, // PM address
        subject: 'Leave Request Updated',
        text: `Employee ${req.user.email} does not want to leave now!!!`,
      };
    }

    // to send mail to PM of updated details of leave
    transporter.sendMail(mailOptions);
  });
}


// ------------ render add leave page
const leaveForm = async (req, res) => {
  const leaveform = res.render('add-leave', { success: '' });
  return leaveform;
};

// ------------ business logic of add leave for employee(DEV)
// eslint-disable-next-line consistent-return
const addLeave = async (req, res) => {
  const devId = req.user.id;
  const {
    startDate, endDate, reason,
  } = req.body;
  let leavedata = {};
  let flagCheck = false;

  // to check if leave details is exist or not
  try {
    const leaveDates = await Leave.findAll({
      where: {
        employeeId: devId,
        status: 'pending',
      },
    });

    // eslint-disable-next-line consistent-return
    leaveDates.forEach(async (element) => {
      const dbStartDate = element.startDate;
      const dbEndDate = element.endDate;
      const userStartDate = new Date(startDate);
      const userEndDate = new Date(endDate);

      // to check in between dates of leave
      if ((dbStartDate <= userStartDate && dbEndDate >= userStartDate)
        || (dbStartDate <= userEndDate && dbEndDate >= userEndDate)) {
        flagCheck = true;

        const getleave = await Leave.findAll({
          where: { employeeId: devId, isArchived: false },
          limit: 12,
          offset: 0,
        });
        const leaveView = res.render('view-leave', {
          leavesdata: getleave, warning: 'YOUR LEAVE DETAILS ARE ALREADY EXIST!!!', success: '',
        });
        return leaveView;
      }
    });
  } catch (error) {
    return res.render('message', {
      error: 'ERROR WHILE FETCHING LEAVE DETAILS!!',
      message: '',
      route: '',
      text: 'Back',
    });
  }

  if (flagCheck === false) {
    try {
      leavedata = {
        id: uuidv4(),
        employeeId: devId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        status: 'pending',
      };
      await Leave.create(leavedata);
    } catch (error) {
      return res.redirect('/leave/add-view');
    }

    // send mail of leave detail to pm
    sendMailToPM(req, leavedata);

    // to show own leaves of employee(DEV)
    try {
      const getleave = await Leave.findAll({
        where: { employeeId: devId, isArchived: false },
        limit: 12,
        offset: 0,
      });
      const leaveView = res.render('view-leave', { leavesdata: getleave, success: 'YOUR LEAVE SUCCESSFULLY ADDED!!', warning: '' });
      return leaveView;
    } catch (error) {
      const addLeaveView = res.redirect('/leave/add-view');
      return addLeaveView;
    }
  }
};


// ------------view all leave pages
const viewLeave = async (req, res) => {
  // role and userid from stored cookies
  const { role } = req.user;
  const userId = req.user.id;

  switch (role) {
    // if employee is developer
    case constantVar.DEV: {
      try {
        // pagination
        const page = Number(req.query.page) || 0;
        const size = Number(req.query.size) || 12;
        const getleave = await Leave.findAndCountAll({
          where: { employeeId: userId, isArchived: false },
          limit: size,
          offset: page * size,
        });
        const arrayLeave = getleave.rows;
        return res.render('view-leave', { leavesdata: arrayLeave, success: '', warning: '' });
      } catch (e) {
        return res.render('message', {
          error: 'ERROR WHILE FETCHING LEAVE DETAILS!!',
          message: '',
          route: '',
          text: 'Back',
        });
      }
    }

    // if employee is Admin
    case constantVar.ADMIN: {
      try {
        // pagination
        const page = Number(req.query.page) || 0;
        const size = Number(req.query.size) || 12;
        const getleave = await Leave.findAndCountAll({
          include: [{
            model: Employee,
            attributes: ['firstName', 'lastName', 'email'],
          }],
          limit: size,
          offset: page * size,
        });
        const arrayLeave = getleave.rows;
        return res.render('adminView-leave', { leavesdata: arrayLeave });
      } catch (e) {
        return res.render('message', {
          error: 'ERROR WHILE FETCHING LEAVE DETAILS!!',
          message: '',
          route: '',
          text: 'Back',
        });
      }
    }

    // if employee is PM
    case constantVar.PM: {
      try {
        // pagination
        const page = Number(req.query.page) || 0;
        const size = Number(req.query.size) || 12;

        // to find developers who are working under PM
        let projectIds = await ProjectEmployee.findAll({ where: { employeeId: userId } });
        projectIds = projectIds.map(element => element.projectId);
        let empIds = await ProjectEmployee.findAll({ where: { projectId: projectIds } });
        empIds = empIds.map(element => element.employeeId);

        const getleave = await Leave.findAndCountAll({
          where: { employeeId: empIds, isArchived: false },
          include: [{
            model: Employee,
            attributes: ['firstName', 'lastName', 'email'],
          }],
          limit: size,
          offset: page * size,
        });

        const arrayLeave = getleave.rows;
        return res.render('update-leave', { leavesdata: arrayLeave });
      } catch (e) {
        return res.render('message', {
          error: 'ERROR WHILE FETCHING LEAVE DETAILS!!',
          message: '',
          route: '',
          text: 'Back',
        });
      }
    }

    // if employee is HR
    case constantVar.HR: {
      try {
        // pagination
        const page = Number(req.query.page) || 0;
        const size = Number(req.query.size) || 12;
        const getleave = await Leave.findAndCountAll({
          where: { isArchived: false },
          include: [{
            model: Employee,
            attributes: ['firstName', 'lastName', 'email'],
          }],
          limit: size,
          offset: page * size,
        });
        const arrayLeave = getleave.rows;
        return res.render('hrView-leave', { leavesdata: arrayLeave });
      } catch (e) {
        return res.render('message', {
          error: 'ERROR WHILE FETCHING LEAVE DETAILS!!',
          message: '',
          route: '',
          text: 'Back',
        });
      }
    }

    default: {
      return res.render('pageNotFound');
    }
  }
};

// ------------ view own leave by id
const viewOneLeave = async (req, res) => {
  // role from stored cookies
  const { role } = req.user;

  // if employee is developer
  switch (role) {
    // if employee is developer
    case constantVar.DEV: {
      try {
        const getleave = await Leave.findAll({
          where:
            { id: req.params.id, isArchived: false },
        });
        return res.render('view-leavedata', { leavesdata: getleave });
      } catch (e) {
        return res.render('message', {
          error: 'ERROR WHILE FETCHING LEAVE DETAILS!!',
          message: '',
          route: '',
          text: 'Back',
        });
      }
    }

    // if employee is Admin
    case constantVar.ADMIN: {
      try {
        const getleave = await Leave.findAll(
          {
            where: { id: req.params.id },
          },
        );
        return res.render('adminView-leave', { leavesdata: getleave });
      } catch (e) {
        return res.render('message', {
          error: 'ERROR WHILE FETCHING LEAVE DETAILS!!',
          message: '',
          route: '',
          text: 'Back',
        });
      }
    }

    // if employee is PM
    case constantVar.PM: {
      try {
        const getleave = await Leave.findAll({
          where:
            { id: req.params.id, isArchived: false },
        });
        return res.render('update-leave', { leavesdata: getleave });
      } catch (e) {
        return res.render('message', {
          error: 'ERROR WHILE FETCHING LEAVE DETAILS!!',
          message: '',
          route: '',
          text: 'Back',
        });
      }
    }

    // if employee is HR
    case constantVar.HR: {
      try {
        const getleave = await Leave.findAll({
          where:
            { id: req.params.id, isArchived: false },
        });
        return res.render('hrView-leave', { leavesdata: getleave });
      } catch (e) {
        return res.render('message', {
          error: 'ERROR WHILE FETCHING LEAVE DETAILS!!',
          message: '',
          route: '',
          text: 'Back',
        });
      }
    }
    default: {
      return res.render('pageNotFound');
    }
  }
};


// ------------ update leave data for employee(DEV)
// eslint-disable-next-line consistent-return
const updateLeave = async (req, res) => {
  // devid from stored cookies
  const devId = req.user.id;
  let leavedata = {};
  let flagCheck = false;

  // to find one leave data
  const {
    startDate, endDate, reason, status, isArchived,
  } = req.body;

  // to check if leave details is exist or not
  try {
    const leaveDates = await Leave.findAll({
      where: {
        id: { [Op.notIn]: [req.params.id] },
        employeeId: devId,
        status: 'pending',
      },
    });

    leaveDates.forEach(async (element) => {
      const dbStartDate = element.startDate;
      const dbEndDate = element.endDate;
      const userStartDate = new Date(startDate);
      const userEndDate = new Date(endDate);

      // to check in between dates of leave
      if (
        (dbStartDate <= userStartDate && dbEndDate >= userStartDate)
        || (dbStartDate <= userEndDate && dbEndDate >= userEndDate)) {
        flagCheck = true;
      }
    });

    if (flagCheck === true) {
      try {
        const getleave = await Leave.findAll({
          where: { employeeId: devId, isArchived: false },
          limit: 12,
          offset: 0,
        });
        const leaveView = res.render('view-leave', {
          leavesdata: getleave, warning: 'YOUR LEAVE DETAILS ARE ALREADY EXIST!!!', success: '',
        });
        return leaveView;
      } catch (error) {
        return res.errorResponse(req, res, error.message, 500);
      }
    }
  } catch (error) {
    return res.render('message', {
      error: 'ERROR WHILE FETCHING LEAVE DETAILS!!',
      message: '',
      route: '',
      text: 'Back',
    });
  }

  if (flagCheck === false) {
    try {
      leavedata = {
        employeeId: devId,
        startDate,
        endDate,
        reason,
        status,
        isArchived,
      };

      // update leave details
      await Leave.update(leavedata, { where: { id: req.params.id } });
    } catch (error) {
      return res.render('message', {
        error: 'ERROR WHILE EDIT LEAVE DETAILS!!',
        message: '',
        route: '',
        text: 'Back',
      });
    }

    // send mail of leave detail to pm
    sendUpdatedMailToPM(req, leavedata);

    // to fetch all detail of leave
    try {
      const getallleave = await Leave.findAll({
        where: { employeeId: devId, isArchived: false },
        limit: 12,
        offset: 0,
      });
      const leaveView = res.render('view-leave', { leavesdata: getallleave, success: 'YOUR LEAVE DETAILS UPDATED!!!', warning: '' });
      return leaveView;
    } catch (error) {
      return res.render('message', {
        error: 'ERROR WHILE FETCHING LEAVE DETAILS!!',
        message: '',
        route: '',
        text: 'Back',
      });
    }
  }
};

// ------------ leave approve or reject by employee(PM)
// eslint-disable-next-line consistent-return
const acceptRejectLeave = async (req, res) => {
  const leaveid = req.body;
  let mailOptions = {};
  let getdata = {};

  // to find leavedata of clicked button
  try {
    getdata = await Leave.findOne({
      where: { id: leaveid.lid },
      include: [{
        model: Employee,
        attributes: ['firstName', 'lastName', 'email'],
      }],
    });
  } catch (error) {
    return errorResponse(req, res, 'ERROR WHILE FETCHING LEAVE DETAILS!!!');
  }

  // if leave accepted by PM
  if (leaveid.action === 'accept') {
    const leavedata = {
      employeeId: getdata.employeeId,
      startDate: getdata.startDate,
      endDate: getdata.endDate,
      reason: getdata.reason,
      status: 'approved',
    };

    // start date and end date to find inbetween dates
    const sDate = getdata.startDate;
    const eDate = getdata.endDate;
    const datesDiff = getDatesBetween(sDate, eDate);
    let payload = {};
    const finalPayload = [];
    datesDiff.forEach((date) => {
      payload = {
        id: uuidv4(),
        employeeId: getdata.employeeId,
        log: [],
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        isOnLeave: true,
      };
      finalPayload.push(payload);
    });

    try {
      await DailyAttendance.bulkCreate(finalPayload);
    } catch (error) {
      return errorResponse(req, res, 'ERROR WHILE INSERTING LEAVE DETAILS!!!');
    }

    // status update with approved
    try {
      await Leave.update(leavedata, { where: { id: leaveid.lid } });
    } catch (error) {
      return errorResponse(req, res, 'ERROR WHILE EDIT LEAVE DETAILS!!!');
    }

    mailOptions = {
      from: constantVar.MAIL_ID, // system address
      to: getdata.Employee.email, // developer's address
      subject: 'Leave Request',
      text: 'YOUR LEAVE IS APPROVED!!!',
    };
  } else if (leaveid.action === 'reject') { // if leave rejected by PM
    const leavedata = {
      employeeId: getdata.employeeId,
      startDate: getdata.startDate,
      endDate: getdata.endDate,
      reason: getdata.reason,
      status: 'rejected',
    };

    // status update with rejected
    try {
      await Leave.update(leavedata, { where: { id: leaveid.lid } });
    } catch (error) {
      return errorResponse(req, res, 'ERROR WHILE EDIT LEAVE DETAILS!!!');
    }

    mailOptions = {
      from: constantVar.MAIL_ID, // system address
      to: getdata.Employee.email, // developer's address
      subject: 'Leave Request',
      text: 'YOUR LEAVE IS REJECTED!!!',
    };
  }

  // send mail to employee(DEV) of approved or rejected leave
  transporter.sendMail(mailOptions);
  return successResponse(req, res, leaveid.lid, 200);
};

module.exports = {
  addLeave,
  viewLeave,
  viewOneLeave,
  updateLeave,
  acceptRejectLeave,
  leaveForm,
};
