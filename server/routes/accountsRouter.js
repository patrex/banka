import express from 'express';

import AccountController from '../controllers/accountsController';
import AccountValidator from '../middlewares/accountsValidator';
import Auth from '../middlewares/authValidator';

const auth = new Auth();
const accountValidator = new AccountValidator();
const accountController = new AccountController();

const router = express.Router({ mergeParams: true });

router.get('/', auth.authenticateStaff, accountController.getAllAccounts);

router.post('/', [
  auth.authenticateUser,
  accountValidator.validateAccountInfo,
  accountController.createBankAccount,
]);

router.patch('/:accountNumber(\\d+)', auth.authenticateStaff, accountController.activateDeactivateAccount);
router.delete('/:accountNumber(\\d+)', auth.authenticateStaff, accountController.deleteAccount);

router.get('/:accountNumber', auth.authenticateUser, accountController.getAccountDetails);
router.get('/:accountNumber/transactions', auth.authenticateStaff, accountController.getAllTransactionsByUser);

export default router;
