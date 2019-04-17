/* eslint-disable class-methods-use-this */
import accounts from '../models/accountsModel';

export default class Accounts {
  getAll(req, res) {
    return res.status(200).json({
      status: 200,
      data: accounts,
    });
  }


  createAccount(req, res) {
    const acctID = accounts.length;

    const {
      firstname, middlename, lastname,
      dob, email, phone, houseNum,
      streetName, city, state,
      acctType, openingBalance,
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
    const acctNum = `${accounts.length}`;

    account.acctNumber = acctNum;
    account.id = acctID;
    account.status = 'pending';
    account.balance = openingBalance;
    account.owner = req.body.owner;
    account.createdOn = Date.now();

    accounts.push(account);

    res.status(201).json({
      status: 201,
      data: {
        accountNumber: parseInt(accounts[acctID].acctNumber, 10),
        firstname: accounts[acctID].firstname,
        lastname: accounts[acctID].lastname,
        email: accounts[acctID].email,
        type: accounts[acctID].acctType,
        status: accounts[acctID].status,
        openingBalance: accounts[acctID].balance,
      },
    });
  }

  activateDeactivate(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;

    // const acctID = accounts.findIndex(account => parseInt(account.acctNumber, 10) === accountNumber);
    const acctID = accountNumber;
    if (acctID !== -1) {
      accounts[acctID].status = status;

      res.status(202).json({
        status: 202,
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
  }

  deleteAcct(req, res) {
    const { accountNumber } = req.params;

    const acctID = accounts.findIndex(account => account.acctNumber === accountNumber);
    if (acctID !== -1) {
      if (accounts.splice(acctID)) {
        res.status(200).json({
          status: 200,
          message: 'Account successfully deleted',
        });
      } else {
        res.status(500).json({
          status: 500,
          message: 'Sorry, you pushed the right buttons but we couldn\'t delete the account',
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        error: 'We could not find that account. Check it up and retry...',
      });
    }
  }
}
