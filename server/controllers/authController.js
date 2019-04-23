/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';
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
    user.token = await jwt.sign(user, config.get('keys.jwtKey'));

    const results = await authModel.createUser(user);
    if (results.success) {
      res.status(201).json({
        status: 201,
        data: results.success.rows,
      });
    } else if (results.failure) {
      res.status(404).json({
        status: 404,
        message: results.failure.detail,
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
      try {
        const passwordValid = await bcrypt.compare(password, results.success.rows[0].password);
        if (passwordValid) {
          res.status(200).json({
            status: 200,
            data: results.success.rows,
          });
        } else {
          res.status(400).json({
            status: 400,
            message: 'Username or password invalid',
          });
        }
      } catch (e) {
        res.status(500).json({
          status: 500,
          message: 'It seems we ran into some trouble with that',
        });
      }
    }
  }
}
