import { postNewUserAvaliation } from '@/controllers/ratings-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import validateSchema from '@/middlewares/schemas-middleware';
import { RatingsSchema } from '@/schemas/ratings-schema';
import express from 'express';

const ratingsRouter = express.Router();

ratingsRouter.all('/*', authTokenMiddleware).all('/*', validateSchema(RatingsSchema)).post('/', postNewUserAvaliation);

export { ratingsRouter };
