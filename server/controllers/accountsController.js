/* eslint-disable class-methods-use-this */
import AccountsModel from '../models/accountsModel';

const accountsModel = new AccountsModel();

export default class AccountsController {
    async getAllAccounts(req, res) {
    const { status } = req.query;
    const results = await accountsModel.listAllAccounts(status);

    if (results.success) {
      if (results.success.rowCount > 0) {
        res.status(200).json({
          status: 200,
          data: results.success.rows,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: 'No results found',
        });
      }
    }
  
  
  async getAllTransactionsByUser(req, res) {
    const { accountNumber } = req.params;
    const results = await accountsModel.getAllTransactionsByUser({ accountNumber });

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
  async createBankAccount(req, res) {
    const {
      accountType,
      balance, owner,
      status,
    } = req.body;

    const userInfo = {
      accountType,
      balance,
      status,
      owner,
    };

    const results = await accountsModel.createBankAccount(userInfo);

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

  async activateDeactivateAccount(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;

    const results = await accountsModel.activateDeactivateAccount({
      accountNumber,
      status,
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

  async deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const results = await accountsModel.deleteBankAccount({ accountNumber });

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
