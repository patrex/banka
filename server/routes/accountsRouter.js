import express from 'express';
import AcctCtrller from '../controllers/accountsController';
import AcctVal from '../middlewares/accountsValidator';

const acctVal = new AcctVal();

const acctCtrller = new AcctCtrller();
const router = express.Router({ mergeParams: true });

router.get('/', acctCtrller.getAll);
router.post('/', acctVal.valAcctInfo, acctCtrller.createAccount);
router.patch('/:accountNumber(\\d+)', acctCtrller.activateDeactivate);
router.delete('/:accountNumber(\\d+)', acctCtrller.deleteAcct);

export default router;
