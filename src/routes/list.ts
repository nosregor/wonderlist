import { Router } from 'express';
import passport from 'passport';

import * as listService from '../services/list';
import taskRouter from './task';
import { isAuthenticated } from '../middlewares/passportJwt';

const router = Router();
router.use('/:listId/tasks', taskRouter);

// TODO: remove async
router
  .route('/')
  .get(isAuthenticated, async (req, res, next) => {
    listService.getListsByUserId(req, res, next);
  })
  .post(isAuthenticated, async (req, res, next) => {
    listService.createList(req, res, next);
  });

router
  .route('/:listId')
  .get(isAuthenticated, async (req, res, next) => {
    listService.getListById(req, res, next);
  })
  .put(isAuthenticated, async (req, res, next) => {
    listService.updateListById(req, res, next);
  })
  .delete(isAuthenticated, async (req, res, next) => {
    listService.deleteListById(req, res, next);
  });

export default router;
