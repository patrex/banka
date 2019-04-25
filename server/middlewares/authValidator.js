/* eslint-disable class-methods-use-this */
import Joi from 'joi';
import config from 'config';
import jwt from 'jsonwebtoken';

export default class AuthValidator {
  validateUserInput(req, res, next) {
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      userType: req.body.type, // staff, client,
      password: req.body.password,
    };

    const schema = Joi.object().keys({
      firstname: Joi.string().min(2).required(),
      lastname: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      userType: Joi.string().min(5).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    });

    const { error } = Joi.validate(user, schema, { abortEarly: false });

    if (error) {
      const errorDetails = error.details;
      const errorMessages = [];

      for (let i in errorDetails) {
        errorMessages[i] = (errorDetails[i].message).replace(/\"/g, '');
      }

      return res.status(400).json({
        status: 400,
        error: errorMessages,
      });
    }
    next();
  }

  validateSignIn(req, res, next) {
    const { email, password } = req.body;

    const schema = Joi.object().keys({
      email: Joi.string().min(3).max(100).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    });

    const { error } = Joi.validate({ email, password }, schema);

    if (error) {
      const errorDetails = error.details;
      const errorMessages = [];

      for (let i in errorDetails) {
        errorMessages[i] = (errorDetails[i].message).replace(/\"/g, '');
      }

      return res.status(400).json({
        status: 400,
        error: errorMessages,
      });
    }
    next();
  }

  async authenticateUser(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'Access Denied. No token provided',
      });
    }
    try {
      const isVerified = await jwt.verify(token, config.get('keys.jwtKey'));
      req.user = isVerified;

      next();
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: 'Invalid token provided',
      });
    }
  }
}
