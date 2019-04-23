/* eslint-disable class-methods-use-this */
import TransactionsModel from '../models/transactionsModel';

const transactionsModel = new TransactionsModel();

export default class Transactions {
  async debitAccount(req, res) {
    const { accountNumber } = req.params;
    const { amount, cashierID, transactionType } = req.body;

    const results = await transactionsModel.debitAccount({
      accountNumber,
      amount,
      cashierID,
      transactionType,
    });

    if (results.success) {
      res.status(200).json({
        status: 200,
        data: results.success.rows,
      });
    } else if (results.failure) {
      res.status(400).json({
        status: 400,
        message: results.failure.detail,
      });
    }
  }

  async creditAccount(req, res) {
    const { accountNumber } = req.params;
    const { amount, cashierID, transactionType } = req.body;

    const results = await transactionsModel.creditAccount({
      accountNumber,
      amount,
      cashierID,
      transactionType,
    });

    if (results.success) {
      res.status(200).json({
        status: 200,
        data: results.success.rows,
      });
    } else if (results.failure) {
      res.status(400).json({
        status: 400,
        message: results.failure.detail,
      });
    }
  }
}
