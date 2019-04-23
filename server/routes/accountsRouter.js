import express from 'express';
import AccountController from '../controllers/accountsController';
import AccountValidator from '../middlewares/accountsValidator';

const accountValidator = new AccountValidator();
const accountController = new AccountController();

const router = express.Router({ mergeParams: true });

router.post('/', [
  accountValidator.validateAccountInfo,
  accountController.createBankAccount,
]);

router.patch('/:accountNumber(\\d+)', accountController.activateDeactivateAccount);
router.delete('/:accountNumber(\\d+)', accountController.deleteAccount);

export default router;
