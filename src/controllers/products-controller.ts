import productsService from '@/services/products.service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export default async function listCategoryProducts(req: Request, res: Response) {
  const categoryId = Number(req.params.categoryId);

  try {
    const productsList = await productsService.searchProductsByCategoryId(categoryId);
    return res.status(httpStatus.OK).send(productsList);
  } catch (error) {
    if (error.name === 'UnprocessableEntityError') {
      return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
    } else if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }

  return res.status(httpStatus.OK);
}
