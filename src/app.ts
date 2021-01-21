import express, {
  Application,
  NextFunction,
  Response,
  Request,
} from 'express';
import logger from 'morgan';
import cors from 'cors';
import * as http from 'http-status-codes';

import config from './config/index';
import routes from './routes';
import { sendHttpErrorModule } from './middlewares/error/sendHttpError';
import { HttpError } from './middlewares/error';

const app = express();
// * Application-Level Middleware * //

// Third-Party Middleware
// The magic package that prevents frontend developers going nuts
// Alternate description:
// Enable Cross Origin Resource Sharing to all origins by default
app.use(cors());
app.use(logger('dev'));

// Middleware that transforms the raw string of req.body into json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// custom errors
app.use(sendHttpErrorModule);

// cors
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS ',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,' +
      ' Content-Type, Accept,' +
      ' Authorization,' +
      ' Access-Control-Allow-Credentials',
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// * Load Routes * //
app.use('/', routes());

/**
 * @description No results returned mean the object is not found
 * @constructs
 */
app.use((req, res, next) => {
  res.status(404).send(http.StatusCodes[404]); // NOT FOUND
});

interface CustomResponse extends express.Response {
  sendHttpError: (error: HttpError | Error, message?: string) => void;
}

app.use(
  // @ts-ignore: Unreachable code error
  (
    error: Error,
    req: Request,
    res: CustomResponse,
    next: NextFunction,
  ) => {
    if (typeof error === 'number') {
      error = new HttpError(error); // next(404)
    }
    console.error(error);

    // if (error === 500) {
    //   error = new HttpError(400, error.message);
    // }

    if (error instanceof HttpError) {
      res.sendHttpError(error);
    } else {
      if (app.get('env') === 'development') {
        console.error(error);
        error = new HttpError(500, error.message);
        res.sendHttpError(error);
      } else {
        error = new HttpError(500);
        res.sendHttpError(error, error.message);
      }
    }
  },
);

export { app };
