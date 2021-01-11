/* eslint-disable import/extensions */
import 'dotenv/config';
import express, { NextFunction } from 'express';
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Express routes
app.get('*', function (req, res, next) {
  res.status(301).redirect('/not-found');
});
app.get('/', (_req, res) => res.send('API Running'));
app.use('/users', routes.user);
app.use('/lists', routes.list);

const port = app.get('port');
app.listen(port, () =>
  console.log(`Server listening on port ${port}!`),
);

export { app };
