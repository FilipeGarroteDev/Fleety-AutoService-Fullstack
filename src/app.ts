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
  .use('/chart', ordersRouter)
  .use('/checkout', checkoutRouter)
  .use('/waiter', waiterRouter);

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
