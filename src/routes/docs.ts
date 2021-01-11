const router = require('express').Router();
import swaggerUi from 'swagger-ui-express';

import * as swaggerDocument from '../swagger.json';

router.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  }),
);

export default router;
