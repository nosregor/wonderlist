import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

import { User } from '../models';
import { BadRequestError } from '../middlewares/error-handler';

const router: Router = Router();

/* GET users listing. */
router.options('*', (req, res) => {
  res.sendStatus(200);
});

router.get('/', async (_req, res, next) => {
  const users = await User.find().catch((error: any) =>
    next(new BadRequestError(error)),
  );

  return res.send(users);
});

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
router.get('/logout', async (req, res, next) => {
  console.log('LOGOUT');
  req.logout();
  res.redirect('/');
});

export default router;
