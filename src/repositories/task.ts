import { IList, List } from '../models/list';
import { ITask, Task } from '../models/task';

export type PropsTask = {
  listId: string;
  taskId?: string;
  body?: ITask;
};

export type PropsCreateTask = {
  list: IList;
  body: ITask;
};

export interface ITaskRepository {
  /**
   * @param { Object } body
   * @returns { Promise<ITask }
   * @interface ITaskRepository
   */
  createTask(props: PropsCreateTask): Promise<ITask>;

  /**
   * @param { string } listId
   * @param { string } taskId
   * @returns { Promise<ITask> }
   * @interface ITaskRepository
   */
  getTaskFromList(props: PropsTask): Promise<ITask[]>;

  /**
   * @param { string } listId
   * @param { string } taskId
   * @param { ITask } body
   * @returns { Promise<IList> }
   * @interface ITaskRepository
   */
  updateTaskFromList(props: PropsTask): Promise<IList>;

  /**
   * @param { string } taskId
   * @param { string } user
   * @returns { Promise<IList> }
   * @interface ITaskRepository
   */
  deleteTaskFromList(taskId: string, user: string): Promise<IList>;
}

const TaskRepository: ITaskRepository = {
  async createTask(props: PropsCreateTask): Promise<ITask> {
    try {
      const list = props.list;
      const task = (await Task.create(props)) as ITask;
      await list.tasks.push(task);
      const savedList = await list.save();

      return List.findById(savedList._id).populate('tasks');
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getTaskFromList(props: PropsTask): Promise<ITask[]> {
    try {
      const list: IList = await List.findById({
        _id: props.listId,
      }).populate('tasks');

      if (!list) {
        return [];
      }

      const task = list.tasks.filter(
        (task) => String(task._id) === props.taskId,
      );

      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateTaskFromList(props: PropsTask): Promise<IList> {
    try {
      const task = await Task.findByIdAndUpdate(
        props.taskId,
        {
          $set: props.body,
        },
        { new: true },
      );
      const list = await List.findById({
        _id: props.listId,
        'tasks._id': props.taskId,
      }).populate('tasks');

      return list;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deleteTaskFromList(
    taskId: string,
    user: string,
  ): Promise<IList> {
    try {
      const filter = { user: user };
      const update = { $pull: { tasks: taskId } };
      const options = { new: true };

      const list = await List.findOneAndUpdate(
        filter,
        // @ts-ignore: Unreachable code error
        update,
        options,
      ).populate('user');

      return list;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default TaskRepository;
