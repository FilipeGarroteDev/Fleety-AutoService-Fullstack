import { prisma } from '@/config';
import faker from '@faker-js/faker';

async function createFoodType() {
  const foodType = await prisma.productTypes.create({
    data: {
      name: 'foods',
    },
  });

  return foodType;
}

async function createCategories(typeId: number) {
  const categories = await prisma.productCategories.createMany({
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

const menuFactory = {
  createFoodType,
  createCategories
};

export default menuFactory;
