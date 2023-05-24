import express from 'express';
import { singleProject, addProject, updateProject, viewProject, projectEmployee, projectClient, renderEmployeeProjectView, renderViewProject } from '../controllers/project/project.controller';
import projectValidation from '../controllers/project/project.validator';
import { verifyCookie, checkAJAX } from '../middlewares/auth';
import * as roleCheck from '../middlewares/role';

const route = express.Router();

route.get('/fetchproject', checkAJAX, verifyCookie, roleCheck.roleAll(false), viewProject);
route.post('/project', projectValidation, verifyCookie, roleCheck.roleAdmin(false), addProject);
route.put('/projects/:id', projectValidation, verifyCookie, roleCheck.roleAdmin(false), updateProject);
route.get('/projects/:id', checkAJAX, verifyCookie, singleProject);
route.get('/project/:projectId/employees', checkAJAX, verifyCookie, roleCheck.roleAdminPmHr(false), projectEmployee);
route.get('/project/:projectId/clients', checkAJAX, verifyCookie, roleCheck.roleAdminPmHr(false), projectClient);
route.get('/projects', verifyCookie, roleCheck.roleAdminPmHr(true), (req, res) => res.render('project', { role: req.user.role }));

route.get('/employee/:employeeId/projects', verifyCookie, roleCheck.roleDEV(true), renderEmployeeProjectView);
route.get('/viewProject/:projectId', verifyCookie, roleCheck.roleAdminPmHr(true), renderViewProject);

module.exports = route;
