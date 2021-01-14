import { IUser, User } from '../models/user';

export async function getUsers(): Promise<IUser[]> {
  try {
    return User.find({});
  } catch (error) {
    throw new Error(error.message);
  }
}
