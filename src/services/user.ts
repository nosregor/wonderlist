import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../middlewares/error';
import { IUser, User } from '../models/user';

export interface IUserService {
  /**
   * @returns { Promise<IUser[]> }
   * @interface IUserService
   */
  getUsers(): Promise<IUser[]>;
}

const UserService: IUserService = {
  async getUsers(): Promise<IUser[]> {
    return User.find({});
  },
};

export default UserService;
