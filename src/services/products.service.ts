import unprocessableEntityError from '@/errors/unprocessableEntityError';
import notFoundError from '@/errors/notFoundError';
import { ProductEntity } from '@/protocols';
import productsRepository from '@/repositories/products-repository';
import { Optionals } from '@prisma/client';

async function searchProductsByCategoryId(categoryId: number) {
  if (!categoryId) throw unprocessableEntityError();

  const products = await productsRepository.getProductsByCategoryId(categoryId);

  if (products.length === 0) throw notFoundError();

  return products;
}

async function searchProductById(productId: number): Promise<ProductEntity> {
  if (!productId) throw unprocessableEntityError();

  const product = await productsRepository.getProductById(productId);

  if (!product) throw notFoundError();

  const optionals: Optionals[] = product.Category.Optionals_Categories.map((optional) => optional.Optionals);
  delete product.Category;
  const productWithOptionals: ProductEntity = { ...product, Optionals: optionals };

  return productWithOptionals;
}

const productsService = {
  searchProductsByCategoryId,
  searchProductById,
};

export default productsService;
