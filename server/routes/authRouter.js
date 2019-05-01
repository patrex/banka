import express from 'express';

import AuthController from '../controllers/authController';
import Auth from '../middlewares/authValidator';

const auth = new Auth();
const authController = new AuthController();

const router = express.Router({ mergeParams: true });

router.post('/signup', auth.validateUserInput, authController.createUser);
router.post('/signin', auth.validateSignIn, authController.signIn);

export default router;
