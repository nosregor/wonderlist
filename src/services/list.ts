import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../middlewares/error';
import { IList } from '../models/list';
import * as listRepository from '../repositories/list';

async function getListsByUserId(
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const userId: string = req.user._id;
  try {
    const lists: IList[] = await listRepository.getListsByUserId(
      userId,
    );

    res.status(200).json(lists);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

async function createList(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const list: IList = await listRepository.createList(req.body);

    res.status(200).json(list);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

async function getListById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const list: IList = await listRepository.getListById(req.body);

    res.status(200).json(list);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

async function updateListById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const list: IList = await listRepository.updateListById({
      body: req.body,
      listId: req.params.listId,
    });

    res.status(200).json(list);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

async function deleteListById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const list = await listRepository.deleteListById(
      req.params.listId,
    );

    res.status(200).json(list);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export {
  createList,
  getListsByUserId,
  getListById,
  updateListById,
  deleteListById,
};
