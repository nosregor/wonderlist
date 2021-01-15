import { IList, List } from '../models/list';

async function createList(body: any): Promise<IList> {
  try {
    // @ts-ignore: Unreachable code error
    return List.create(body) as IList;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getListsByUserId(userId: string): Promise<IList[]> {
  try {
    // @ts-ignore: Unreachable code error
    return List.find({ user: userId });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getListById(params: string): Promise<IList> {
  try {
    return List.findById(params).populate('tasks');
  } catch (error) {
    throw new Error(error.message);
  }
}
// @ts-ignore: Unreachable code error
async function updateListById({ body, listId }): Promise<IList> {
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
}

async function deleteListById(listId: string): Promise<IList> {
  try {
    const list = await List.findById(listId);
    if (list) {
      await list.remove();
    }
    return list;
  } catch (error) {
    throw new Error(error.message);
  }
}

export {
  createList,
  getListsByUserId,
  getListById,
  updateListById,
  deleteListById,
};
