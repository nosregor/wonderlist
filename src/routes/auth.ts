import * as authService from '../services/auth';
import { NextFunction, Request, Response, Router } from 'express';
import { isAuthenticated } from '../middlewares/passportJwt';

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
    console.log(req.body);
    authService.login(req, res, next);
  },
);

router.post(
  '/logout',
  isAuthenticated,
  async (req: any, res: Response, next: NextFunction) => {
    authService.logout(req, res, next);
  },
);

export default router;
