/* eslint-disable class-methods-use-this */
import TransactionsModel from '../models/transactionsModel';
const transactionsModel = new TransactionsModel();

export default class Transactions {
  async getOneTransaction(req, res) {
    const { transactionID } = req.params;
    const results = await transactionsModel.getOneTransaction({
      transactionID,
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


  async getAllTransactions(req, res) {
  const results = await transactionsModel.listAllTransactions();

  if (results.success) {
    if (results.success.rowCount > 0) {
      res.status(200).json({
        status: 200,
        data: results.success.rows,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'No results found. Check the account number and retry',
      });
    }
  }
    
  async debitAccount(req, res) {
    const { accountNumber } = req.params;
    const { amount, cashierID, transactionType } = req.body;

    const results = await transactionsModel.debitAccount({
      accountNumber,
      amount,
      cashierID,
      transactionType,
    });

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

