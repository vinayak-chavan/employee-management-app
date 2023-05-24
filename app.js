/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import flash from 'connect-flash';
import session from 'express-session';
import employeeRoutes from './src/routes/employee.route';
import clientRoutes from './src/routes/client.route';
import projectRoutes from './src/routes/project.routes';
import attendanceRoutes from './src/routes/attendance.route';
import { notFound } from './src/helpers/middleware.notFound';
import leaveRoutes from './src/routes/leave.route';


dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET,
  secure: true,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000, secure: true },
}));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.resolve(__dirname, './src/public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));
app.use(cors());
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.locals = req.flash();
  next();
});
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public')));
// app.use('/employee/assets', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'src', 'views'));

app.use('/', employeeRoutes);
// requiring routes
app.use('/', clientRoutes);
app.use('/', projectRoutes);
app.use('/', attendanceRoutes);
app.use('/', leaveRoutes);
app.use(notFound);
module.exports = app;
