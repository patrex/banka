/* eslint-disable class-methods-use-this */
/* eslint-disable no-unsafe-finally */
import pg from 'pg';

import pool from './pgConfig';


export default class UsersModel {
  async createUser(userObject) {
    const connectionString = process.env.DBURL;
    const { Pool } = pg;

    const phool = new Pool({
      connectionString,
    });
    const text = `INSERT INTO users(token, email, firstname, lastname, password, type, isadmin) 
                  VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    const Response = {};

    const values = [
      userObject.token,
      userObject.email,
      userObject.firstname,
      userObject.lastname,
      userObject.password,
      userObject.userType,
      userObject.isAdmin,
    ];

    try {
      const Results = await phool.query(text, values);
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
    const client = await pool.connect();
    try {
      const Results = await pool.query(text, [user.email]);
      Response.success = Results;
    } catch (err) {
      Response.failure = err;
    } finally {
      await client.release();
      return Response;
    }
  }
}
