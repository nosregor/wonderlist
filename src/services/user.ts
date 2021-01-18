import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../middlewares/error';
import { IUser, User } from '../models/user';
import * as userRepository from '../repositories/user';

async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const users: IUser[] = await userRepository.getUsers();

    res.status(200).json(users);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export { getUsers };
