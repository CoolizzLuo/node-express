import { Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json';
import authRouter from './auth';

const HEADERS = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
  'Content-Type': 'application/json',
};

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/', (req: Request, res: Response) => {
  // #swagger.tags = ['Home']
  res.writeHead(200, HEADERS);
  res.write(
    JSON.stringify({
      status: 'success',
      message: 'Welcome to the API',
    })
  );
  res.end();
});

router.use('/auth', authRouter);

export default router;
