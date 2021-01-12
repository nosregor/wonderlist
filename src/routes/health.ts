import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send({ message: 'Service is healthy', date: new Date() });
});

router.get('/logout', async (req: any, res, next) => {
  res.send('hello');
  // if (req.session) {
  //   req.session.destroy();
  //   // destroy session on server side
  //   res.clearCookie('session-id');
  //   res.redirect('/');
  // }
  // const err = new Error('You are not logged in!');
  // // @ts-ignore: Unreachable code error
  // err.status = 403;
  // next(err);
});

export default router;
