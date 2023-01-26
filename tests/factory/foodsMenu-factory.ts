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

const foodsMenuFactory = {
  createFoodType
};

export default foodsMenuFactory;
