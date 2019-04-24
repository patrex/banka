import express from 'express';

import AccountController from '../controllers/accountsController';
import AccountValidator from '../middlewares/accountsValidator';
import Auth from '../middlewares/authValidator';

const auth = new Auth();
const accountValidator = new AccountValidator();
const accountController = new AccountController();

const router = express.Router({ mergeParams: true });

router.post('/', [
  auth.authenticateUser,
  accountValidator.validateAccountInfo,
  accountController.createBankAccount,
]);

router.patch('/:accountNumber(\\d+)', auth.authenticateUser, accountController.activateDeactivateAccount);
router.delete('/:accountNumber(\\d+)', auth.authenticateUser, accountController.deleteAccount);

router.get(':accountNumber/transactions', accountController.getAllTransactionsByUser);

export default router;
