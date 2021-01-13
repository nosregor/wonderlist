import { Router } from 'express';
import { BadRequestError } from '../middlewares/error-handler';
import { Task } from '../models/task';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { List } from '../models/list';

const router = Router();

router
  .route('/')
  .get(async (req, res, next) => {
    console.log(req.query);
    const tasks = await Task.find({}).catch((error: any) =>
      next(new BadRequestError(error)),
    );

    return res.send(tasks);
  })
  .post(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const list = await Task.create({
        title: req.body.title,
        list: req.body.list,
        user: req.body.user,
      }).catch((error: any) => next(BadRequestError.from(error)));

      return res.send(list);
    },
  );

export default router;
