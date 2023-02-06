import { prismaPG } from '@/config';
import faker from '@faker-js/faker';
import { Optionals } from '@prisma/client';

async function createProductsOnDiffCategory(firstCategory: number, secondCategory: number) {
  await prismaPG.products.createMany({
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

async function createSingleProduct(categoryId: number) {
  return await prismaPG.products.create({
    data: {
      name: faker.name.firstName(),
      description: faker.lorem.sentences(3),
      value: faker.datatype.number(),
      image: faker.internet.url(),
      categoryId,
    },
  });
}

async function createOptionals() {
  return await prismaPG.optionals.createMany({
    data: [
      { name: faker.name.firstName(), value: faker.datatype.number() },
      { name: faker.name.firstName(), value: faker.datatype.number() },
      { name: faker.name.firstName(), value: faker.datatype.number() },
      { name: faker.name.firstName(), value: faker.datatype.number() },
      { name: faker.name.firstName(), value: faker.datatype.number() },
      { name: faker.name.firstName(), value: faker.datatype.number() },
    ],
  });
}

async function findOptionals() {
  return await prismaPG.optionals.findMany({});
}

async function populeOptionalsCategoryTable(optionals: Optionals[], firstCat: number, secondCat: number) {
  const optionalsCategoryArray = [];

  for (let i = 0; i < optionals.length; i++) {
    const optionalsCategoryObject = {
      optionalId: optionals[i].id,
      categoryId: i % 2 === 0 ? firstCat : secondCat,
    };
    optionalsCategoryArray.push(optionalsCategoryObject);
  }

  return await prismaPG.optionals_Category.createMany({
    data: optionalsCategoryArray,
  });
}

const productsFactory = {
  createProductsOnDiffCategory,
  createSingleProduct,
  createOptionals,
  findOptionals,
  populeOptionalsCategoryTable
};

export default productsFactory;
