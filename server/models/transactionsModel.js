/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unsafe-finally */
/* eslint-disable class-methods-use-this */
import pool from './pgConfig';

class InsufficientBalance extends Error {
  constructor(message) {
    super(message);
    this.name = 'InsufficientBalance';
    this.code = 100;
    this.detail = 'The transaction amount specified greater than balance';
  }
}

class TransactionRejected extends Error {
  constructor(message) {
    super(message);
    this.name = 'TransactionRejected';
    this.code = 105;
    this.detail = 'There is a pending issue with this account';
  }
}

export default class TransactionModel {
  async debitAccount(info) {
    let oldbalance = 0;
    let newbalance = 0;

    const Response = {};

    const getAccountStatus = 'SELECT status FROM accounts WHERE accountnumber = $1';
    const getBalance = 'SELECT balance FROM accounts WHERE accountnumber = $1';
    const updateBalance = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
    const insertTransaction = `
                               INSERT INTO transactions(createdon, type, accountnumber, cashier, amount, oldbalance, newbalance)
                               VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
                              `;

    try {
      // perform checks first
      const queryStatus = await pool.query(getAccountStatus, [info.accountNumber]);
      const accountStatus = queryStatus.rows[0].status;

      if (accountStatus === 'draft' || accountStatus === 'dormant') {
        throw new TransactionRejected('Transaction Rejected. Contact your financial institution');
      }

      const currentBalance = await pool.query(getBalance, [parseInt(info.accountNumber, 10)]);

      let balance = parseFloat(currentBalance.rows[0].balance);
      oldbalance = balance; 
      if (Number(balance - info.amount) < 0) {
        throw new InsufficientBalance('Insufficient Balance');
      }

      // construct new balance
      parseFloat(balance -= info.amount);
      newbalance = balance;

      // attempt update
      const update = await pool.query(updateBalance, [balance, info.accountNumber]);

      if (update) { // update is sucessful
        const Results = await pool.query(insertTransaction, [
          'now',
          info.transactionType,
          info.accountNumber,
          info.cashierID,
          info.amount,
          oldbalance,
          newbalance,
        ]);
        Response.success = Results; // return to caller with Results
      }
    } catch (err) {
      Response.failure = err;
    } finally {
      return Response;
    }
  }

  async creditAccount(info) {
    let oldbalance = 0;
    let newbalance = 0;

    const Response = {};

    const getBalance = 'SELECT balance FROM accounts WHERE accountnumber = $1';
    const updateBalance = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
    const insertTransaction = `
                               INSERT INTO transactions(createdon, type, accountnumber, cashier, amount, oldbalance, newbalance)
                               VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
                              `;

    try {
      const currentBalance = await pool.query(getBalance, [parseInt(info.accountNumber, 10)]);

      let balance = parseFloat(currentBalance.rows[0].balance);
      oldbalance = balance;

      parseFloat(balance += info.amount, 10);
      newbalance = balance;

      const update = await pool.query(updateBalance, [balance, info.accountNumber]);

      if (update) { // update is sucessful
        const Results = await pool.query(insertTransaction, [
          'now',
          info.transactionType,
          info.accountNumber,
          info.cashierID,
          info.amount,
          oldbalance,
          newbalance,
        ]);
        Response.success = Results; // return to caller with Results
      }
    } catch (err) {
      Response.failure = err;
    } finally {
      return Response;
    }
  }

  async listAllTransactions() {
    const text = 'SELECT * FROM transactions';
    const Response = {};

    try {
      const Results = await pool.query(text);

      Response.success = Results;
    } catch (err) {
      Response.failure = err;
    } finally {
      return Response;
    }
  }

  async getOneTransaction(transaction) {
    const { transactionID } = transaction;
    const Response = {};
    const text = 'SELECT * FROM transactions WHERE id=$1';
    const values = [transactionID];

    try {
      const Results = await pool.query(text, values);
      Response.success = Results;
    } catch (err) {
      Response.failure = err;
    } finally {
      return Response;
    }
  }
}
