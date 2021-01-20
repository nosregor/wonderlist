import { NextFunction, Router } from 'express';
import TaskService from '../services/task';
import { isAuthenticated } from '../middlewares/passportJwt';

const router = Router({ mergeParams: true });

router
  .route('/')
  .post(isAuthenticated, async (req: any, res, next) => {
    const list = await TaskService.createTask(
      req.params.listId,
      req.body,
    );

    res.status(200).json(list);
  });

router
  .route('/:taskId')
  .get(isAuthenticated, async (req, res, next) => {
    const task = await TaskService.getTaskById(
      req.params.listId,
      req.params.taskId,
    );
    return res.status(200).json(task);
  })
  .put(
    isAuthenticated,
    async (req: any, res: any, next: NextFunction) => {
      const list = await TaskService.updateTaskById(
        req.params.listId,
        req.params.taskId,
        req.body,
      );
      return res.status(200).json(list);
    },
  )
  .delete(isAuthenticated, async (req: any, res: any, next: any) => {
    const list = await TaskService.deleteTaskById(
      req.params.taskId,
      req.user._id,
    );

    res.status(200).json(list);
  });

export default router;
