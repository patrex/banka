/* eslint-disable no-unsafe-finally */
/* eslint-disable class-methods-use-this */
import pool from './pgConfig';

export default class UserModel {
  async getAllAccountsByUser(user) {
    const text = `SELECT * FROM accounts
                      WHERE owner = (
                        SELECT id FROM users
                        WHERE email = $1
                      )`;
                      
    const Response = {};

    try {
      const Results = await pool.query(text, [user.email]);
      Response.success = Results;
    } catch (err) {
      Response.failure = err;
    } finally {
      return Response;
    }
  }
}
