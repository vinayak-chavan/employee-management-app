import { verify } from 'jsonwebtoken';
import { Employee } from '../models';

const verifyCookie = async (req, res, next) => {
  try {
    const { verifyToken } = req.cookies;
    if (!verifyToken) {
      res.status(401);
      return res.render('message', {
        error: 'Please login first !!!',
        message: '',
        route: '/login',
        text: 'Login',
      });
    }

    // Return Data od user. Here it will return emailID.
    const payload = verify(verifyToken, process.env.verifyToken);
    const matchedEmp = await Employee.scope('login').findOne({
      where: {
        email: payload.email,
        role: payload.role,
      },
      attributes: ['email', 'role', 'verifyToken'],
    });

    if (!matchedEmp) {
      res.status(401);
      return res.render('message', {
        error: 'Data does not exist !!!',
        message: '',
        route: '/login',
        text: 'Login',
      });
    }

    // Check if verifyToken matched or not
    if (verifyToken !== matchedEmp.verifyToken) {
      res.status(401);
      return res.render('message', {
        error: 'Verify token does not match !!!',
        message: '',
        route: '/login',
        text: 'Login',
      });
    }

    // If token matched then send user's data to next route
    req.user = { id: payload.id, email: payload.email, role: payload.role };
    return next();
  } catch (error) {
    res.status(401);
    return res.render('message', {
      error: error.message,
      message: '',
      route: '/login',
      text: 'Login',
    });
  }
};

const checkAJAX = (req, res, next) => {
  if (req.xhr) {
    return next();
  }
  return res.redirect(301, '/404');
};

export { verifyCookie, checkAJAX };
