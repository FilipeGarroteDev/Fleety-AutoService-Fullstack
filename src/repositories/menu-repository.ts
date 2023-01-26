import { prisma } from '@/config';
import { ProductCategories, ProductTypes } from '@prisma/client';

async function getProductTypeByName(productTypeName: string): Promise<ProductTypes> {
  return await prisma.productTypes.findFirst({
    where: {
      name: productTypeName,
    },
  });
}

async function getCategoriesByTypeId(typeId: number): Promise<ProductCategories[]> {
  return await prisma.productCategories.findMany({
    where: {
      typeId
    }
  });
}

const menuRepository = {
  getProductTypeByName,
  getCategoriesByTypeId,
};

export default menuRepository;
