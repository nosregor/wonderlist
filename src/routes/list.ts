import { Router } from 'express';
import { BadRequestError } from '../middlewares/error-handler';
import { IList, List } from '../models/list';
import passport from 'passport';
import { ITask, Task } from '../models/task';

const router = Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const user = req.user;
      const lists = await List.find({
        user: user,
      })
        .populate('user')
        .catch((error: any) => next(new BadRequestError(error)));

      return res.send(lists);
    },
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const list = await List.create({
        title: req.body.title,
        user: req.user,
      }).catch((error) => next(BadRequestError.from(error)));

      return res.send(list);
    },
  );

router
  .route('/:listId')
  // GET LIST and populate TASKS
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const list = await List.findById(req.params.listId)
        .populate('tasks')
        .catch((error: any) => next(new BadRequestError(error)));

      return res.json(list);
    },
  )
  // CREATE TASK and add to respective LIST
  .post(
    passport.authenticate('jwt', { session: false }),
    async (req: any, res, next) => {
      req.body.user = req.user._id;

      let list: IList = await List.findById(req.params.listId);

      if (list != null) {
        const task = await Task.create({
          title: req.body.title,
          list: req.body.list,
          user: req.body.user,
        });

        await list.tasks.push(task);
        const savedList = await list.save();
        const returnList = await List.findById(
          savedList._id,
        ).populate('tasks');

        res.send(returnList);
      }
    },
  )
  // EDIT LIST title
  .put(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const filter = { _id: req.params.listId };
      const update = {
        $set: req.body,
      };
      const options = { new: true };

      const list = await List.findByIdAndUpdate(
        filter,
        update,
        options,
      ).catch((error: any) => next(new BadRequestError(error)));

      return res.send(list);
    },
  )
  // DELETE LIST and tasks
  .delete(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const list = await List.findById(
        req.params.listId,
      ).catch((error: any) => next(new BadRequestError(error)));

      if (list) {
        await list.remove();
      }

      return res.send(list);
    },
  );

router
  .route('/:listId/tasks/:taskId')
  // GET TASK from LIST
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const list = await List.findById({
        _id: req.params.listId,
      })
        .populate('tasks')
        .catch((error: any) => next(new BadRequestError(error)));

      const task = list.tasks.filter(
        (task: ITask) => String(task._id) === req.params.taskId,
      );

      if (task === null) {
        let err: any = new Error(
          `Task ${req.params.taskId} not found`,
        );
        err.status = 404;
        return next(err);
      }
      return res.send(task);
    },
  )
  // EDIT TASK from LIST and UPDATE
  .put(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const task = await Task.findByIdAndUpdate(
        req.params.taskId,
        {
          $set: req.body,
        },
        { new: true },
      );
      const list = await List.findById({
        _id: req.params.listId,
        'tasks._id': req.params.taskId,
      })
        .populate('tasks')
        .catch((error: any) => next(new BadRequestError(error)));
      console.log(task);
      return res.send(list);
    },
  )
  // DELETE TASK from LIST and UPDATE
  .delete(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { listId, taskId } = req.params;
      const user = req.user;

      const filter = { user: user };
      const update = { $pull: { tasks: taskId } };
      const options = { new: true };

      const list = await List.findOneAndUpdate(
        filter,
        // @ts-ignore: Unreachable code error
        update,
        options,
      )
        .populate('user')
        .catch((error: any) => next(new BadRequestError(error)));

      return res.send(list);
    },
  );

export default router;

// https://www.codegrepper.com/code-examples/javascript/mongoose+update+data+subdocument
