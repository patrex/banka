import express from 'express';
import users from './routes/usersRouter';
import accounts from './routes/accountsRouter';
import transactions from './routes/transactionsRouter';

const app = express();

export default app;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'welcome to banka apis',
  });
});

app.use('/api/v1/auth', users);
app.use('/api/v1/accounts', accounts);
app.use('/api/v1/transactions', transactions);

const port = 3000 || process.env.PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App started at localhost:${port}`);
});
