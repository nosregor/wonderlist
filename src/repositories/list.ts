import { IList, List } from '../models/list';

export type PropsUpdateList = {
  body: {
    status: boolean;
    title: string;
  };
  listId: string;
};

export interface IListRepository {
  /**
   * @param { IList } body
   * @returns { Promise<IList[] }
   * @interface IListRepository
   */
  createList(body: IList): Promise<IList>;

  /**
   * @param { string } userId
   * @returns { Promise<IList[]r> }
   * @interface IListRepository
   */
  getListsByUserId(userId: string): Promise<IList[]>;

  /**
   * @param { string } listId
   * @returns { Promise<IList[]r> }
   * @interface IListRepository
   */
  getListById(listId: string): Promise<IList>;

  /**
   * @param { PropsUpdateList } props
   * @returns { Promise<IList> }
   * @interface IListRepository
   */
  updateListById(props: PropsUpdateList): Promise<IList>;

  /**
   * @param { string } listId
   * @returns { Promise<IList> }
   * @interface IListRepository
   */
  deleteListById(listId: string): Promise<IList>;
}

const ListRepository: IListRepository = {
  /**
   *
   * @param { IList } body
   * @returns { Promise<IList> }
   * @memberof listRepositories
   */
  async createList(body: IList): Promise<IList> {
    try {
      return List.create(body);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param { string } userId
   * @returns { Promise<IList[]> }
   * @memberof listRepositories
   */
  async getListsByUserId(userId: string): Promise<IList[]> {
    try {
      return List.find({ user: userId });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getListById(listId: string): Promise<IList> {
    try {
      return List.findById(listId).populate('tasks');
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // @ts-ignore: Unreachable code error
  async updateListById(props: PropsUpdateList): Promise<IList> {
    const { listId, body } = props;
    try {
      const filter = { _id: listId };
      const update = {
        $set: body,
      };
      const options = { new: true };

      return List.findByIdAndUpdate(filter, update, options);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deleteListById(listId: string): Promise<IList> {
    try {
      const list = await List.findById(listId);
      if (list) {
        await list.remove();
      }
      return list;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default ListRepository;
