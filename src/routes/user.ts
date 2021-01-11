import { Router, Request, Response, NextFunction } from 'express';

import { User } from '../models';

const router: Router = Router();

/* GET users listing. */
router.options('*', (req, res) => {
  res.sendStatus(200);
});

router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find({});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  return res.send(users);
});

// user registration
router.post(
  '/signup',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.params;

    const user = await User.findOne({ email });

    if (user != null) {
      const err = new Error(`User ${req.body.email} already exists!`);
      next(err);
    }

    const newUser = await User.create({ email, password });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.send({ status: 'Registration Successful!', newUser });
  },
);

// user login
router.post('/login', (req, res) => {
  res.send('respond with a resource');
});

export default router;
