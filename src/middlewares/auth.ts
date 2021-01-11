import { NextFunction } from 'express';

export default function auth(req: any, res: any, next: NextFunction) {
  console.log(req.session);
  console.log(req.headers.authorization);

  if (!req.session.user) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      // @ts-ignore: Unreachable code error
      err.status = 401;
      next(err);
      return;
    }

    // @ts-ignore: Unreachable code error
    const auth = new Buffer.from(authHeader.split(' ')[1], 'base64')
      .toString()
      .split(':');
    const user = auth[0];
    const pass = auth[1];
    if (user === 'admin' && pass === 'password') {
      req.session.user = 'admin';
      next(); // authorized
    } else {
      const err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      // @ts-ignore: Unreachable code error
      err.status = 401;
      next(err);
    }
  } else if (req.session.user === 'admin') {
    console.log('req.session: ', req.session);
    next();
  } else {
    const err = new Error('You are not authenticated!');
    // @ts-ignore: Unreachable code error
    err.status = 401;
    next(err);
  }
}
