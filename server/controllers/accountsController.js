/* eslint-disable class-methods-use-this */
import accounts from '../models/accountsModel';

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
  }
}
