import {
  verifyAndCreateNewWaiterCall,
} from '@/controllers/waiter-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import express from 'express';

const waiterRouter = express.Router();

waiterRouter
  .all('/*', authTokenMiddleware)
  .post('/', verifyAndCreateNewWaiterCall);

export { waiterRouter };
