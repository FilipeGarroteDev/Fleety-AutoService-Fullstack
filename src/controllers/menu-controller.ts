import menuService from '@/services/menu-service';
import { ProductCategories } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getCategories(req: Request, res: Response) {
  const { productType } = req.params as Record<string, string>;
  try {
    const categoriesList: ProductCategories[] = await menuService.listAllSectionsCategories(productType);
    return res.status(httpStatus.OK).send(categoriesList);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === 'BadRequestError') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}
