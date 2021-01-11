import { Router } from 'express';
import { BadRequestError } from '../middlewares/error-handler';

import { User } from '../models';

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

router.post('/signup', async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user != null) {
    const err = new Error(`User ${req.body.email} already exists!`);
    next(err);
  }

  await User.create({ email, password });
  return res.send('Registration Successful!');
});

router.get('/:userId', async (req, res, next) => {
  const user = await User.findById(
    req.params.userId,
  ).catch((error: any) => next(new BadRequestError(error)));

  return res.send(user);
});

// user login
router.post('/login', (req, res) => {
  res.send('respond with a resource');
});

export default router;
