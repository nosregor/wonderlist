/* eslint-disable import/extensions */
import 'dotenv/config';
import express, { NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';

import connectDB from './database';
import routes from './routes';
// @ts-ignore: Unreachable code error
require('./middlewares/passport-handler');

import { BadRequestError } from './middlewares/error-handler';

const app = express();

// Connect to MONGODB
connectDB();

// * Application-Level Middleware * //

// Third-Party Middleware
app.use(cors());
app.use(logger('dev'));

// Built-In Middleware
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * Routes * //
app.use('/health', routes.health);
app.use('/users', routes.user);
app.use('/lists', routes.list);
app.use('/tasks', routes.task);
app.use('/docs', routes.docs);

app.get('*', function (req, res, next) {
  const error = new BadRequestError(
    `${req.ip} tried to access ${req.originalUrl}`,
  );

  error.statusCode = 301;

  next(error);
});

// * Application-Level Middleware * //

app.use((error: any, req: any, res: any, next: NextFunction) => {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).redirect('/not-found');
  }

  return res
    .status(error.statusCode)
    .json({ error: error.toString() });
});

const port = app.get('port');
app.listen(port, () =>
  console.log(`Server listening on port ${port}!`),
);

export { app };
