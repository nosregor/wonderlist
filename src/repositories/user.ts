import { IUser, User } from '../models/user';

/**
 * Get all users from the database.
 * @throws {Error} If there is something wrong with the request.
 */
async function getUsers(): Promise<IUser[]> {
  try {
    return User.find({});
  } catch (error) {
    throw new Error(error.message);
  }
}

// @ts-ignore: Unreachable code error
async function createUser(body: any): Promise<IUser> {
  try {
    const user = new User({
      email: body.email,
      password: body.password,
    });

    const query: IUser = await User.findOne({
      email: body.email,
    });

    if (query) {
      throw new Error('This email already exists');
    }

    const saved = await user.save();
    // @ts-ignore: Unreachable code error

    return saved;
  } catch (error) {
    throw new Error(error);
  }
}

async function getUser(body: IUser): Promise<IUser> {
  try {
    const user: IUser = await User.findOne({
      email: body.email,
    });

    const isValidPassword =
      user && (await user.isValidPassword(body.password));

    if (!isValidPassword) {
      throw new Error('Invalid password or email');
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

export { createUser, getUsers, getUser };
