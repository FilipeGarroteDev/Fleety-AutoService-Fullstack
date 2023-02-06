import waiterService from '@/services/waiter-service';
import { Users } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Document, WithId } from 'mongodb';

export async function verifyAndCreateNewWaiterCall(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const userData: Users = res.locals.userData;

  try {
    await waiterService.validateAndCallWaiter(userId, userData.name);
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
  const userId: string = req.params.userId;

  try {
    await waiterService.verifyAndDeleteWaiterCall(Number(userId));
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
    const activeUserCall: WithId<Document> = await waiterService.searchActiveUserCall(Number(userId));
    return res.status(httpStatus.OK).send(activeUserCall);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function listAllActiveWaiterCalls(req: Request, res: Response) {
  const userData: Users = res.locals.userData;

  try {
    const activeUserCall: WithId<Document>[] = await waiterService.searchAllWaiterCalls(userData.role);
    return res.status(httpStatus.OK).send(activeUserCall);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
