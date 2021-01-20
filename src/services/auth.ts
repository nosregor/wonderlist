import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IUser } from '../models/user';
import { HttpError } from '../middlewares/error';
import UserRepository from '../repositories/user';

/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  console.log(req.body);
  const body: IUser = req.body;
  try {
    const user = await UserRepository.createUser(body);
    console.log(user);
    const token: string = jwt.sign(
      { user: { _id: user._id } },
      'TOP_SECRET',
      {
        expiresIn: 3600, // 1 hour
      },
    );

    res.json({
      status: 200,
      logged: true,
      token: token,
      message: 'Sign in successful',
    });
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.status(400).json({ status: 400, message: error.message });
  }
};

/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await UserRepository.getUser(req.body);
    const token: string = jwt.sign(
      { user: { _id: user._id } },
      'TOP_SECRET',
    );

    res.json({
      status: 200,
      logged: true,
      token: token,
      message: 'Sign in successful',
    });
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.status(400).json({ status: 400, message: error.message });
  }
};

/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!req.user) {
    res.send({
      status: 401,
      logged: false,
      message: 'You are not logged in!',
    });
  }
  if (req.user) {
    delete req.headers.authorization; // destroy session on server side
    req.logout();
    res.send({
      status: 200,
      logged: false,
      message: 'Successfully logged out!',
    });
  }
};

export { login, logout, signup };
