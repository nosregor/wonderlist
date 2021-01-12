/* eslint-disable import/extensions */
import 'dotenv/config';
import express, { NextFunction } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
const FileStore = sessionFileStore(session);

import connectDB from './database';
import routes from './routes';
import auth from './middlewares/auth';
import { BadRequestError } from './middlewares/error-handler';

export interface IGetUserAuthInfoRequest extends Request {
  user: string; // or any other type
}

const app = express();

// Connect to MONGODB
connectDB();

// * Application-Level Middleware * //

// Third-Party Middleware
app.use(cors());
app.use(logger('dev'));
app.use(
  session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: true,
    store: new FileStore(),
  }),
);

// Built-In Middleware
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check
app.use('/health', routes.health);

app.use('/users', routes.user);

// Custome Middleware
app.use(auth);

// * Routes * //
app.use('/lists', routes.list);
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
