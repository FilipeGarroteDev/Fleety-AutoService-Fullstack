import express, { Request, Response, Express } from 'express';

import cors from 'cors';
import { loadEnvs } from '@/config';
import { connectDb, disconnectDb } from './config/database';
import { categoriesRouter } from './routers/categories-router';
import { productsRouter } from './routers/products-router';
import authRouter from './routers/auth-router';
import { ratingsRouter } from './routers/ratings-router';
import { ordersRouter } from './routers/orders-router';

loadEnvs();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', async (req: Request, res: Response) => res.send('OK'))
  .use('/auth', authRouter)
  .use('/categories', categoriesRouter)
  .use('/products', productsRouter)
  .use('/ratings', ratingsRouter)
  .use('/chart', ordersRouter);

export async function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;
