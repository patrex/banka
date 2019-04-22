import express from 'express';
import AccountController from '../controllers/accountsController';
import AccountValidator from '../middlewares/accountsValidator';

const accountValidator = new AccountValidator();
const accountController = new AccountController();

const router = express.Router({ mergeParams: true });

router.get('/', accountController.getAll);
router.post('/', accountValidator.valAcctInfo, accountController.createAccount);
router.patch('/:accountNumber(\\d+)', accountController.activateDeactivate);
router.delete('/:accountNumber(\\d+)', accountController.deleteAcct);

export default router;
