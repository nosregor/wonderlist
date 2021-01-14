import { Router } from 'express';
import passport from 'passport';

import { BadRequestError } from '../middlewares/error-handler';
import * as listRepository from '../repositories/list';
import taskRouter from './task';

const router = Router();
router.use('/:listId/tasks', taskRouter);

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      console.log(req.user);
      console.log('HELLO');
      const lists = await listRepository
        // @ts-ignore: Unreachable code error
        .getListsByUserId(req.user._id)
        .catch((error: any) => next(new BadRequestError(error)));
      console.log(lists);
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

export default router;

// https://www.codegrepper.com/code-examples/javascript/mongoose+update+data+subdocument
