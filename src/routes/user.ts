import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

import * as userRepository from '../repositories/user';
import { BadRequestError } from '../middlewares/error-handler';

const router: Router = Router();

router.options('*', (req, res) => {
  res.sendStatus(200);
});

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const users = await userRepository
      .getUsers()
      .catch((error: any) => next(BadRequestError.from(error)));

    return res.send(users);
  },
);

// SIGNUP
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  },
);

// LOGIN
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        console.log(user, 'USER');
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, 'TOP_SECRET', {
          expiresIn: 3600, // 1 hour
        });
        console.log(token, 'JWT');

        return res.json({
          success: true,
          token,
          status: 'You are successfully logged in!',
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// user logout
router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next): Promise<void> => {
    if (!req.user) {
      res.send({
        status: 401,
        logged: false,
        message: 'You are not logged in!',
      });
    }
    if (req.user) {
      delete req.headers.authorization; // destroy session on server side
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
