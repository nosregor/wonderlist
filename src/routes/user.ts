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
  console.log('DEBUG Body', req.body);

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user != null) {
    const err = new Error(`User ${req.body.email} already exists!`);
    next(err);
  }

  const newUser = await User.create({
    email,
    password,
  }).catch((error: any) => next(new BadRequestError(error)));

  return res.send({
    status: 'Registration Successful!',
    user: newUser,
  });
});

router.get('/:userId', async (req, res, next) => {
  const user = await User.findById(
    req.params.userId,
  ).catch((error: any) => next(new BadRequestError(error)));

  return res.send(user);
});

// user login
router.post('/login', async (req, res, next) => {
  console.log('DEBUG Session:', req.session);
  console.log('DEBUG Headers:', req.headers.authorization);

  // @ts-ignore: Unreachable code error
  if (req.session.user) {
    res.statusCode = 200;
    res.end('You are already authenticated!');
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    // @ts-ignore: Unreachable code error
    err.status = 401;
    return next(err);
  }

  // @ts-ignore: Unreachable code error
  const auth = new Buffer.from(authHeader.split(' ')[1], 'base64')
    .toString()
    .split(':');
  const email = auth[0];
  const password = auth[1];

  const user = await User.findOne({ email });

  // we couldnt find user return Error
  if (user === null) {
    const err = new Error(`User ${email} does not exist!`);
    // @ts-ignore: Unreachable code error
    err.status = 403;
    return next(err);
  }

  // user exists but password is wrong
  if (user.password !== password) {
    const err = new Error('Your password is incorrect!');
    // @ts-ignore: Unreachable code error
    err.status = 403;
    return next(err);
  }

  // user and password correctly identified
  if (user.email === email && user.password === password) {
    // @ts-ignore: Unreachable code error
    req.session.user = 'authenticated';
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are authenticated!');
  }
});

// user logout
router.get('/logout', async (req: any, res, next) => {
  if (req.session) {
    req.session.destroy();
    // destroy session on server side
    res.clearCookie('session-id');
    res.redirect('/');
  }
  const err = new Error('You are not logged in!');
  // @ts-ignore: Unreachable code error
  err.status = 403;
  next(err);
});

export default router;
