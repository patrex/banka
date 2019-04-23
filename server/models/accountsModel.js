/* eslint-disable no-unsafe-finally */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import pool from './pgConfig';

export default class AccountsModel {
  async deleteBankAccount(account) {
    const text = 'DELETE FROM accounts WHERE accountnumber=$1 RETURNING *';
    const Response = {};

    try {
      const Results = await pool.query(text, [account.accountNumber]);
      Response.success = Results;
    } catch (err) {
      Response.failure = err;
    } finally {
      return Response;
    }
  }

  async activateDeactivateAccount(account) {
    const text = 'UPDATE accounts SET status=$1 WHERE accountnumber=$2 RETURNING *';
    const Response = {};

    try {
      const Results = await pool.query(text, [account.status, account.accountNumber]);
      Response.success = Results;
    } catch (err) {
      Response.failure = err;
    } finally {
      return Response;
    }
  }

  async createBankAccount(accountInfo) {
    const text = `INSERT INTO accounts(type, createdon, owner, status, balance, haspendingtransaction) 
                  VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    const Response = {};

    try {
      const Results = await pool.query(text, [
        accountInfo.accountType,
        'now',
        accountInfo.owner,
        accountInfo.status,
        parseFloat(accountInfo.balance),
        false,
      ]);

      Response.success = Results;
    } catch (err) {
      Response.failure = err;
    } finally {
      return Response;
    }
  }
}
