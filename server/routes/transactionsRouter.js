import express from 'express';

import Auth from '../middlewares/authValidator';
import TransactionController from '../controllers/transactionsController';
import TransactionValidator from '../middlewares/transactionsValidator';

const auth = new Auth();
const transactionValidator = new TransactionValidator();
const transactionController = new TransactionController();

const router = express.Router({ mergeParams: true });

router.get('/:transactionID', auth.authenticateUser, transactionController.getOneTransaction);
router.get('/', auth.authenticateUser, transactionController.getAllTransactions);

router.post('/:accountNumber(\\d+)/debit', [
  auth.authenticateUser,
  transactionValidator.validateTransaction,
  transactionController.debitAccount,
]);

router.post('/:accountNumber(\\d+)/credit', [
  auth.authenticateUser,
  transactionValidator.validateTransaction,
  transactionController.creditAccount,
]);

export default router;
