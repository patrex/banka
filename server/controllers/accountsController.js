/* eslint-disable class-methods-use-this */
import accounts from '../models/accountsModel';

export default class AccountsController {
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
  }
}
