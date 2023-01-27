import { getCategories } from '@/controllers/categories-controller';
import express from 'express';

const categoriesRouter = express.Router();

categoriesRouter.get('/:productType', getCategories);

export { categoriesRouter };
