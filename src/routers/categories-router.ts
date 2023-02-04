import { getCategories } from '@/controllers/categories-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import express from 'express';

const categoriesRouter = express.Router();

categoriesRouter.get('/:productType', authTokenMiddleware, getCategories);

export { categoriesRouter };
