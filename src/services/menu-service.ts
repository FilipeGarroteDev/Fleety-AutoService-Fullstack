import badRequestError from '@/errors/badRequestError';
import notFoundError from '@/errors/notFoundError';
import menuRepository from '@/repositories/menu-repository';
import { ProductCategories } from '@prisma/client';

async function listAllSectionsCategories(productType: string): Promise<ProductCategories[]> {
  const section = await menuRepository.getProductTypeByName(productType);

  if (!section) {
    throw badRequestError();
  }

  const categoriesList = await menuRepository.getCategoriesByTypeId(section.id);

  if (categoriesList.length === 0) {
    throw notFoundError();
  }

  return categoriesList;
}

const menuService = {
  listAllSectionsCategories,
};

export default menuService;
