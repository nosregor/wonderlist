import { NextFunction, Router } from 'express';
import * as taskService from '../services/task';
import { isAuthenticated } from '../middlewares/passportJwt';

const router = Router({ mergeParams: true });

router
  .route('/')
  .post(isAuthenticated, async (req: any, res, next) => {
    taskService.createTask(req, res, next);
  });

router
  .route('/:taskId')
  .get(isAuthenticated, async (req, res, next) => {
    taskService.getTaskById(req, res, next);
  })
  .put(
    isAuthenticated,
    async (req: any, res: any, next: NextFunction) => {
      taskService.updateTaskById(req, res, next);
    },
  )
  .delete(isAuthenticated, async (req, res, next) => {
    taskService.deleteTaskById(req, res, next);
  });

export default router;
