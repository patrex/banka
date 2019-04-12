import express from 'express';
import Joi from 'joi';
import accounts from '../models/accounts';

const router = express.Router({ mergeParams: true });

router.post('/', (req, res) => {
  const acctID = accounts.length;

  const {
    firstname,
    middlename,
    lastname,
    dob,
    email,
    phone,
    houseNum,
    streetName,
    city,
    state,
    acctType,
    openingBalance,
  } = req.body;

  const account = {
    firstname,
    middlename,
    lastname,
    dob,
    email,
    phone,
    houseNum,
    streetName,
    city,
    state,
    acctType,
    openingBalance,
  };

  const schema = Joi.object().keys({
    firstname: Joi.string().min(2).required(),
    middlename: Joi.string().min(2),
    lastname: Joi.string().min(2).required(),
    dob: Joi.date().min('12-31-1900').max('12-31-2001').required(),
    email: Joi.string().email().required(),
    phone: Joi.number().integer().required(),
    houseNum: Joi.number().integer().required(),
    streetName: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().min(6).required(),
    acctType: Joi.string().min(7).required(),
    openingBalance: Joi.number().min(0.0).required(),
  });

  Joi.validate(account, schema)
    .then(() => {
      const acctNum = `0${Math.ceil(Math.random() * 10e8 + 1)}`;
      account.acctNumber = acctNum;
      account.id = acctID;
      account.status = 'pending';
      accounts.push(account);
      res.status(200).json({
        status: 200,
        data: {
          accountNumber: accounts[acctID].acctNumber,
          firstname: accounts[acctID].firstname,
          lastname: accounts[acctID].lastname,
          email: accounts[acctID].email,
          type: accounts[acctID].acctType,
          status: accounts[acctID].status,
          openingBalance: accounts[acctID].openingBalance,
        },
      });
    })
    .catch(err => res.status(400).json({
      status: 400,
      error: err.details[0].message,
    }));
});

router.patch('/:accountNumber(\\d+)', (req, res) => {
  const { accountNumber } = req.params;
  const { status } = req.body;
  const acctID = accounts.findIndex(account => account.acctNumber === accountNumber);

  if (acctID > -1) {
    accounts[acctID].status = status;

    res.status(201).json({
      status: 201,
      data: {
        accountNumber: accounts[acctID].acctNumber,
        status: accounts[acctID].status,
      },
    });
  } else {
    res.status(404).json({
      status: 404,
      error: 'Account number not found. Check the number and try again',
    });
  }
});

module.exports = router;
