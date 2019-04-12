import express from 'express';
import TransCtrller from '../controllers/transactions.ctrller';

const transCtrller = new TransCtrller();
const router = express.Router({ mergeParams: true });

router.get('/', transCtrller.getAll);
router.post('/:accountNumber(\\d+)/debit', transCtrller.debitAcct);
router.post('/:accountNumber(\\d+)/credit', transCtrller.creditAcct);

module.exports = router;
