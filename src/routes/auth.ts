import { Router, Request, Response } from 'express';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  res.send('OK');
});

export default router;
