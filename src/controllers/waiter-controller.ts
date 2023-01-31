import waiterService from '@/services/waiter-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function verifyAndCreateNewWaiterCall(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  try {
    await waiterService.validateAndCallWaiter(userId);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error.name === 'ConflictError') {
      return res.sendStatus(httpStatus.CONFLICT);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}
