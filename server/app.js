import express from 'express';
import users from './routes/users.router';
import accounts from './routes/accounts.router';
// import transactions from './routes/transactions.router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth', users);
app.use('/api/v1/accounts', accounts);
// app.use('/api/v1/transactions', transactions);

module.exports = app;
