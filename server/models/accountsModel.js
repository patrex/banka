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

  async listAllAccounts(status) {
    let text;
    text = `SELECT acc.createdon AS "createdOn", acc.accountnumber AS "accountNumber", u.email AS "ownerEmail",
                   acc.type, acc.status, acc.balance 
            FROM accounts acc
            INNER JOIN users u
            ON u.id = acc.owner;`;
    if (status) {
      text = `SELECT accounts.createdon AS "createdOn", accounts.accountnumber AS "accountNumber", users.email AS "ownerEmail",
                     accounts.type, accounts.status, accounts.balance 
              FROM accounts
              INNER JOIN users
              ON users.id = accounts.owner
            where accounts.status = '${status}'`;
    }

    const Response = {};
    try {
      Response.success = await pool.query(text);
    } catch (err) {
      Response.failure = err;
    } finally {
      return Response;
    }
  }

  async getAnAccountRecord(account) {
    const { accountNumber } = account;
    const Response = {};
    const text = `SELECT acc.createdon AS "createdOn", acc.accountnumber AS "accountNumber", u.email AS "ownerEmail",
                         acc.type, acc.status, acc.balance 
                  FROM accounts acc
                  INNER JOIN users u
                  ON u.id = acc.owner
                  WHERE acc.accountNumber=$1
                  `;

    try {
      const Results = await pool.query(text, [accountNumber]);
      Response.success = Results;
    } catch (err) {
      Response.failure = err;
    } finally {
      return Response;
    }
  }
}
