import { Router } from 'express';
import passport from 'passport';
import * as authService from '../services/auth';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

import * as userRepository from '../repositories/user';
import * as userService from '../services/user';
import { isAuthenticated } from '../middlewares/passportJwt';

const router: Router = Router();

router.get(
  '/',
  isAuthenticated,
  async (req: any, res: any, next: any) => {
    userService.getUsers(req, res, next);
  },
);

export default router;
