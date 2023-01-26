import { getCategories } from '@/controllers/menu-controller';
import express from 'express';

const menuRouter = express.Router();

menuRouter.get('/:productType', getCategories);

export { menuRouter };
