/* eslint-disable class-methods-use-this */
/* eslint-disable no-unsafe-finally */
import pool from './pgConfig';

export default class UsersModel {
  async createUser(user) {
    const text = `INSERT INTO users(email, firstname, lastname, password, type, isadmin) 
                  VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

    const Response = {};

    const values = [
      user.email,
      user.firstname,
      user.lastname,
      user.password,
      user.userType,
      user.isAdmin,
    ];

    try {
      const Results = await pool.query(text, values);
      Response.success = Results;
    } catch (err) {
      Response.failure = err;
    } finally {
      return Response;
    }
  }

  async signIn(user) {
    const text = 'SELECT * FROM public.users WHERE email=$1';
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
