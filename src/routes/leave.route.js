/* eslint-disable import/named */
import express from 'express';

import * as leaveValidator from '../controllers/leave/leave.validator';

import * as leaveControlller from '../controllers/leave/leave.controller';
import { verifyCookie } from '../middlewares/auth';
import * as roleCheck from '../middlewares/role';

const router = express.Router();

// developer
router.get('/leave/add-view', verifyCookie, roleCheck.roleDEV(true), leaveControlller.leaveForm);
router.post('/leave/add', verifyCookie, roleCheck.roleDEV(false), leaveValidator.leaveRegisterValidation, leaveControlller.addLeave);
router.post('/leave/update/:id', verifyCookie, roleCheck.roleDEV(false), leaveValidator.leaveUpdateValidation, leaveControlller.updateLeave);

// Employee(DEV, ADMIN, PM, HR)
router.get('/leave/view', verifyCookie, roleCheck.roleAll(false), leaveControlller.viewLeave);
router.get('/leave/view/:id', verifyCookie, roleCheck.roleAll(false), leaveControlller.viewOneLeave);

// pm
router.put('/leave/accept-reject', verifyCookie, roleCheck.rolePM(false), leaveControlller.acceptRejectLeave);

module.exports = router;
