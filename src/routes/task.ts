import { Router } from 'express';
import passport from 'passport';

import { BadRequestError } from '../middlewares/error-handler';
import * as listRepository from '../repositories/list';
import * as taskRepository from '../repositories/task';

const router = Router({ mergeParams: true });

router
  .route('/')
  .post(
    passport.authenticate('jwt', { session: false }),
    async (req: any, res, next) => {
      req.body.user = req.user._id;

      let list = await listRepository
        .getListById(req.params.listId)
        .catch((error: any) => next(new BadRequestError(error)));

      if (list != null) {
        const listWithTasks = await taskRepository
          .createTask(list, req.body)
          .catch((error: any) => next(new BadRequestError(error)));

        return res.send(listWithTasks);
      }
    },
  );

router
  .route('/:taskId')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      console.log(req.params);
      const task = await taskRepository
        .getTaskFromList(req.params.listId, req.params.taskId)
        .catch((error: any) => next(new BadRequestError(error)));

      return res.send(task);
    },
  )
  .put(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const list = await taskRepository
        .updateTaskFromList(
          req.params.listId,
          req.params.taskId,
          req.body,
        )
        .catch((error: any) => next(new BadRequestError(error)));

      return res.send(list);
    },
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const list = await taskRepository
        // @ts-ignore: Unreachable code error
        .deleteTaskFromList(req.params.taskId, req.user)
        .catch((error: any) => next(new BadRequestError(error)));

      return res.send(list);
    },
  );

export default router;
