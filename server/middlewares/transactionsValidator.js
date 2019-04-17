/* eslint-disable class-methods-use-this */
import Joi from 'joi';

export default class {
  valTransaction(req, res, next) {
    const { amount, cashierID, transactionType } = req.body;
    const { accountNumber } = req.params;

    const schema = Joi.object().keys({
      amount: Joi.number().min(0).required(),
      cashierID: Joi.number().min(0).required(),
      transactionType: Joi.string().min(3).required(),
      accountNumber: Joi.number().min(0).required(),
    });
    const { error, value } = Joi.validate({
      amount, cashierID, transactionType, accountNumber,
    }, schema);

    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    next();
  }
}
