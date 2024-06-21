import User from '../models/user';
import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';

const handleError = (err: any, res: Response) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'CastError') {
    return res.status(404).send({ message: 'Пользователь не найден' });
  }
  return res.status(500).send({ message: 'Произошла ошибка', error: err.message });
};

interface UserResponseType {
  name: string,
  about: string,
  avatar: string,
  _id?: string | ObjectId,
}

const formatUserResponse = (user: any): UserResponseType => ({
  name: user.name,
  about: user.about,
  avatar: user.avatar,
  _id: user._id?.toString(),
});

export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .then((users) => res.send(users.map((user) => formatUserResponse(user))))
    .catch((err) => handleError(err, res));
};

export const getUserById = (req: Request, res: Response) => {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        res.send(formatUserResponse(user));
      }
    })
    .catch((err) => handleError(err, res));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.send(formatUserResponse(user)))
    .catch((err) => handleError(err, res));
};

export const changeUser = (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).send({ message: 'Пользователь не авторизован' });
  }

  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send(formatUserResponse(user));
    })
    .catch((err) => handleError(err, res));
};

export const changeAvatar = (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).send({ message: 'Пользователь не авторизован' });
  }

  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send(formatUserResponse(user));
    })
    .catch((err) => handleError(err, res));
};
