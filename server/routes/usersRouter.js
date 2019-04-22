import express from 'express';
import UsersController from '../controllers/usersController';
import Auth from '../middlewares/usersValidator';

const auth = new Auth();

const usersController = new UsersController();
const router = express.Router({ mergeParams: true });

router.get('/', usersController.getAll);
router.post('/signup', auth.validateUserInput, usersController.createUser);
router.post('/signin', auth.validateSignIn, usersController.signIn);

export default router;
