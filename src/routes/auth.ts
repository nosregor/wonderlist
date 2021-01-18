import * as authService from '../services/auth';
import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'prettier';

const router = Router();

router.post(
  '/signup',
  async (req: any, res: Response, next: NextFunction) => {
    authService.signup(req, res, next);
  },
);

router.post(
  '/login',
  async (req: any, res: Response, next: NextFunction) => {
    authService.login(req, res, next);
  },
);

export default router;
