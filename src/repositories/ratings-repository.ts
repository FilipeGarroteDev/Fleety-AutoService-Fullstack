import { prismaPG } from '@/config';
import { NewRatingEntity } from '@/protocols';
import { Ratings } from '@prisma/client';

async function postRating(rating: NewRatingEntity): Promise<Ratings> {
  return prismaPG.ratings.create({
    data: rating,
  });
}

const ratingsRepository = { postRating };

export default ratingsRepository;
