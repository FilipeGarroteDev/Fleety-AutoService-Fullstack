import UnprocessableEntityError from '@/errors/badRequestError copy';
import notFoundError from '@/errors/notFoundError';
import productsRepository from '@/repositories/products-repository';

async function searchProductsByCategoryId(categoryId: number) {
  if (!categoryId) throw UnprocessableEntityError();

  const products = await productsRepository.getProductsByCategoryId(categoryId);

  if (products.length === 0) throw notFoundError();

  return products;
}

const productsService = {
  searchProductsByCategoryId,
};

export default productsService;
