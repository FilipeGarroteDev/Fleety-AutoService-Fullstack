import { verifyAndCreateNewWaiterCall, clearUserWaiterCall } from '@/controllers/waiter-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import express from 'express';

const waiterRouter = express.Router();

waiterRouter.all('/*', authTokenMiddleware).post('/', verifyAndCreateNewWaiterCall).delete('/', clearUserWaiterCall);

export { waiterRouter };
