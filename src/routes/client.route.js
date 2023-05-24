import express from 'express';
import { clientRegisterValidation, clientUpdateDataValidation } from '../controllers/client/client.validator';
import * as clientControllers from '../controllers/client/client.controller';
import { verifyCookie, checkAJAX } from '../middlewares/auth';
import * as roleCheck from '../middlewares/role';

const route = express.Router();

route.get('/clients', verifyCookie, roleCheck.roleAdminPmHr(true), (req, res) => res.render('clients', { role: req.user.role }));
route.get('/getClients', checkAJAX, verifyCookie, roleCheck.roleAdminPmHr(false), clientControllers.getAllClient);
route.get('/clients/:clientId', checkAJAX, verifyCookie, roleCheck.roleAdminPmHr(false), clientControllers.getOneClient);
route.post('/clients', verifyCookie, roleCheck.roleAdmin(false), clientRegisterValidation, clientControllers.addNewClient);
route.put('/clients/:clientId', verifyCookie, roleCheck.roleAdmin(false), clientUpdateDataValidation, clientControllers.editClient);

module.exports = route;
