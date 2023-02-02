import unauthorizedError from '@/errors/unauthorizedError';
import { NewRatingEntity } from '@/protocols';
import ratingsRepository from '@/repositories/ratings-repository';
import { Ratings } from '@prisma/client';

async function createNewRating(userId: number, newRating: Omit<NewRatingEntity, 'userId'>): Promise<Ratings> {
  const ratingWithUserId = {
    ...newRating,
    userId,
  };
  const rating = await ratingsRepository.postRating(ratingWithUserId);

  return rating;
}

async function verifyRoleAndListRatings(role: string): Promise<Ratings[]> {
  if (role !== 'ADMIN') throw unauthorizedError();

  const orders: Ratings[] = await ratingsRepository.getAllRatings();
  return orders;
}

const ratingsService = {
  createNewRating,
  verifyRoleAndListRatings,
};

export default ratingsService;
