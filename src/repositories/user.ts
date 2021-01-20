import { IUser, User } from '../models/user';

export interface IUserRepository {
  /**
   * @returns { Promise<IUser[] }
   * @interface IUserRepository
   */
  getUsers(): Promise<IUser[]>;

  /**
   * @param { IUser } body
   * @returns { Promise<IUser> }
   * @interface IUserRepository
   */
  createUser(body: IUser): Promise<IUser>;

  /**
   * @param { IUser } body
   * @returns { Promise<IUser> }
   * @interface IUserRepository
   */
  getUser(body: IUser): Promise<IUser>;
}

const UserRepository: IUserRepository = {
  /**
   * @description Get all users from the database.
   * @throws {Error} If there is something wrong with the request.
   */
  async getUsers(): Promise<IUser[]> {
    try {
      return User.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param { IUser } body
   * @returns { Promise<IUser> }
   * @memberof UserRepository
   */
  async createUser(body: IUser): Promise<IUser> {
    // try {
    const user = new User({
      email: body.email,
      password: body.password,
    });

    const query: IUser = await User.findOne({
      email: body.email,
    });

    const saved = await user.save();

    return saved;
    // } catch (error) {
    //   throw error;
    // }
  },

  /**
   * @param { IUser } body
   * @returns { Promise<IUser> }
   * @memberof UserRepository
   */
  async getUser(body: IUser): Promise<IUser> {
    const { email, password } = body;
    try {
      const user: IUser = await User.findOne({
        email: email,
      });

      const isValidPassword =
        user && (await user.isValidPassword(password));

      if (!isValidPassword) {
        throw new Error('Invalid password or email');
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default UserRepository;
