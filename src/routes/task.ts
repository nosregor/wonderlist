import { Router } from 'express';
import { BadRequestError } from '../middlewares/error-handler';
import { Task } from '../models/task';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const tasks = await Task.find().catch((error: any) =>
        next(new BadRequestError(error)),
      );

      return res.send(tasks);
    },
  )
  .post(async (req, res, next) => {
    const list = await Task.create({
      title: req.body.title,
    }).catch((error: any) => next(BadRequestError.from(error)));

    return res.send(list);
  });

router
  .route('/:taskId')
  .get(async (req, res, next) => {
    const task = await Task.findById(
      req.params.taskId,
    ).catch((error: any) => next(new BadRequestError(error)));

    return res.send(task);
  })
  .put(async (req, res, next) => {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        $set: req.body,
      },
      { new: true },
    ).catch((error: any) => next(new BadRequestError(error)));
  })
  .delete(async (req, res, next) => {
    const task = await Task.findById(
      req.params.taskId,
    ).catch((error: any) => next(new BadRequestError(error)));

    if (task) {
      await task.remove();
    }
    return res.send(task);
  });

export default router;
