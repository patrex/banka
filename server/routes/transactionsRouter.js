import express from 'express';
import TransactionController from '../controllers/transactionsController';
import TransactionValidator from '../middlewares/transactionsValidator';

const transactionValidator = new TransactionValidator();
const transactionController = new TransactionController();

const router = express.Router({ mergeParams: true });

router.post('/:accountNumber(\\d+)/debit', [
  transactionValidator.validateTransaction,
  transactionController.debitAccount,
]);

router.post('/:accountNumber(\\d+)/credit', [
  transactionValidator.validateTransaction,
  transactionController.creditAccount,
]);

export default router;
