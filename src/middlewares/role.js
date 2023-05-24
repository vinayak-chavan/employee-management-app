import { errorResponse } from '../helpers/index';
import * as roles from '../constants/index';

export const roleAdmin = flagRender => (req, res, next) => {
  try {
    if (req.user.role === roles.ADMIN) {
      return next();
    }
    throw new Error('You do not have permission to access this route !!!');
  } catch (err) {
    if (flagRender) {
      res.status(401);
      return res.render('message', {
        error: err.message,
        message: '',
        route: '',
        text: 'Back',
      });
    }
    return errorResponse(req, res, err.message, 401);
  }
};

export const rolePM = flagRender => (req, res, next) => {
  try {
    if (req.user.role === roles.PM) {
      return next();
    }
    throw new Error('You do not have permission to access this route !!!');
  } catch (err) {
    if (flagRender) {
      res.status(401);
      return res.render('message', {
        error: err.message,
        message: '',
        route: '',
        text: 'Back',
      });
    }
    return errorResponse(req, res, err.message, 401);
  }
};

export const roleHR = flagRender => (req, res, next) => {
  try {
    if (req.user.role === roles.HR) {
      return next();
    }
    throw new Error('You do not have permission to access this route !!!');
  } catch (err) {
    if (flagRender) {
      res.status(401);
      return res.render('message', {
        error: err.message,
        message: '',
        route: '',
        text: 'Back',
      });
    }
    return errorResponse(req, res, err.message, 401);
  }
};

export const roleDEV = flagRender => (req, res, next) => {
  try {
    if (req.user.role === roles.DEV) {
      return next();
    }
    throw new Error('You do not have permission to access this route !!!');
  } catch (err) {
    if (flagRender) {
      res.status(401);
      return res.render('message', {
        error: err.message,
        message: '',
        route: '',
        text: 'Back',
      });
    }
    return errorResponse(req, res, err.message, 401);
  }
};

export const roleAdminPmHr = flagRender => (req, res, next) => {
  try {
    if ([roles.ADMIN, roles.PM, roles.HR].includes(req.user.role)) {
      return next();
    }
    throw new Error('You do not have permission to access this route !!!');
  } catch (err) {
    if (flagRender) {
      res.status(401);
      return res.render('message', {
        error: err.message,
        message: '',
        route: '',
        text: 'Back',
      });
    }
    return errorResponse(req, res, err.message, 401);
  }
};

export const roleAll = flagRender => (req, res, next) => {
  try {
    if ([roles.ADMIN, roles.PM, roles.HR, roles.DEV].includes(req.user.role)) {
      return next();
    }
    throw new Error('You do not have permission to access this route !!!');
  } catch (err) {
    if (flagRender) {
      res.status(401);
      return res.render('message', {
        error: err.message,
        message: '',
        route: '',
        text: 'Back',
      });
    }
    return errorResponse(req, res, err.message, 401);
  }
};
