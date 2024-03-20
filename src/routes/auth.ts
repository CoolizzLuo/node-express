import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../services/userService';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  res.send('OK');
});

router.post('/signup', async (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  const { email, password } = req.body;
  const isSignup = await userService.signup(email, password);

  if (!isSignup) {
    return res.status(401).send('User already exists');
  }

  res.send('User created');
});

router.post('/signin', async (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  const { email, password } = req.body;
  try {
    const token = await userService.signin(email, password);
    res.send({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).send({ message: error.message });
    }
  }
});

router.get('/me', (req: Request, res: Response) => {
  // #swagger.tags = ['Auth']
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Token not found');
  }

  res.send({ token });
});

export default router;
