import express from 'express';
import TransactionController from '../controllers/transactionsController';
import TransactionValidator from '../middlewares/transactionsValidator';

const transactionValidator = new TransactionValidator();
const transactionController = new TransactionController();
const router = express.Router({ mergeParams: true });

router.get('/', transactionController.getAll);
router.post('/:accountNumber(\\d+)/debit', transactionValidator.validateTransaction, transactionController.debitAccount);
router.post('/:accountNumber(\\d+)/credit', transactionValidator.valTransaction, transactionController.creditAcct);

export default router;
