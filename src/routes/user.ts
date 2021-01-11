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
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user != null) {
      const err = new Error(`User ${req.body.email} already exists!`);
      next(err);
    }

    const newUser = await User.create({ email, password });
    return res.send('Registration Successful!');
  },
);

// user login
router.post('/login', (req, res) => {
  res.send('respond with a resource');
});

export default router;
