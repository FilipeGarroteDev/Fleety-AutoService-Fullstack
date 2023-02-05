import { NewRatingEntity } from '@/protocols';
import ratingsService from '@/services/ratings-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Document, InsertOneResult, WithId } from 'mongodb';

export async function postNewUserAvaliation(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const newRating: Omit<NewRatingEntity, 'userId'> = req.body;

  try {
    const createdRating: InsertOneResult<Document> = await ratingsService.createNewRating(userId, newRating);
    return res.status(httpStatus.CREATED).send(createdRating);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function searchAllUserRatings(req: Request, res: Response) {
  const { role } = res.locals.userData as Record<string, string>;

  try {
    const ratings: WithId<Document>[] = await ratingsService.verifyRoleAndListRatings(role);
    return res.status(httpStatus.OK).send(ratings);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
