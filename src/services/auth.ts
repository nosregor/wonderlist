import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IUser, User } from '../models/user';
import { HttpError } from '../middlewares/error';

export interface IAuthService {
  /**
   * @param { IUser } body
   * @returns { Promise<string> }
   * @interface IAuthService
   */
  signup(body: IUser): Promise<string>;

  /**
   * @param { IUser } body
   * @returns { Promise<string> }
   * @interface IAuthService
   */
  login(body: IUser): Promise<string>;
}

const AuthService: IAuthService = {
  async signup(body: IUser): Promise<string> {
    const user = await User.create({
      email: body.email,
      password: body.password,
    });

    const token: string = jwt.sign(
      { user: { _id: user._id } },
      'TOP_SECRET',
      {
        expiresIn: 3600, // 1 hour
      },
    );

    return token;
  },

  async login(body): Promise<string> {
    const { email, password } = body;

    const user: IUser = await User.findOne({
      email: body.email,
    });

    const isValidPassword: boolean =
      user && (await user.isValidPassword(body.password));

    if (!isValidPassword) {
      throw new HttpError(401, 'Invalid password or email');
    }

    const token: string = jwt.sign(
      { user: { _id: user._id } },
      'TOP_SECRET',
    );
    return token;
  },
};

export default AuthService;
