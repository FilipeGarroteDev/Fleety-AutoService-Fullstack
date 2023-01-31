import { prismaPG } from '@/config';
import { ProductCategories, ProductTypes } from '@prisma/client';

async function getProductTypeByName(productTypeName: string): Promise<ProductTypes> {
  return await prismaPG.productTypes.findFirst({
    where: {
      name: productTypeName,
    },
  });
}

async function getCategoriesByTypeId(typeId: number): Promise<ProductCategories[]> {
  return await prismaPG.productCategories.findMany({
    where: {
      typeId,
    },
  });
}

const categoriesRepository = {
  getProductTypeByName,
  getCategoriesByTypeId,
};

export default categoriesRepository;
