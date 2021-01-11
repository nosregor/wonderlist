/* eslint-disable import/extensions */
import 'dotenv/config';
import express, { NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';

import connectDB from './database';
import routes from './routes';

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
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
