/* eslint-disable class-methods-use-this */
import users from '../models/users';
import accounts from '../models/accounts';
import transactions from '../models/transactions';

export default class {
  getAll(req, res) {
    return res.status(200).json({
      status: 200,
      data: transactions,
    });
  }

  debitAcct(req, res) {
    const { accountNumber } = req.params;
    const { amount, cashierID, transType } = req.body;
    const acctID = accounts.findIndex(account => account.acctNumber === accountNumber);
    const userID = users.findIndex(user => user.userID === cashierID);
    if (acctID !== -1) {
      if (userID !== -1) {
        if (users[userID].userType === 'cashier') {
          const transID = transactions.length;
          const transaction = {
            transID,
            amount,
            acctNumber: accounts[acctID].acctNumber,
            cashierID,
            transType,
            acctBal: accounts[acctID].openingBalance - amount,
          };
          transactions.push(transaction);
          res.status(201).json({
            status: 201,
            data: transactions[transID],
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

  creditAcct(req, res) {
    const { accountNumber } = req.params;
    const { amount, cashierID, transType } = req.body;
    const acctID = accounts.findIndex(account => account.acctNumber === accountNumber);
    const userID = users.findIndex(user => user.userID === cashierID);
    if (acctID !== -1) {
      if (userID !== -1) {
        if (users[userID].userType === 'cashier') {
          const transID = transactions.length;
          const transaction = {
            transID,
            amount,
            acctNumber: accounts[acctID].acctNumber,
            cashierID,
            transType,
            acctBal: accounts[acctID].openingBalance + amount,
          };
          transactions.push(transaction);
          res.status(201).json({
            status: 201,
            data: transactions[transID],
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
