import { findSpecificProductData, listCategoryProducts } from '@/controllers/products-controller';
import express from 'express';

const productsRouter = express.Router();

productsRouter.get('/category/:categoryId', listCategoryProducts).get('/:productId', findSpecificProductData);

export { productsRouter };
