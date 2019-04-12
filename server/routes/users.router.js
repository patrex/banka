import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import users from '../models/users';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      message: 'Hello, user',
    },
  });
});

router.post('/signup', (req, res) => {
  const userID = users.length;
  const username = req.body.fname.toLowerCase() + userID;
  const saltRounds = 10;
  // const rpassword = bcrypt.hashSync(req.body.rpwd, saltRounds);

  // res.send(password);

  const user = {
    userID,
    firstname: req.body.fname,
    midname: req.body.mname,
    lname: req.body.lname,
    username,
    email: req.body.email,
  };

  bcrypt.hash(req.body.pwd, saltRounds).then((hash) => {
    user.password = hash;
  }).then(() => {
    bcrypt.hash(req.body.rpwd, saltRounds).then((hash) => {
      user.rpassword = hash;
    }).then(() => {
      const token = jwt.sign(user, 's3cr3t');
      user.token = token;
      users.push(user);
    }).then(() => {
      res.status(200).json({
        status: 200,
        data: {
          token: users[userID].token,
          firstname: users[userID].firstname,
          lastname: users[userID].lastname,
          username: users[userID].username,
          email: users[userID].email,
        },
      });
    })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          data: {
            message: 'The account could not be created at this time',
            err_body: err,
          },
        });
      });
  });
});

module.exports = router;
