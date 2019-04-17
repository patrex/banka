import Joi from 'joi';

export default class {
  // eslint-disable-next-line class-methods-use-this
  valAcctInfo(req, res, next) {
    const {
      firstname, middlename, lastname,
      dob, email, phone, houseNum,
      streetName, city, state,
      acctType, openingBalance,
    } = req.body;

    const account = {
      firstname,
      middlename,
      lastname,
      dob,
      email,
      phone,
      houseNum,
      streetName,
      city,
      state,
      acctType,
      openingBalance,
    };

    const schema = Joi.object().keys({
      firstname: Joi.string().min(2).required(),
      middlename: Joi.string().min(2),
      lastname: Joi.string().min(2).required(),
      dob: Joi.date().min('12-31-1900').max('12-31-2001').required(),
      email: Joi.string().email().required(),
      phone: Joi.number().integer().required(),
      houseNum: Joi.number().integer().required(),
      streetName: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().min(6).required(),
      acctType: Joi.string().min(7).required(),
      openingBalance: Joi.number().min(0.0).required(),
    });

    const { error, value } = Joi.validate(account, schema);

    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    next();
  }
}
