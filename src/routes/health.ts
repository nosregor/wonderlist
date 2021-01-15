import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.send({ message: 'Service is healthy', date: new Date() });
});

export default router;
