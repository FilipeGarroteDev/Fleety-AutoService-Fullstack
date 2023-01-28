import { prisma } from '@/config';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';

export async function authTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization = req.header('Authorization');
  
  if (!authorization)
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send('Seu login expirou ou suas credenciais são inválidas. Por gentileza, refaça o login');

  const token = authorization.split(' ')[1];
  
  if (!token)
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send('Seu login expirou ou suas credenciais são inválidas. Por gentileza, refaça o login');

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

    const session = await prisma.sessions.findFirst({
      where: {
        token,
      },
    });

    if (!session)
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send('Seu login expirou ou suas credenciais são inválidas. Por gentileza, refaça o login');

    res.locals.userId = userId;
    return next();
  } catch (error) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send('Seu login expirou ou suas credenciais são inválidas. Por gentileza, refaça o login');
  }
}
