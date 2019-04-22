/* eslint-disable class-methods-use-this */
import users from '../models/usersModel';
import accounts from '../models/accountsModel';
import transactions from '../models/transactionsModel';

export default class TransactionsController {
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
    }
}

