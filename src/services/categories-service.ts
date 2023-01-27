import badRequestError from '@/errors/badRequestError';
import notFoundError from '@/errors/notFoundError';
import categoriesRepository from '@/repositories/categories-repository';
import { ProductCategories } from '@prisma/client';

async function listAllSectionsCategories(productType: string): Promise<ProductCategories[]> {
  const section = await categoriesRepository.getProductTypeByName(productType);

  if (!section) {
    throw badRequestError();
  }

  const categoriesList = await categoriesRepository.getCategoriesByTypeId(section.id);

  if (categoriesList.length === 0) {
    throw notFoundError();
  }

  return categoriesList;
}

const categoriesService = {
  listAllSectionsCategories,
};

export default categoriesService;
