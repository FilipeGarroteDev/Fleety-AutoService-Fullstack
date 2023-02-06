import { findSpecificProductData, listCategoryProducts } from '@/controllers/products-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import express from 'express';

const productsRouter = express.Router();

productsRouter
  .all('/*', authTokenMiddleware)
  .get('/category/:categoryId', listCategoryProducts)
  .get('/:productId', findSpecificProductData);

export { productsRouter };
