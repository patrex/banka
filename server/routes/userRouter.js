import express from 'express';
import UserController from '../controllers/userController';

const userController = new UserController();
const router = express.Router({ mergeParams: true });
router.get('/:email/accounts', userController.getAllAccountsByUser);

export default router;
