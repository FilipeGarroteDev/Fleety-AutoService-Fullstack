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

const ratingsService = {
  createNewRating,
};

export default ratingsService;
