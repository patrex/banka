/* eslint-disable no-unsafe-finally */
/* eslint-disable class-methods-use-this */
import pool from './pgConfig';

export default class EmailServices {
  async getEmail(account) {
    const sql = `SELECT email 
                 FROM accounts
                 WHERE accountnumber=$1`;
    
    const Response = {};
    try {
      Response.success = await pool.query(sql, [account.accountNumber]);
    } catch (err) {
      Response.failure = err;
    } finally {
      return Response;
    }
  }
}
