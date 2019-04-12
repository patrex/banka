import express from 'express';
import AcctCtrller from '../controllers/accounts.ctrller';
import AcctVal from '../middleware/accounts.validate';

const acctVal = new AcctVal();

const acctCtrller = new AcctCtrller();
const router = express.Router({ mergeParams: true });

router.get('/', acctCtrller.getAll);
router.post('/', acctVal.valAcctInfo, acctCtrller.createAccount);
router.patch('/:accountNumber(\\d+)', acctCtrller.activateDeactivate);
router.delete('/:accountNumber(\\d+)', acctCtrller.deleteAcct);

module.exports = router;
