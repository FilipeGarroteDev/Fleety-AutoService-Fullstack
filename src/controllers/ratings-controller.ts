import { NewRatingEntity } from '@/protocols';
import ratingsService from '@/services/ratings-service';
import { Ratings } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function postNewUserAvaliation(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const newRating: Omit<NewRatingEntity, 'userId'> = req.body;

  try {
    const createdRating: Ratings = await ratingsService.createNewRating(userId, newRating);
    return res.status(httpStatus.CREATED).send(createdRating);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
