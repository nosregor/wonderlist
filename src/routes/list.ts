import { Router } from 'express';
import passport from 'passport';

import ListService from '../services/list';
import taskRouter from './task';
import { isAuthenticated } from '../middlewares/passportJwt';

const router = Router();
router.use('/:listId/tasks', taskRouter);

router
  .route('/')
  .get(isAuthenticated, async (req: any, res: any, next: any) => {
    const userId = req.user._id;
    const lists = await ListService.getListsByUserId(userId);
    res.status(200).json(lists);
  })
  .post(isAuthenticated, async (req: any, res: any, next: any) => {
    const lists = await ListService.createList(req.body);
    res.status(201).json(lists);
  });

router
  .route('/:listId')
  .get(isAuthenticated, async (req: any, res: any, next: any) => {
    const list = await ListService.getListById(req.params.listId);
    res.status(200).json(list);
  })
  .put(isAuthenticated, async (req: any, res: any, next: any) => {
    const list = await ListService.updateListById(
      req.body,
      req.params.listId,
    );
    res.status(200).json(list);
  })
  .delete(isAuthenticated, async (req: any, res: any, next: any) => {
    const list = await ListService.deleteListById(req.params.listId);
    res.status(200).json(list);
  });

export default router;
