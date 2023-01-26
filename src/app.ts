import express, { Request, Response, Express } from 'express';

import cors from 'cors';
import { loadEnvs } from '@/config';
import { connectDb, disconnectDb } from './config/database';
import { menuRouter } from './routers/menu-router';

loadEnvs();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', async (req: Request, res: Response) => res.send('OK'))
  .use('/menu', menuRouter);

export async function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;
