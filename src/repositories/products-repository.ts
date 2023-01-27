import { prisma } from '@/config';

async function getProductsByCategoryId(categoryId: number) {
  return await prisma.products.findMany({
    where: {
      categoryId,
    },
  });
}

const productsRepository = {
  getProductsByCategoryId,
};

export default productsRepository;
