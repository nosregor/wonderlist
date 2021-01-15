import * as userRepository from '../repositories/user';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import { HttpError } from '../middlewares/error';
import { NextFunction, Response } from 'express';

async function signup(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await userRepository.createUser(req.body);

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
    res.json({ status: 400, message: error.message });
  }
}
// $2b$10$z3FhLO5h/Dvmg4T1VdqqOOMlRrjTXBXPRnnLlsvDjjfdMOZT6gP9K

async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // @ts-ignore: Unreachable code error

    const user = await userRepository.getUser(req.body);

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
    res.json({ status: 400, message: error.message });
  }
}

export { login, signup };
