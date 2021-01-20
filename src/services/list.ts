import { NextFunction, Request, Response } from 'express';
import { Mongoose } from 'mongoose';
import { nextTick } from 'process';
import { IList, List } from '../models/list';

export interface IListService {
  /**
   * @param { IList } body
   * @returns { Promise<IList[] }
   * @interface IListService
   */
  createList(body: IList): Promise<IList>;

  /**
   * @param { string } userId
   * @returns { Promise<IList[]r> }
   * @interface IListService
   */
  getListsByUserId(userId: string): Promise<IList[]>;

  /**
   * @param { string } listId
   * @returns { Promise<IList[]> }
   * @interface IListService
   */
  getListById(listId: string): Promise<IList>;

  /**
   * @param { IList } body
   * @param { string } listId
   * @returns { Promise<IList> }
   * @interface IListService
   */
  updateListById(body: IList, listId: string): Promise<IList>;

  /**
   * @param { string } listId
   * @returns { Promise<IList> }
   * @interface IListService
   */
  deleteListById(listId: string): Promise<IList>;
}

const ListService: IListService = {
  async getListsByUserId(userId): Promise<IList[]> {
    return List.findById(userId);
  },

  async createList(body): Promise<IList> {
    return List.create(body);
  },

  async getListById(listId): Promise<IList> {
    return List.findById(listId).populate('tasks');
  },

  async updateListById(body, listId): Promise<IList> {
    const filter = { _id: listId };
    const update = {
      $set: body,
    };
    const options = { new: true };

    const list = List.findByIdAndUpdate(filter, update, options);
    return list;
  },

  async deleteListById(listId): Promise<IList> {
    const list: IList = await List.findById(listId);
    if (list) {
      await list.remove();
    }
    return list;
  },
};

export default ListService;
