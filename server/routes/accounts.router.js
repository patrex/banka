import express from 'express';
import AcctCtrller from '../controllers/accounts.ctrller';

const acctCtrller = new AcctCtrller();
const router = express.Router({ mergeParams: true });

router.get('/', acctCtrller.getAll);
router.post('/', acctCtrller.createAccount);
router.patch('/:accountNumber(\\d+)', acctCtrller.activateDeactivate);
router.delete('/:accountNumber(\\d+)', acctCtrller.deleteAcct);

module.exports = router;
