/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';
import users from '../models/usersModel';


export default class {
  getAll(req, res) {
    return res.status(200).json({
      status: 200,
      data: users,
    });
  }

  createUser(req, res) {
    const userID = users.length;
    // const username = req.body.fname.toLowerCase() + userID;

    const saltRounds = 10; // salt for encrypting password

    const user = {
      userID,
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      username: req.body.username.toLowerCase() + userID,
      email: req.body.email,
      userType: req.body.type, // normal, cashier, admin
    };
    bcrypt.hash(req.body.password, saltRounds).then((hash) => {
      user.password = hash; // store encrypted password in user object
    }).then(() => {
      const token = jwt.sign(user, config.get('keys.jwtKey'));
      user.token = token;

      users.push(user);
    }).then(() => res.status(201).json({ // user was created
      status: 201,
      data: {
        token: users[userID].token,
        firstname: users[userID].firstname,
        lastname: users[userID].lastname,
        username: users[userID].username,
        email: users[userID].email,
        type: users[userID].userType,
      },
    }))
      .catch(() => res.status(500).json({
        status: 500,
        data: {
          status: 500,
          error: 'The account could not be created at this time',
        },
      }));
  }

  signIn(req, res) {
    const { username, password } = req.body;
    const userID = users.findIndex(user => user.username === username);
    if (userID >= 0) {
      bcrypt.compare(password, users[userID].password).then((rez) => {
        if (rez === true) {
          return res.status(200).json({
            status: 200,
            data: {
              token: users[userID].token,
              firstname: users[userID].firstname,
              lastname: users[userID].lastname,
              username: users[userID].username,
              email: users[userID].email,
            },
          });
        }
        res.status(500).json({
          status: 500,
          data: {
            status: 500,
            message: 'Sorry. We could not verify the information you provided',
          },
        });
      });
    } else res.json({ message: 'UserID not found!' });
  }
}
