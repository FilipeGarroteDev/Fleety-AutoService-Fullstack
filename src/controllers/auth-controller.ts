import { SignUpBody } from '@/protocols';
import authService from '@/services/auth-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function signUp(req: Request, res: Response) {
  const signUpData: SignUpBody = req.body;

  try {
    const user = await authService.searchUserAndSignUp(signUpData);
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    if (error.name === 'ConflictError') {
      res.sendStatus(httpStatus.CONFLICT);
    } else {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}
