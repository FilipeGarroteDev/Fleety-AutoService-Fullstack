import { mongoDB } from '@/config';
import { NewRatingEntity } from '@/protocols';
import { Document, InsertOneResult, WithId } from 'mongodb';

async function postRating(rating: NewRatingEntity): Promise<InsertOneResult<Document>> {
  return mongoDB.collection('ratings').insertOne(rating);
}

async function getAllRatings(): Promise<WithId<Document>[]> {
  return mongoDB.collection('ratings').find({}).toArray();
}

const ratingsRepository = { postRating, getAllRatings };

export default ratingsRepository;
