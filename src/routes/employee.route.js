import express from 'express';
import * as employeeController from '../controllers/employee/employee.controller';
import * as employeeValidator from '../controllers/employee/employee.validator';
import * as settingController from '../controllers/setting/setting.controller';
import { upload, uploadUpdateAvatar } from '../helpers/index';
import { verifyCookie, checkAJAX } from '../middlewares/auth';
import * as roleCheck from '../middlewares/role';
import isLoggedIn from '../middlewares/isLoggedIn';

const router = express.Router();

router.get('/', verifyCookie, roleCheck.roleAdminPmHr(true), employeeController.renderEmployeeView);

// add-employee rote.
router.post('/employees',
  verifyCookie,
  roleCheck.roleAdmin(false),
  upload.single('avatar'),
  employeeValidator.employeeValidate,
  employeeController.addEmployee);

router.get('/employees', checkAJAX, verifyCookie, roleCheck.roleAdminPmHr(false), employeeController.getEmployee);
router.get('/employees/:employeeId', checkAJAX, verifyCookie, employeeController.getEmployeeOne);

// update employee route.
router.put('/employees/:employeeId',
  verifyCookie,
  roleCheck.roleAdmin(false),
  uploadUpdateAvatar.single('avatarUpdate'),
  employeeValidator.employeeValidate,
  employeeController.updateEmployee);

router.delete('/employees', verifyCookie, roleCheck.roleAdmin(false), employeeController.deleteEmployee);

router.get('/login', isLoggedIn, employeeController.loginView);
router.post('/login', employeeValidator.loginValidate, employeeController.loginEmployee);
router.get('/forgot-password', employeeController.forgotPasswordView);
router.post('/forgot-password', employeeController.forgotPassword);

router.get('/employee/:employeeId', verifyCookie, roleCheck.roleDEV(true), employeeController.renderEmployee);
router.get('/employee/:employeeId/change-password', verifyCookie, employeeController.changePasswordView);
router.post('/employee/:employeeId/change-password', verifyCookie, employeeValidator.passwordValidate, employeeController.changePassword);
// protected, check for employee login and empoyee side route
router.get('/profile', verifyCookie, roleCheck.roleAdminPmHr(true), employeeController.renderEmployeeProfile);


// general settings-route
router.get('/technologies', checkAJAX, verifyCookie, roleCheck.roleAdminPmHr(false), settingController.getTechnology);
router.post('/technologies', verifyCookie, roleCheck.roleAdmin(false), settingController.addTechnology);
router.put('/technologies', verifyCookie, roleCheck.roleAdmin(false), settingController.updateTechnology);
router.get('/setting', verifyCookie, roleCheck.roleAdminPmHr(true), settingController.settingView);
router.get('/logout', verifyCookie, employeeController.logOut);

router.get('/employee/:employeeId/poc', verifyCookie, roleCheck.roleDEV(true), settingController.renderPocView);

// for perticular Employee POC retrive dinamically(possibility)
router.get('/poc', checkAJAX, verifyCookie, roleCheck.roleAll(false), settingController.getPoc);
router.post('/poc', verifyCookie, roleCheck.roleAdmin(false), settingController.addPoc);
router.put('/poc', verifyCookie, roleCheck.roleAdmin(false), settingController.updatePoc);

module.exports = router;
