import express from 'express';
import UsersCtrller from '../controllers/usersController';
import Auth from '../middleware/usersValidator';

const auth = new Auth();

const usersCtrller = new UsersCtrller();
const router = express.Router({ mergeParams: true });

router.get('/', usersCtrller.getAll);
router.post('/signup', auth.valUserInput, usersCtrller.createUser);
router.post('/signin', auth.valSignIn, usersCtrller.signIn);

module.exports = router;
