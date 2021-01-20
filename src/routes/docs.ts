import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import * as swaggerDocument from '../swagger.json';

const router = Router();

router.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  }),
);

export default router;
