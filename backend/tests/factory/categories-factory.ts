import { prismaPG } from '@/config';
import faker from '@faker-js/faker';

async function createFoodType() {
  const foodType = await prismaPG.productTypes.create({
    data: {
      name: 'foods',
    },
  });

  return foodType;
}

async function createCategories(typeId: number) {
  await prismaPG.productCategories.createMany({
    data: [
      {
        name: faker.name.firstName(),
        image: faker.internet.url(),
        typeId,
      },
      {
        name: faker.name.firstName(),
        image: faker.internet.url(),
        typeId,
      },
      {
        name: faker.name.firstName(),
        image: faker.internet.url(),
        typeId,
      },
      {
        name: faker.name.firstName(),
        image: faker.internet.url(),
        typeId,
      },
    ],
  });
}

async function getCategoriesIds() {
  const categories = await prismaPG.productCategories.findMany({});
  return categories;
}

async function createSingleCategory(typeId: number) {
  return await prismaPG.productCategories.create({
    data: {
      name: faker.name.firstName(),
      image: faker.internet.url(),
      typeId,
    },
  });
}

const categoriesFactory = {
  createFoodType,
  createCategories,
  getCategoriesIds,
  createSingleCategory,
};

export default categoriesFactory;
