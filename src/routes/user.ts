import { Router } from 'express';
import passport from 'passport';
import * as authService from '../services/auth';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

import UserService from '../services/user';
import { isAuthenticated } from '../middlewares/passportJwt';

const router: Router = Router();

router.get(
  '/',
  isAuthenticated,
  async (req: any, res: any, next: any) => {
    const users = await UserService.getUsers();

    res.status(200).json(users);
  },
);

export default router;
