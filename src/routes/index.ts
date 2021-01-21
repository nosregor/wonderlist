import { Application, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as http from 'http-status-codes';

import * as swaggerDocument from '../swagger.json';
import auth from './auth';
import user from './user';
import list from './list';
import health from './health';

/**
 *
 * @param app
 * @returns
 */
export function init(app: Application): void {
  const router: Router = Router();

  /**
   * @description Forwards any requests to the /:router URI
   * to our Router (auth, user. list, health)
   */
  app.use('/auth', auth);
  app.use('/users', user);
  app.use('/lists', list);
  app.use('/health', health);

  /**
   * If swagger.json file exists in root folder, shows swagger api
   * description else sends commands how to get swaggr.json file
   * @constructs
   */
  if (swaggerDocument) {
    app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, {
        explorer: true,
      }),
    );
  } else {
    app.get('/docs', (req, res) => {
      res.send(
        "<p>Seems like you don't have <code>swagger.json<code> file.</p>" +
          '<p>To generate doc file user: <code>swaggerDef.js -o swagger.json<code> in terminal</p>' +
          '<p>Then, restart your application/p>',
      );
    });
  }

  /**
   * @description No results returned means the object is not found
   * @constructs
   */
  app.use((_req: any, res: any, next: any) => {
    res.status(404).send(http.StatusCodes[404]);
  });

  /**
   * @contructs all routes
   */
  app.use(router);
}
