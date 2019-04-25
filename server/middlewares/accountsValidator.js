import Joi from 'joi';

export default class AccountsValidator {
  // eslint-disable-next-line class-methods-use-this
  validateAccountInfo(req, res, next) {
    const {
      balance,
      accountType, status,
    } = req.body;

    const account = {
      accountType,
      balance,
      status,
    };

    const schema = Joi.object().keys({
      accountType: Joi.string().min(7).required(),
      balance: Joi.number().min(0.0).required(),
      status: Joi.string().min(5).required(),
    });

    const { error } = Joi.validate(account, schema, { abortEarly: false });

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
}
