import { createCard, getCards, deleteCardById, likeCard, dislikeCard } from '../controllers/card';
import { Router} from 'express';

const router = Router();

router.get('/', getCards);

router.post('/', createCard);
router.delete('/:id', deleteCardById);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

export default router;