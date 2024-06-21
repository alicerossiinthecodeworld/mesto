import { Router} from 'express';
import { getUsers, getUserById, createUser, changeUser, changeAvatar} from '../controllers/user';

const router = Router();
router.get('/', getUsers);

router.get('/:userId', getUserById);

router.post('/', createUser);

router.patch('/me', changeUser);

router.patch('/me/avatar', changeAvatar)

export default router;