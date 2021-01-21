import express, {
  Application,
  NextFunction,
  Response,
  Request,
} from 'express';
import logger from 'morgan';
import cors from 'cors';

import { sendHttpErrorModule } from './error/sendHttpError';
import { HttpError } from './error';

/**
 * @export
 * @param { Application } app
 */
export function configure(app: Application): void {
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
  app.use((_req, res, next) => {
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
}

interface CustomResponse extends Response {
  sendHttpError: (error: HttpError | Error, message?: string) => void;
}

/**
 * @export
 * @param { express.Application } app
 */
export function initErrorHandler(app: Application): void {
  app.use(
    // @ts-ignore: Unreachable code error
    (
      error: Error,
      _req: Request,
      res: CustomResponse,
      next: NextFunction,
    ) => {
      if (typeof error === 'number') {
        error = new HttpError(error); // next(404)
      }

      if (error instanceof HttpError) {
        res.sendHttpError(error);
      } else {
        if (app.get('env') === 'development') {
          error = new HttpError(500, error.message);
          res.sendHttpError(error);
        } else {
          error = new HttpError(500);
          res.sendHttpError(error, error.message);
        }
      }

      console.error({ error });
    },
  );
}
