import { prismaPG } from '@/config';

async function getProductsByCategoryId(categoryId: number) {
  return await prismaPG.products.findMany({
    where: {
      categoryId,
    },
    include: {
      Category: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function getProductById(productId: number) {
  return await prismaPG.products.findFirst({
    where: {
      id: productId,
    },
    include: {
      Category: {
        include: {
          Optionals_Categories: {
            include: {
              Optionals: true,
            },
          },
        },
      },
    },
  });
}

const productsRepository = {
  getProductsByCategoryId,
  getProductById,
};

export default productsRepository;
