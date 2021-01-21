import { Router } from 'express';
import auth from './auth';
import user from './user';
import list from './list';
import docs from './docs';
import health from './health';

// guaranteed to get dependencies
export default () => {
  const app = Router();

  app.use('/auth', auth);
  app.use('/users', user);
  app.use('/lists', list);
  app.use('/docs', docs);
  app.use('/health', health);

  return app;
};
