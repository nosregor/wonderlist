import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../middlewares/error';
import { IUser, User } from '../models/user';
import UserRepository, * as userRepository from '../repositories/user';

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const users: IUser[] = await UserRepository.getUsers();

    res.status(200).json(users);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export { getUsers };
