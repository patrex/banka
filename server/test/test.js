import chaiHttp from 'chai-http';
import chai from 'chai';

import server from '../server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Test All Endpoints', () => {
  // define tokens
  let clientToken;
  let staffToken;
  let adminToken;

  const client = {
    firstname: 'John',
    lastname: 'Smith',
    email: 'client.user@mailserver.com',
    password: 'hallmark',
    type: 'client',
    isAdmin: false,
  };

  const staff = {
    firstname: 'John',
    lastname: 'Smith',
    email: 'staff@banka.com',
    password: 'hallmark',
    type: 'staff',
    isAdmin: false,
  };

  const admin = {
    firstname: 'John',
    lastname: 'Smith',
    email: 'admin@banka.com',
    password: 'hallmark',
    type: 'admin',
    isAdmin: true,
  };

  before( (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(staff)
      .end((err, res) => {
        const { token } = res.body.data;
        staffToken = token;
        done();
      });
  });

  before( (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(admin)
      .end((err, res) => {
        const { token } = res.body.data;
        adminToken = token;
        done();
      });
  });
  describe('POST /api/v1/auth/signup', () => {
    describe('Client Signup - POST /api/v1/auth/signup', () => {
      it('should register a client', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(client)
          .end((err, res) => {
            const { token } = res.body.data;
            clientToken = token;
            expect(res.body.status).to.equal(201);
            done();
          });
      });
    
      it('should reject with 400 if any required data is absent or not valid', (done) => {
        const clientErr = {
          firstname: '',
          lastname: 'Smith',
          email: 'client.user@mailserver.com',
          password: 'hallmark',
          type: 'client',
          isAdmin: false,
        };
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(clientErr)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
      
      it('should reject with 400 if user tries to signup with existing email', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(client)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });

      describe('Client Signin POST /api/v1/auth/signin', () => {
        it('Client with account should be able to sign in', (done) => {
          chai.request(server)
            .post('/api/v1/auth/signin')
            .send({
              email: client.email,
              password: client.password,
            })
            .end((err, res) => {
              expect(res.body.status).to.equal(200);
              done();
            });
        });

        it('should reject with 400 if invalid email is provided', (done) => {
          chai.request(server)
            .post('/api/v1/auth/signin')
            .send({
              email: 'non-existent@user.com',
              password: client.password,
            })
            .end((err, res) => {
              expect(res.body.status).to.equal(400);
              done();
            });
        });

        it('should reject with 400 if invalid password is provided', (done) => {
          chai.request(server)
            .post('/api/v1/auth/signin')
            .send({
              email: client.email,
              password: `${client.password}01`,
            })
            .end((err, res) => {
              expect(res.body.status).to.equal(400);
              done();
            });
        });
      });
    });
  });

  describe('Accounts POST /api/v1/accounts', () => {
    const account = {
      accountType: 'Savings',
      balance: 0,
      owner: 1,
      status: 'ACTIVE',
    };
    it('User should be able to create a bank account', (done) => {
      chai.request(server)
        .post('/api/v1/accounts')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(account)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          done();
        });
    });

    it('Should reject with 400 if no owner is specified', (done) => {
      const accountNoOwner = {
        accountType: 'Savings',
        balance: 0,
        status: 'ACTIVE',
      };
      chai.request(server)
        .post('/api/v1/accounts')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(accountNoOwner)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });

    it('Should reject with 400 if non-existent owner not specified', (done) => {
      const accountNonExistentOwner = {
        accountType: 'Savings',
        balance: 0,
        owner: 10,
        status: 'ACTIVE',
      };
      chai.request(server)
        .post('/api/v1/accounts')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(accountNonExistentOwner)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });

    it('Should reject with 401 if token not specified', (done) => {
      chai.request(server)
        .post('/api/v1/accounts')
        .send(account)
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          done();
        });
    });

    describe('Cashier Ops - /api/v1/accounts', () => {
      it('Staff should be able to set account DORMANT', (done) => {
        chai.request(server)
          .patch(`/api/v1/accounts/${1}`)
          .set('Authorization', `Bearer ${staffToken}`)
          .send({ status: 'DORMANT' })
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });

      it('Staff should be able to set account ACTIVE', (done) => {
        chai.request(server)
          .patch(`/api/v1/accounts/${1}`)
          .set('Authorization', `Bearer ${staffToken}`)
          .send({ status: 'ACTIVE' })
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });

      it('Staff should be able to view all bank accounts', (done) => {
        chai.request(server)
          .get('/api/v1/accounts')
          .set('Authorization', `Bearer ${staffToken}`)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });

      it('Staff should be able to view info about a particular account', (done) => {
        chai.request(server)
          .get('/api/v1/accounts/1')
          .set('Authorization', `Bearer ${staffToken}`)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });

      it('Staff should be able to view all ACTIVE accounts', (done) => {
        chai.request(server)
          .get('/api/v1/accounts?status=ACTIVE')
          .set('Authorization', `Bearer ${staffToken}`)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });

      const dormantAccount = {
        accountType: 'Savings',
        balance: 0,
        owner: 1,
        status: 'DORMANT',
      };

      before((done) => {
        chai.request(server)
          .post('/api/v1/accounts')
          .set('Authorization', `Bearer ${clientToken}`)
          .send(dormantAccount)
          .end((err, res) => {
            done();
          });
      });

      it('Staff should be able to view all DORMANT accounts', (done) => {
        chai.request(server)
          .get('/api/v1/accounts?status=DORMANT')
          .set('Authorization', `Bearer ${staffToken}`)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });
  });

  describe('Transactions - POST /api/v1/transactions/', () => {
    const credit = {
      amount: 5000,
      cashierID: 1,
      transactionType: 'Gift Wrap',
    };

    const debit = {
      amount: 1500,
      cashierID: 1,
      transactionType: 'POS Purchase',
    };

    it('Staff should be able to credit a bank account', (done) => {
      chai.request(server)
        .post('/api/v1/transactions/1/credit')
        .set('Authorization', `Bearer ${staffToken}`)
        .send(credit)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          done();
        });
    });

    it('Staff should be able to debit a bank account', (done) => {
      chai.request(server)
        .post('/api/v1/transactions/1/debit')
        .set('Authorization', `Bearer ${staffToken}`)
        .send(debit)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          done();
        });
    });

    it('Should reject with 400 if amount is less than 500', (done) => {
      const creditLowAmount = {
        amount: -1,
        cashierID: 1,
        transactionType: 'Gift Wrap',
      };

      chai.request(server)
        .post('/api/v1/transactions/1/debit')
        .set('Authorization', `Bearer ${staffToken}`)
        .send(creditLowAmount)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });

    it('Should reject with 400 if cashier id not supplied', (done) => {
      const creditLowAmount = {
        amount: 5000,
        transactionType: 'Gift Wrap',
      };

      chai.request(server)
        .post('/api/v1/transactions/1/debit')
        .set('Authorization', `Bearer ${staffToken}`)
        .send(creditLowAmount)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });

    it('Should reject with 400 if transaction type not defined', (done) => {
      const creditLowAmount = {
        amount: 5000,
        cashierID: 1,
      };

      chai.request(server)
        .post('/api/v1/transactions/1/debit')
        .set('Authorization', `Bearer ${staffToken}`)
        .send(creditLowAmount)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });

    it('Staff should be able to view all transactions', (done) => {
      chai.request(server)
        .get('/api/v1/transactions')
        .set('Authorization', `Bearer ${staffToken}`)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          done();
        });
    });

    it('Staff should be able to view all transactions made by a single user', (done) => {
      chai.request(server)
        .get('/api/v1/accounts/1/transactions')
        .set('Authorization', `Bearer ${staffToken}`)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          done();
        });
    });

    it('Staff should be able to view info about a single transaction', (done) => {
      chai.request(server)
        .get('/api/v1/transactions/1')
        .set('Authorization', `Bearer ${staffToken}`)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          done();
        });
    });

    it('Should return 404 if transaction not found', (done) => {
      chai.request(server)
        .get('/api/v1/transactions/10')
        .set('Authorization', `Bearer ${staffToken}`)
        .end((err, res) => {
          expect(res.body.status).to.equal(404);
          done();
        });
    });

    it('Should return 400 if invalid transaction number', (done) => {
      chai.request(server)
        .get('/api/v1/transactions/xyz')
        .set('Authorization', `Bearer ${staffToken}`)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });
});
