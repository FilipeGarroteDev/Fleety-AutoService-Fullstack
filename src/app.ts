import express, { Request, Response, Express } from 'express';

import cors from 'cors';
import { loadEnvs } from '@/config';
import { connectDb, disconnectDb } from './config/database';

loadEnvs();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (req: Request, res: Response) => res.send('tudo certo, nego!'));

export async function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;
