/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import users from '../models/users';

export default class {
  getAll(req, res) {
    return res.status(200).json({
      status: 200,
      data: users,
    });
  }

  createUser(req, res) {
    const userID = users.length;
    const username = req.body.fname.toLowerCase() + userID;

    const saltRounds = 10; // salt for encrypting password

    const user = {
      userID,
      firstname: req.body.fname,
      midname: req.body.mname,
      lname: req.body.lname,
      username,
      email: req.body.email,
      userType: req.body.type, // normal, cashier, admin
    };
    bcrypt.hash(req.body.pwd, saltRounds).then((hash) => {
      user.password = hash; // store encrypted password in user object
    }).then(() => {
      bcrypt.hash(req.body.rpwd, saltRounds).then((hash) => {
        user.rpassword = hash;
      }).then(() => {
        const token = jwt.sign(user, 's3cr3t');
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
          userType: users[userID].userType,
        },
      }))
        .catch(() => res.status(500).json({
          status: 500,
          data: {
            status: 500,
            error: 'The account could not be created at this time',
          },
        }));
    });
  }

  signIn(req, res) {
    const { uname, pwd } = req.body;
    const userID = users.findIndex(user => user.username === uname);
    if (userID >= 0) {
      bcrypt.compare(pwd, users[userID].password).then((rez) => {
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
