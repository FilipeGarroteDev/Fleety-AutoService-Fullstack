import express, { Request, Response, Express } from 'express';

import cors from 'cors';
import { loadEnvs } from '@/config';
import { connectDb, connectMongoDB, disconnectDb, disconnectMongoDB } from './config/database';
import { categoriesRouter } from './routers/categories-router';
import { productsRouter } from './routers/products-router';
import authRouter from './routers/auth-router';
import { ratingsRouter } from './routers/ratings-router';
import { ordersRouter } from './routers/orders-router';
import { checkoutRouter } from './routers/checkout-router';
import { waiterRouter } from './routers/waiter-router';
import usersRouter from './routers/users-router';

loadEnvs();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/api/health', async (req: Request, res: Response) => res.send('OK'))
  .use('/api/auth', authRouter)
  .use('/api/users', usersRouter)
  .use('/api/categories', categoriesRouter)
  .use('/api/products', productsRouter)
  .use('/api/ratings', ratingsRouter)
  .use('/api/chart', ordersRouter)
  .use('/api/checkout', checkoutRouter)
  .use('/api/waiter', waiterRouter);

export async function init(): Promise<Express> {
  connectDb();
  connectMongoDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
  await disconnectMongoDB();
}

export default app;
