import { IList, List } from '../models/list';
import { ITask, Task } from '../models/task';
import { IUser } from '../models/user';

async function createTask(list: IList, body: any): Promise<ITask> {
  try {
    const task = (await Task.create(body)) as ITask;
    await list.tasks.push(task);
    const savedList = await list.save();

    return List.findById(savedList._id).populate('tasks');
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getTaskFromList(
  listId: string,
  taskId: string,
): Promise<ITask[]> {
  try {
    const list = await List.findById({
      _id: listId,
    }).populate('tasks');

    if (!list) {
      return [];
    }

    const task = list.tasks.filter(
      (task: ITask) => String(task._id) === taskId,
    );

    return task;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateTaskFromList(
  listId: string,
  taskId: string,
  body: Object,
): Promise<IList[]> {
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: body,
      },
      { new: true },
    );
    const list = await List.findById({
      _id: listId,
      'tasks._id': taskId,
    }).populate('tasks');

    return list;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteTaskFromList(
  taskId: string,
  user: IUser,
): Promise<IList[]> {
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
}

export {
  createTask,
  getTaskFromList,
  updateTaskFromList,
  deleteTaskFromList,
};
