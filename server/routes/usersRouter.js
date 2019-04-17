import express from 'express';
import UsersCtrller from '../controllers/usersController';
import Auth from '../middlewares/usersValidator';

const auth = new Auth();

const usersCtrller = new UsersCtrller();
const router = express.Router({ mergeParams: true });

router.get('/', usersCtrller.getAll);
router.post('/signup', auth.validateUserInput, usersCtrller.createUser);
router.post('/signin', auth.validateSignIn, usersCtrller.signIn);

export default router;
