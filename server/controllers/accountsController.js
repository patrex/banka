/* eslint-disable class-methods-use-this */
import accounts from '../models/accountsModel';

export default class Accounts {
  getAllAccounts(req, res) {
    return res.status(200).json({
      status: 200,
      data: accounts,
    });
  }


  createAccount(req, res) {
    const accountID = accounts.length;

    const {
      firstname, middlename, lastname,
      dob, email, phone, houseNumber,
      streetName, city, state,
      accountType, openingBalance,
    } = req.body;

    const account = {
      firstname,
      middlename,
      lastname,
      dob,
      email,
      phone,
      houseNumber,
      streetName,
      city,
      state,
      accountType,
      openingBalance,
    };
    const acctNum = `${accounts.length}`;

    account.acctNumber = acctNum;
    account.id = accountID;
    account.status = 'pending';
    account.balance = openingBalance;
    account.owner = req.body.owner;
    account.createdOn = Date.now();

    accounts.push(account);

    res.status(201).json({
      status: 201,
      data: {
        accountNumber: parseInt(accounts[accountID].acctNumber, 10),
        firstname: accounts[accountID].firstname,
        lastname: accounts[accountID].lastname,
        email: accounts[accountID].email,
        type: accounts[accountID].accountType,
        status: accounts[accountID].status,
        openingBalance: accounts[accountID].balance,
      },
    });
  }

  activateDeactivateAccount(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;

    const accountID = accountNumber;
    if (accountID !== -1) {
      accounts[accountID].status = status;

      res.status(202).json({
        status: 202,
        data: {
          accountNumber: accounts[accountID].acctNumber,
          status: accounts[accountID].status,
        },
      });
    } else {
      res.status(404).json({
        status: 404,
        error: 'Account number not found. Check the number and try again',
      });
    }
  }

  deleteAccount(req, res) {
    const { accountNumber } = req.params;

    const accountID = accounts.findIndex(account => account.acctNumber === accountNumber);
    if (accountID !== -1) {
      if (accounts.splice(accountID)) {
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
