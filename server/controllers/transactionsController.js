/* eslint-disable class-methods-use-this */
import users from '../models/usersModel';
import accounts from '../models/accountsModel';
import transactions from '../models/transactionsModel';

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
}
