import { Router } from 'express';
import { BadRequestError } from '../middlewares/error-handler';
import { List } from '../models';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router
  .get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      console.log(req.headers);
      const lists = await List.find().catch((error: any) =>
        next(new BadRequestError(error)),
      );

      return res.send(lists);
    },
  )
  .post('/', async (req, res, next) => {
    const list = await List.create({
      title: req.body.title,
      description: req.body.description,
    }).catch((error) => next(BadRequestError.from(error)));

    return res.send(list);
  });

router
  .get('/:listId', async (req, res, next) => {
    const list = await List.findById(
      req.params.listId,
    ).catch((error: any) => next(new BadRequestError(error)));

    return res.send(list);
  })
  .put('/:listId', async (req, res, next) => {
    const list = await List.findByIdAndUpdate(
      req.params.listId,
      {
        $set: req.body,
      },
      { new: true },
    ).catch((error: any) => next(new BadRequestError(error)));
  })
  .delete('/:listId', async (req, res, next) => {
    const list = await List.findById(
      req.params.listId,
    ).catch((error: any) => next(new BadRequestError(error)));

    if (list) {
      await list.remove();
    }

    return res.send(list);
  });

export default router;
