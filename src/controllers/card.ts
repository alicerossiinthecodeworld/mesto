import Card from '../models/card';
import { Request, Response } from 'express';

const handleError = (err: any, res: Response) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'CastError') {
    return res.status(404).send({ message: 'Карточка не найдена' });
  }
  return res.status(500).send({ message: 'Произошла ошибка' });
};

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(err, res));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  return Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

export const deleteCardById = (req: Request, res: Response) => {
  const { cardId } = req.params;

  return Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => handleError(err, res));
};

export const likeCard = (req: Request, res: Response) => {
  const userId = req.user?._id;

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => handleError(err, res));
};

export const dislikeCard = (req: Request, res: Response) => {
  const userId = req.user?._id;

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => handleError(err, res));
};
