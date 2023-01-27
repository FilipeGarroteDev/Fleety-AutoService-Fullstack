import { prisma } from '@/config';
import faker from '@faker-js/faker';

async function createProductsOnDiffCategory(firstCategory: number, secondCategory: number) {
  await prisma.products.createMany({
    data: [
      {
        name: faker.name.firstName(),
        description: faker.lorem.sentences(3),
        value: faker.datatype.number(),
        image: faker.internet.url(),
        categoryId: firstCategory,
      },
      {
        name: faker.name.firstName(),
        description: faker.lorem.sentences(3),
        value: faker.datatype.number(),
        image: faker.internet.url(),
        categoryId: firstCategory,
      },
      {
        name: faker.name.firstName(),
        description: faker.lorem.sentences(3),
        value: faker.datatype.number(),
        image: faker.internet.url(),
        categoryId: firstCategory,
      },
      {
        name: faker.name.firstName(),
        description: faker.lorem.sentences(3),
        value: faker.datatype.number(),
        image: faker.internet.url(),
        categoryId: secondCategory,
      },
      {
        name: faker.name.firstName(),
        description: faker.lorem.sentences(3),
        value: faker.datatype.number(),
        image: faker.internet.url(),
        categoryId: secondCategory,
      },
      {
        name: faker.name.firstName(),
        description: faker.lorem.sentences(3),
        value: faker.datatype.number(),
        image: faker.internet.url(),
        categoryId: secondCategory,
      },
    ],
  });
}

const productsFactory = {
  createProductsOnDiffCategory,
};

export default productsFactory;
