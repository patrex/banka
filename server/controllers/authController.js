/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthModel from '../models/authModel';

const authModel = new AuthModel();


export default class AuthController {
  async createUser(req, res) {
    const saltRounds = 10; // salt for encrypting password

    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      userType: req.body.type, // client, staff
      isAdmin: req.body.isAdmin,
    };

    user.password = await bcrypt.hash(req.body.password, saltRounds);
    const results = await authModel.createUser(user);

    if (results.success) {
      const userResponse = {
        firstname: results.success.rows[0].firstname,
        lastname: results.success.rows[0].lastname,
        email: results.success.rows[0].email,
        userType: results.success.rows[0].type, // client, staff
        isAdmin: results.success.rows[0].isadmin,
      };

      userResponse.token = await jwt.sign(user, process.env.JWTKEY);

      res.status(201).json({
        status: 201,
        data: userResponse,
      });
    } else if (results.failure) {
      let message;
      if (results.failure.code === '23505') {
        message = 'There\'s already a user with that email';
      } else {
        message = results.failure.detail;
      }
      res.status(400).json({
        status: 400,
        message,
      });
    }
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    const results = await authModel.signIn({
      email,
      password,
    });

    if (results.success) {
      if (results.success.rowCount > 0) {
        const user = {
          firstname: results.success.rows[0].firstname,
          lastname: results.success.rows[0].lastname,
          email: results.success.rows[0].email,
          userType: results.success.rows[0].type, // client, staff
          isAdmin: results.success.rows[0].isadmin,
        };

        user.token = await jwt.sign(user, process.env.JWTKEY);

        const passwordValid = await bcrypt.compare(password, results.success.rows[0].password);
        if (passwordValid) {
          res.status(200).json({
            status: 200,
            data: user,
          });
        } else {
          res.status(400).json({
            status: 400,
            message: 'Username or password invalid',
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          message: 'Username or password invalid',
        });
      }
    } else if (results.failure) {
      res.status(400).json({
        status: 400,
        message: 'Username or password invalid',
      });
    }
  }
}
