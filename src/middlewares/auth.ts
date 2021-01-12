import { NextFunction } from 'express';

export default function auth(req: any, res: any, next: NextFunction) {
  console.log(req.session);

  if (!req.session.user) {
    var err = new Error('You are not authenticated!');
    // @ts-ignore: Unreachable code error
    err.status = 403;
    return next(err);
  }

  if (req.session.user === 'authenticated') {
    next();
  } else {
    var err = new Error('You are not authenticated!');
    // @ts-ignore: Unreachable code error
    err.status = 403;
    return next(err);
  }
}
