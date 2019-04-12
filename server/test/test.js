/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import app from '../server';


// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;

// eslint-disable-next-line no-undef
describe('GET /api/v1/auth', () => {
  it('get all users', (done) => {
    request(app)
      .get('/api/v1/auth')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body).to.have.property('status').to.equal(200);
        done();
      });
  });

  it('responds with json', (done) => {
    request(app)
      .get('/api/v1/auth')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should have property data', (done) => {
    request(app)
      .get('/api/v1/auth')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        done(err);
      });
  });

  it('property data should be empty, be an array', (done) => {
    request(app)
      .get('/api/v1/auth')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data').to.be.empty;
        expect(res.body).to.have.property('data').to.be.an('array');
        done(err);
      });
  });
});


// eslint-disable-next-line no-undef
describe('POST /signup', () => {
  const user = {
    firstname: 'Buoy',
    middlename: 'Jason',
    lastname: 'Whyte',
    email: 'buoy.jason@ch.com',
    password: 'hallmark',
    rpassword: 'hallmark',
    type: 'cashier',
    username: 'grunt',
  };

  // eslint-disable-next-line no-undef
  it('should create a new user', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
  });

  // eslint-disable-next-line no-undef
  it('should ensure that the response object has all required properties', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, response) => {
        expect(response.body).to.have.property('data').to.have.property('token');
        expect(response.body).to.have.property('data').to.have.property('firstname');
        expect(response.body).to.have.property('data').to.have.property('lastname');
        expect(response.body).to.have.property('data').to.have.property('email');
        expect(response.body).to.have.property('data').to.have.property('type');
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it('should ensure that the response has values for all required properties', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, response) => {
        expect(response.body).to.have.property('data').to.have.property('token').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('firstname').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('lastname').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('email').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('type').to.not.be.empty;
        done();
      });
  });
});

describe('POST /signin', () => {
  // eslint-disable-next-line no-undef
  const login = {
    username: 'grunt0',
    password: 'hallmark',
  };
  it('user should be able to signin', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send(login)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('response should have all required fields', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send(login)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, response) => {
        expect(response.body).to.not.be.empty;
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('data');
        done();
      });
  });

  it('ensure response has values for all required fields', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send(login)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, response) => {
        expect(response.body).to.have.property('status').to.equal(200);
        expect(response.body).to.have.property('data').to.have.property('token').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('firstname').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('lastname').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('username').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('email').to.not.be.empty;
        done();
      });
  });
});

describe('GET /accounts', () => {
  it('should get all accounts', (done) => {
    request(app)
      .get('/api/v1/accounts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body).to.have.property('status').to.equal(200);
        done();
      });
  });

  it('responds with json', (done) => {
    request(app)
      .get('/api/v1/accounts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('property data should be an array', (done) => {
    request(app)
      .get('/api/v1/accounts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data').to.be.an('array');
        done(err);
      });
  });
});

describe('POST /accounts', () => {
  const user = {
    firstname: 'Elijah',
    middlename: 'Okilom',
    lastname: 'Iloye',
    dob: '12-12-2000',
    email: 'elijah@mailer.com',
    phone: '18002569751',
    houseNum: '123',
    streetName: 'Oye Wali',
    city: 'Dugal',
    state: 'Sparse Springs',
    acctType: 'Savings',
    openingBalance: 15.45,
  };

  it('should create a new bank account', (done) => {
    request(app)
      .post('/api/v1/accounts')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
  });

  it('should ensure that the response object has all required properties', (done) => {
    request(app)
      .post('/api/v1/accounts')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, response) => {
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('data');
        expect(response.body).to.have.property('data').to.have.property('accountNumber');
        expect(response.body).to.have.property('data').to.have.property('firstname');
        expect(response.body).to.have.property('data').to.have.property('lastname');
        expect(response.body).to.have.property('data').to.have.property('email');
        expect(response.body).to.have.property('data').to.have.property('type');
        expect(response.body).to.have.property('data').to.have.property('status');
        expect(response.body).to.have.property('data').to.have.property('openingBalance');
        done();
      });
  });

  it('should ensure that the response has values for all required properties', (done) => {
    request(app)
      .post('/api/v1/accounts')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, response) => {
        expect(response.body).to.have.property('data').to.have.property('accountNumber').to.not.be.null;
        expect(response.body).to.have.property('data').to.have.property('firstname').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('lastname').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('email').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('type').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('status').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('openingBalance').to.be.a('number');
        done();
      });
  });

  it('should ensure that the response correct types for fields', (done) => {
    request(app)
      .post('/api/v1/accounts')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, response) => {
        expect(response.body).to.have.property('data').to.have.property('accountNumber').to.be.be.a('number');
        expect(response.body).to.have.property('data').to.have.property('firstname').to.be.a('string');
        expect(response.body).to.have.property('data').to.have.property('lastname').to.be.a('string');
        expect(response.body).to.have.property('data').to.have.property('email').to.be.a('string');
        expect(response.body).to.have.property('data').to.have.property('type').to.be.a('string');
        expect(response.body).to.have.property('data').to.have.property('status').to.be.a('string');
        expect(response.body).to.have.property('data').to.have.property('openingBalance').to.be.a('number');
        done();
      });
  });
});

describe('PATCH /accounts/:account-number', () => {
  it('should activate account', (done) => {
    const accountStatus = {
      status: 'active',
    };

    request(app)
      .patch('/api/v1/accounts/0')
      .send(accountStatus)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(202, done);
  });

  it('should set account status to pending', (done) => {
    const account = {
      status: 'pending',
    };

    request(app)
      .patch('/api/v1/accounts/0')
      .send(account)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(202, done);
  });

  it('should set account dormant', (done) => {
    const account = {
      status: 'dormant',
    };
    request(app)
      .patch('/api/v1/accounts/0')
      .send(account)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(202, done);
  });
});

describe('POST /transactions/:account-number/debit', () => {
  const debit = {
    amount: 2.0,
    cashierID: 0,
    transactionType: 'Debit',
  };

  it('shouls ensure response status is 202', (done) => {
    request(app)
      .post('/api/v1/transactions/0/debit')
      .send(debit)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, response) => {
        expect(response.body).to.have.property('status').to.equal(202);
        expect(response.body).to.have.property('data').to.not.be.empty;
        done();
      });
  });
  it('should ensure response body has all required fields', (done) => {
    request(app)
      .post('/api/v1/transactions/0/debit')
      .send(debit)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, response) => {
        expect(response.body).to.have.property('data').to.have.property('transactionID').to.not.be.null;
        expect(response.body).to.have.property('data').to.have.property('amount').to.be.a('number');
        expect(response.body).to.have.property('data').to.have.property('accountNumber').to.be.a('number');
        expect(response.body).to.have.property('data').to.have.property('cashierID').to.be.a('number');
        expect(response.body).to.have.property('data').to.have.property('accountNumber').to.be.a('number');
        expect(response.body).to.have.property('data').to.have.property('transactionType').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('oldBalance').to.be.a('number');
        expect(response.body).to.have.property('data').to.have.property('newBalance').to.be.a('number');
        done();
      });
  });

  it('should ensure oldBalance is larger than newBalance', (done) => {
    request(app)
      .post('/api/v1/transactions/0/debit')
      .send(debit)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, response) => {
    
        done();
      });
  });
});

describe('POST /transactions/:account-number/credit', () => {
  const credit = {
    amount: 2.0,
    cashierID: 0,
    transactionType: 'Credit',
  };
  it('shouls ensure response status is 202', (done) => {
    request(app)
      .post('/api/v1/transactions/0/credit')
      .send(credit)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, response) => {
        expect(response.body).to.have.property('status').to.equal(202);
        expect(response.body).to.have.property('data').to.not.be.empty;
        done();
      });
  });
  it('should ensure response has all required fields', (done) => {
    request(app)
      .post('/api/v1/transactions/0/credit')
      .send(credit)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, response) => {
        expect(response.body).to.have.property('data').to.have.property('transactionID').to.not.be.null;
        expect(response.body).to.have.property('data').to.have.property('amount').to.be.a('number');
        expect(response.body).to.have.property('data').to.have.property('accountNumber').to.be.a('number');
        expect(response.body).to.have.property('data').to.have.property('cashierID').to.be.a('number');
        expect(response.body).to.have.property('data').to.have.property('accountNumber').to.be.a('number');
        expect(response.body).to.have.property('data').to.have.property('transactionType').to.not.be.empty;
        expect(response.body).to.have.property('data').to.have.property('oldBalance').to.be.a('number');
        expect(response.body).to.have.property('data').to.have.property('newBalance').to.be.a('number');
        done();
      });
  });
  it('should ensure newBalance is greater than oldBalance');
});

describe('GET /transactions', () => {
  it('should get all transactions', (done) => {
    request(app)
      .get('/api/v1/transactions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body).to.have.property('status').to.equal(200);
        done();
      });
  });

  it('responds with json', (done) => {
    request(app)
      .get('/api/v1/transactions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('property data be an array', (done) => {
    request(app)
      .get('/api/v1/transactions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data').to.be.an('array');
        done(err);
      });
  });
});

describe('DELETE /accounts/:account-number', () => {
  it('should delete an existing bank account', (done) => {
    request(app)
      .delete(`/api/v1/accounts/${0}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
