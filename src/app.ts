import express, { Request, Response, Express } from 'express';

import cors from 'cors';
import { loadEnvs } from '@/config';
import { connectDb, disconnectDb, prisma } from './config/database';
import httpStatus from 'http-status';

loadEnvs();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', async (req: Request, res: Response) => res.send('OK'))
  .get('/menu/:productTypeName', async (req: Request, res: Response) => {
    const { productTypeName } = req.params as Record<string, string>;
    const productType = await prisma.productTypes.findFirst({
      where: {
        name: productTypeName,
      },
    });

    if (!productType) return res.sendStatus(httpStatus.NOT_FOUND);
  });

export async function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;
