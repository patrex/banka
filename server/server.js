import express from 'express';

import user from './routes/userRouter';
import auth from './routes/authRouter';
import accounts from './routes/accountsRouter';
import transactions from './routes/transactionsRouter';

const app = express();

export default app;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);
app.use('/api/v1/accounts', accounts);
app.use('/api/v1/transactions', transactions);

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App started at localhost:${port}`);
});
