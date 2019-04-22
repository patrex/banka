/* eslint-disable class-methods-use-this */
import users from '../models/usersModel';
import accounts from '../models/accountsModel';
import transactions from '../models/transactionsModel';

export default class Transactions {
  getAllTransactions(req, res) {
    return res.status(200).json({
      status: 200,
      data: transactions,
    });
  }

  debitAccount(req, res) {
    const { accountNumber } = req.params;
    const { amount, cashierID, transactionType } = req.body;
    const accountID = accounts.findIndex(account => account.accountNumber === accountNumber);
    const userID = users.findIndex(user => user.userID === cashierID);
    if (accountID !== -1) {
      if (userID !== -1) {
        if (users[userID].userType === 'cashier') {
          const transactionID = transactions.length;

          const oldBalance = accounts[accountID].balance;
          const newBalance = accounts[accountID].balance - amount;

          if (newBalance >= 0) {
            const transaction = {
              transactionID,
              amount,
              accountNumber: parseInt(accounts[accountID].accountNumber, 10),
              cashierID,
              transactionType,
              oldBalance,
              newBalance,
            };

            if (transactions.push(transaction)) {
              accounts[accountID].balance = newBalance;
            } else {
              return res.status(500).json({
                status: 500,
                error: 'Sorry. You pushed all the right buttons but we could not complete this transaction',
              });
            }
          } else {
            return res.status(400).json({
              status: 400,
              error: 'You do not have enough balance to do this transaction',
            });
          }

          res.status(202).json({
            status: 202,
            data: transactions[transactionID],
          });
        } else {
          res.status(403).json({
            status: 403,
            message: 'Forbidden',
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          message: 'This username not found',
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        message: 'This account not found',
      });
    }
  }

  creditAccount(req, res) {
    const { accountNumber } = req.params;
    const { amount, cashierID, transactionType } = req.body;
    const accountID = accounts.findIndex(account => account.accountNumber === accountNumber);
    const userID = users.findIndex(user => user.userID === cashierID);
    if (accountID !== -1) {
      if (userID !== -1) {
        if (users[userID].userType === 'cashier') {
          const transactionID = transactions.length;
          const oldBalance = accounts[accountID].balance;
          const newBalance = accounts[accountID].balance + amount;

          const transaction = {
            transactionID,
            amount,
            accountNumber: parseInt(accounts[accountID].accountNumber, 10),
            cashierID,
            transactionType,
            createdOn: Date.now(),
            oldBalance,
            newBalance,
          };

          if (transactions.push(transaction)) {
            accounts[accountID].balance = newBalance;
          } else {
            return res.status(500).json({
              status: 500,
              error: 'Sorry. You pushed all the right buttons but we could not complete this transaction',
            });
          }

          res.status(202).json({
            status: 202,
            data: transactions[transactionID],
          });
        } else {
          res.status(403).json({
            status: 403,
            message: 'Forbidden',
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          message: 'This username not found',
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        message: 'This account not found',
      });
    }
  }
}
