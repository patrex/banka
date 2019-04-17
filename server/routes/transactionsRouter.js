import express from 'express';
import TransCtrller from '../controllers/transactionsController';
import TransValid from '../middlewares/transactionsValidator';

const transValid = new TransValid();
const transCtrller = new TransCtrller();
const router = express.Router({ mergeParams: true });

router.get('/', transCtrller.getAll);
router.post('/:accountNumber(\\d+)/debit', transValid.valTransaction, transCtrller.debitAcct);
router.post('/:accountNumber(\\d+)/credit', transValid.valTransaction, transCtrller.creditAcct);

export default router;
