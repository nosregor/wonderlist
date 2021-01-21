import express, { Application } from 'express';
import * as Middleware from './middlewares/express';
import * as Routes from './routes/index';

/**
 * @constructs { express.Application }
 */
const app: Application = express();

/**
 * @constructs express.Application Middleware
 */
Middleware.configure(app);

/**
 * @constructs express.Application Routes
 */
Routes.init(app);

/**
 * @constructs express.Application Error Handler
 */
Middleware.initErrorHandler(app);

/**
 * sets port 3000 to default or unless otherwise sepcified in the .env
 */
app.set('port', process.env.PORT || 3000);

/**
 * @exports { express.Application }
 */
export default app;
