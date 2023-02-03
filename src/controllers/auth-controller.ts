import { AdminCredentials, SignInBody, RegisterUserBody } from '@/protocols';
import authService from '@/services/auth-service';
import { Users } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function signIn(req: Request, res: Response) {
  const signInData: SignInBody = req.body;

  try {
    const clientAccountData = await authService.validateCredentialAndSignIn(signInData);
    res.status(httpStatus.OK).send(clientAccountData);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      res.status(httpStatus.UNAUTHORIZED).send(error.signInMessage);
    } else {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

export async function validateTokenAndGetUserData(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  try {
    const users: Users = await authService.getUserData(userId);
    return res.status(httpStatus.OK).send({ name: users.name, role: users.role });
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function adminSignIn(req: Request, res: Response) {
  const signInData: AdminCredentials = req.body;

  try {
    const adminData = await authService.handleAdminLogin(signInData);
    res.status(httpStatus.OK).send(adminData);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      res.sendStatus(httpStatus.UNAUTHORIZED);
    } else if (error.name === 'ForbiddenError') {
      res.sendStatus(httpStatus.FORBIDDEN);
    } else {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

export async function registerNewUser(req: Request, res: Response) {
  const { role } = res.locals.userData as Record<string, string>;
  const signUpData: RegisterUserBody = req.body;

  try {
    const user = await authService.validateDataAndRegisterUser(signUpData, role);
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
    const users: Users[] = await authService.validateAndSearchAllUsers(role);
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
