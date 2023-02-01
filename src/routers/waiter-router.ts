import {
  verifyAndCreateNewWaiterCall,
  clearUserWaiterCall,
  verifyUserCallAndReturn,
  listAllActiveWaiterCalls,
} from '@/controllers/waiter-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import express from 'express';

const waiterRouter = express.Router();

waiterRouter
  .all('/*', authTokenMiddleware)
  .post('/', verifyAndCreateNewWaiterCall)
  .delete('/', clearUserWaiterCall)
  .get('/mycall', verifyUserCallAndReturn)
  .get('/calls', listAllActiveWaiterCalls);

export { waiterRouter };
