/* eslint-disable import/extensions */
import 'dotenv/config';
import express, { NextFunction } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './database';
import routes from './routes';
import auth from './middlewares/auth';

export interface IGetUserAuthInfoRequest extends Request {
  user: string; // or any other type
}

const app = express();

// Connect to MONGODB
connectDB();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser('12345-67890-09876-54321'));

// @ts-ignore: Unreachable code error
app.use(auth);

// Express routes
app.get('/', (_req, res) => {
  res.send({ message: 'Service is healthy', date: new Date() });
});
app.use('/lists', routes.list);
app.use('/users', routes.user);

app.use('/docs', routes.docs);

app.get('*', function (req, res, next) {
  res.status(301).redirect('/not-found');
});

const port = app.get('port');
app.listen(port, () =>
  console.log(`Server listening on port ${port}!`),
);

export { app };
