import express from 'express';
import UsersCtrller from '../controllers/users.ctrller';

const usersCtrller = new UsersCtrller();
const router = express.Router({ mergeParams: true });

router.get('/', usersCtrller.getAll);
router.post('/signup', usersCtrller.createUser);
router.post('/signin', usersCtrller.signIn);

module.exports = router;
