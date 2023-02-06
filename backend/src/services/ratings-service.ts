import unauthorizedError from '@/errors/unauthorizedError';
import { NewRatingEntity } from '@/protocols';
import ratingsRepository from '@/repositories/ratings-repository';
import { Document, InsertOneResult, WithId } from 'mongodb';

async function createNewRating(userId: number, newRating: Omit<NewRatingEntity, 'userId'>): Promise<InsertOneResult<Document>> {
  const ratingWithUserId = {
    ...newRating,
    environmentRate: newRating.environmentRate ? newRating.environmentRate : 1,
    foodRate: newRating.foodRate ? newRating.foodRate : 1,
    beverageRate: newRating.beverageRate ? newRating.beverageRate : 1,
    pricesRate: newRating.pricesRate ? newRating.pricesRate : 1,
    serviceRate: newRating.serviceRate ? newRating.serviceRate : 1,
    createdAt: new Date,
    userId,
  };
  const rating = await ratingsRepository.postRating(ratingWithUserId);

  return rating;
}

async function verifyRoleAndListRatings(role: string): Promise<WithId<Document>[]> {
  if (role !== 'ADMIN') throw unauthorizedError();

  const orders: WithId<Document>[] = await ratingsRepository.getAllRatings();
  return orders;
}

const ratingsService = {
  createNewRating,
  verifyRoleAndListRatings,
};

export default ratingsService;
