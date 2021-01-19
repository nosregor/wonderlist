import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../middlewares/error';
import { IList } from '../models/list';
import * as listRepository from '../repositories/list';
import * as taskRepository from '../repositories/task';

async function createTask(
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const userId: string = req.user._id;
  try {
    let list: IList = await listRepository.getListById(
      req.params.listId,
    );
    console.log(list);
    if (!list) {
      next(new HttpError(404, `List ${req.params.listId} not found`));
    }

    const task = await taskRepository.createTask(list, req.body);

    res.status(200).json(task);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

async function getTaskById(
  req: any,
  res: any,
  next: NextFunction,
): Promise<void> {
  const userId: string = req.user._id;
  try {
    const task = await taskRepository.getTaskFromList(
      req.params.listId,
      req.params.taskId,
    );

    return res.send(task);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

async function updateTaskById(
  req: any,
  res: any,
  next: NextFunction,
): Promise<void> {
  const userId: string = req.user._id;
  try {
    const list = await taskRepository.updateTaskFromList(
      req.params.listId,
      req.params.taskId,
      req.body,
    );
    return res.send(list);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

async function deleteTaskById(
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const userId: string = req.user._id;
  try {
    let list: IList = await listRepository.getListById(
      req.params.listId,
    );
    if (!list) {
      next(new HttpError(404, `List ${req.params.listId} not found`));
    }

    const task = await taskRepository.deleteTaskFromList(
      req.params.taskId,
      req.user,
    );

    res.status(200).json(task);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export { createTask, getTaskById, updateTaskById, deleteTaskById };
