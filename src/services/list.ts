import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../middlewares/error';
import { IList } from '../models/list';
import ListRepository from '../repositories/list';

/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
async function getListsByUserId(
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const userId: string = req.user._id;
  try {
    const lists: IList[] = await ListRepository.getListsByUserId(
      userId,
    );

    res.status(200).json(lists);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
async function createList(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const list: IList = await ListRepository.createList(req.body);

    res.status(200).json(list);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

/**
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @returns { Promise<void> }
 */
async function getListById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const list: IList = await ListRepository.getListById(
      req.params.listId,
    );

    res.status(200).json(list);
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
async function updateListById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const props = {
    body: req.body,
    listId: req.params.listId,
  };
  try {
    const list: IList = await ListRepository.updateListById(props);

    res.status(200).json(list);
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
async function deleteListById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const list = await ListRepository.deleteListById(
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
