import express from 'express';
import * as attendance from '../controllers/attendance/attendance.controller';
import { verifyCookie, checkAJAX } from '../middlewares/auth';
import * as roleCheck from '../middlewares/role';

const router = express.Router();

router.get('/employee/:employeeId/attendance', verifyCookie, roleCheck.roleDEV(true), attendance.getAttendanceView);
router.post('/employee/:employeeId/attendance', verifyCookie, roleCheck.roleDEV(false), attendance.addAttendance);
router.get('/employee/:employeeId/attendance/table', checkAJAX, verifyCookie, roleCheck.roleDEV(false), attendance.getAttendance);

module.exports = router;
