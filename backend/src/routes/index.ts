import { Router } from 'express';
import authRouter from './auth';

const router = Router();

router.use('/auth', authRouter);

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
