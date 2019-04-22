/* eslint-disable class-methods-use-this */
import Joi from 'joi';

export default class TransactionsValidator {
  validateTransaction(req, res, next) {
    const { amount, cashierID, transactionType } = req.body;
    const { accountNumber } = req.params;

    const schema = Joi.object().keys({
      amount: Joi.number().min(0).required(),
      cashierID: Joi.number().min(0).required(),
      transactionType: Joi.string().min(3).required(),
      accountNumber: Joi.number().min(0).required(),
    });
    const { error } = Joi.validate({
      amount, cashierID, transactionType, accountNumber,
    }, schema);

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
