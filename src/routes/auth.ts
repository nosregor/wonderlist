import AuthService from '../services/auth';
import { IUser } from '../models/user';
import { NextFunction, Request, Response, Router } from 'express';
import { isAuthenticated } from '../middlewares/passportJwt';
import 'express-async-errors';

const router = Router();

// TODO: add async errors, to deal with unhandled errors
router.post(
  '/signup',
  async (req: any, res: Response, next: NextFunction) => {
    const body: IUser = req.body;
    const token = await AuthService.signup(body);

    res.status(201).json({
      status: 201,
      logged: true,
      token: token,
      message: 'Sign in successful',
    });
  },
);

router.post(
  '/login',
  async (req: any, res: Response, next: NextFunction) => {
    const body: IUser = req.body;
    console.log({ body });
    const token = await AuthService.login(body);
    console.log({ token });

    res.json({
      status: 200,
      logged: true,
      token: token,
      message: 'Sign in successful',
    });
  },
);

router.post(
  '/logout',
  isAuthenticated,
  (req: any, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.send({
        status: 401,
        logged: false,
        message: 'You are not logged in!',
      });
    }
    if (req.user) {
      delete req.headers.authorization;
      req.logout();
      res.send({
        status: 200,
        logged: false,
        message: 'Successfully logged out!',
      });
    }
  },
);

export default router;
