import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../middlewares/error';
import { IList } from '../models/list';
import { ITask } from '../models/task';
import ListRepository from '../repositories/list';
import TaskRepository from '../repositories/task';

/**
 * @param { Request } req
 * @param { Respons } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
async function createTask(
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    let list: IList = await ListRepository.getListById(
      req.params.listId,
    );
    if (!list) {
      next(new HttpError(404, `List ${req.params.listId} not found`));
    }

    const body: ITask = req.body;
    const task = await TaskRepository.createTask({ list, body });

    res.status(200).json(task);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @param { Request } req
 * @param { Respons } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
async function getTaskById(
  req: any,
  res: any,
  next: NextFunction,
): Promise<void> {
  const { listId, taskId } = req.params;
  try {
    const task = await TaskRepository.getTaskFromList({
      listId,
      taskId,
    });

    return res.send(task);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @param { Request } req
 * @param { Respons } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
async function updateTaskById(
  req: any,
  res: any,
  next: NextFunction,
): Promise<void> {
  const { listId, taskId } = req.params;
  const { body } = req.body;

  try {
    const list = await TaskRepository.updateTaskFromList({
      listId,
      taskId,
      body,
    });
    return res.send(list);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @param { Request } req
 * @param { Respons } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
async function deleteTaskById(
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    let list: IList = await ListRepository.getListById(
      req.params.listId,
    );
    if (!list) {
      next(new HttpError(404, `List ${req.params.listId} not found`));
    }

    const task = await TaskRepository.deleteTaskFromList(
      req.params.taskId,
      req.user,
    );

    res.status(200).json(task);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export { createTask, getTaskById, updateTaskById, deleteTaskById };
