import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../middlewares/error';
import { IList, List } from '../models/list';
import { ITask, Task } from '../models/task';
import ListService from '../services/list';

export interface ITaskService {
  /**
   * @param { Object } body
   * @returns { Promise<ITask }
   * @interface ITaskService
   */
  createTask(listId: string, body: ITask): Promise<IList>;

  /**
   * @param { string } listId
   * @param { string } taskId
   * @returns { Promise<ITask> }
   * @interface ITaskService
   */
  getTaskById(listId: string, taskId: string): Promise<ITask[]>;

  /**
   * @param { string } listId
   * @param { string } taskId
   * @param { ITask } body
   * @returns { Promise<IList> }
   * @interface ITaskService
   */
  updateTaskById(
    listId: string,
    taskId: string,
    body: ITask,
  ): Promise<IList>;

  /**
   * @param { string } taskId
   * @param { string } user
   * @returns { Promise<IList> }
   * @interface ITaskService
   */
  deleteTaskById(taskId: string, user: string): Promise<IList>;
}

const TaskService: ITaskService = {
  async createTask(listId, body): Promise<IList> {
    const list: IList = await List.findById(listId);

    const task = await Task.create(body);
    await list.tasks.push(task);
    const savedList = await list.save();

    return List.findById(savedList._id).populate('tasks');
  },

  async getTaskById(listId, taskId): Promise<ITask[]> {
    const list: IList = await List.findById({
      _id: listId,
    }).populate('tasks');

    const task = list.tasks.filter(
      (task) => String(task._id) === taskId,
    );

    return task;
  },

  async updateTaskById(listId, taskId, body): Promise<IList> {
    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: body,
      },
      { new: true },
    );
    const list: IList = await List.findById({
      _id: listId,
      'tasks._id': taskId,
    }).populate('tasks');

    return list;
  },

  async deleteTaskById(taskId, userId): Promise<IList> {
    const filter = { user: userId };
    const update = { $pull: { tasks: taskId } };
    const options = { new: true };

    const list: IList = await List.findOneAndUpdate(
      filter,
      // @ts-ignore: Unreachable code error
      update,
      options,
    ).populate('user');

    return list;
  },
};

export default TaskService;
