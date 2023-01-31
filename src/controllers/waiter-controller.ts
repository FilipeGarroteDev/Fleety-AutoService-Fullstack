import waiterService from '@/services/waiter-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Document, WithId } from 'mongodb';

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

export async function clearUserWaiterCall(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  try {
    await waiterService.verifyAndDeleteWaiterCall(userId);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

export async function verifyUserCallAndReturn(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  try {
    const activeUserCall: WithId<Document> = await waiterService.searchActiveUserCall(userId);
    return res.status(httpStatus.OK).send(activeUserCall);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
