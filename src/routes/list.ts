import { Router } from 'express';
import passport from 'passport';

import { BadRequestError } from '../middlewares/error-handler';
import * as listRepository from '../repositories/list';
import * as taskRepository from '../repositories/task';
taskRepository;
const router = Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      console.log('HELLO');
      const lists = await listRepository
        // @ts-ignore: Unreachable code error
        .getListsByUserId(req.user._id)
        .catch((error: any) => next(new BadRequestError(error)));

      return res.send(lists);
    },
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const list = await listRepository
        .createList(req.body)
        .catch((error) => next(BadRequestError.from(error)));

      return res.send(list);
    },
  );

router
  .route('/:listId')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      console.log(req.params.listId);
      const list = await listRepository
        .getListById(req.params.listId)
        .catch((error: any) => next(new BadRequestError(error)));

      return res.json(list);
    },
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    async (req: any, res, next) => {
      req.body.user = req.user._id;

      let list = await listRepository.getListById(req.params.listId);

      if (list != null) {
        const listWithTasks = await taskRepository.createTask(
          list,
          req.body,
        );

        res.send(listWithTasks);
      }
    },
  )
  // EDIT LIST title
  .put(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const list = await listRepository
        .updateListById({ body: req.body, listId: req.params.listId })
        .catch((error: any) => next(new BadRequestError(error)));

      return res.send(list);
    },
  )
  // DELETE LIST and tasks
  .delete(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const list = await listRepository
        .deleteListById(req.params.listId)
        .catch((error: any) => next(new BadRequestError(error)));

      return res.send(list);
    },
  );

router
  .route('/:listId/tasks/:taskId')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const task = await taskRepository
        .getTaskFromList(req.params.listId, req.params.taskId)
        .catch((error: any) => next(new BadRequestError(error)));

      return res.send(task);
    },
  )
  // EDIT TASK from LIST and UPDATE
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
  // DELETE TASK from LIST and UPDATE
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

// https://www.codegrepper.com/code-examples/javascript/mongoose+update+data+subdocument
