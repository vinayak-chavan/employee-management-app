import { verify } from 'jsonwebtoken';
import roles from '../constants/index';

const isLoggedIn = async (req, res, next) => {
  try {
    // Check if verifyToken exist or not
    const { verifyToken } = req.cookies;
    if (!verifyToken) {
      return next();
    }

    // Return Data of user if payload exist.
    try {
      const payload = verify(verifyToken, process.env.verifyToken);
      if (payload.role === roles.DEV) {
        return res.redirect(`employee/${payload.id}`);
      }
      return res.redirect('/');
    } catch (error) {
      return next();
    }
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

export default isLoggedIn;
