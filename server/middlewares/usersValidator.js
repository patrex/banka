/* eslint-disable class-methods-use-this */
import Joi from 'joi';

export default class UsersValidator {
  validateUserInput(req, res, next) {
    const user = {
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      email: req.body.email,
      userType: req.body.type, // normal, cashier, admin
      username: req.body.username,
      password: req.body.password,
      rpassword: req.body.rpassword,
    };

    const schema = Joi.object().keys({
      firstname: Joi.string().min(2).required(),
      middlename: Joi.string().min(2),
      username: Joi.string().min(3).max(10).required(),
      lastname: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      userType: Joi.string().min(5).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
      rpassword: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    });

    const { error, value } = Joi.validate(user, schema, { abortEarly: false });

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
    const { username, password } = req.body;

    const schema = Joi.object().keys({
      username: Joi.string().min(3).max(10).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    });

    const { error, value } = Joi.validate({ username, password }, schema);

    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    next();
  }
}
