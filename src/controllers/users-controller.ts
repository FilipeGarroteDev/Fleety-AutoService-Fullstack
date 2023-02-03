import { RegisterUserBody } from '@/protocols';
import usersService from '@/services/users-service';
import { Users } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function registerNewUser(req: Request, res: Response) {
  const { role } = res.locals.userData as Record<string, string>;
  const signUpData: RegisterUserBody = req.body;

  try {
    const user = await usersService.validateDataAndRegisterUser(signUpData, role);
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    if (error.name === 'ConflictError') {
      res.sendStatus(httpStatus.CONFLICT);
    } else if (error.name === 'ForbiddenError') {
      res.sendStatus(httpStatus.FORBIDDEN);
    } else if (error.name === 'UnauthorizedError') {
      res.sendStatus(httpStatus.UNAUTHORIZED);
    } else {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

export async function listAllActiveUsers(req: Request, res: Response) {
  const { role } = res.locals.userData as Record<string, string>;

  try {
    const users: Users[] = await usersService.validateAndSearchAllUsers(role);
    res.status(httpStatus.OK).send(users);
  } catch (error) {
    if (error.name === 'ConflictError') {
      res.sendStatus(httpStatus.CONFLICT);
    } else if (error.name === 'ForbiddenError') {
      res.sendStatus(httpStatus.FORBIDDEN);
    } else if (error.name === 'UnauthorizedError') {
      res.sendStatus(httpStatus.UNAUTHORIZED);
    } else {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}
