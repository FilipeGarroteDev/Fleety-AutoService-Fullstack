import { prismaPG } from '@/config';
import faker from '@faker-js/faker';

async function createSomeRatings(userId: number) {
  return await prismaPG.ratings.createMany({
    data: [
      {
        userId,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        environmentRate: faker.datatype.number({ max: 5 }),
        foodRate: faker.datatype.number({ max: 5 }),
        beverageRate: faker.datatype.number({ max: 5 }),
        pricesRate: faker.datatype.number({ max: 5 }),
        serviceRate: faker.datatype.number({ max: 5 }),
        userNote: faker.lorem.words(10),
      },
      {
        userId,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        environmentRate: faker.datatype.number({ max: 5 }),
        foodRate: faker.datatype.number({ max: 5 }),
        beverageRate: faker.datatype.number({ max: 5 }),
        pricesRate: faker.datatype.number({ max: 5 }),
        serviceRate: faker.datatype.number({ max: 5 }),
        userNote: faker.lorem.words(10),
      },
      {
        userId,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        environmentRate: faker.datatype.number({ max: 5 }),
        foodRate: faker.datatype.number({ max: 5 }),
        beverageRate: faker.datatype.number({ max: 5 }),
        pricesRate: faker.datatype.number({ max: 5 }),
        serviceRate: faker.datatype.number({ max: 5 }),
        userNote: faker.lorem.words(10),
      },
      {
        userId,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        environmentRate: faker.datatype.number({ max: 5 }),
        foodRate: faker.datatype.number({ max: 5 }),
        beverageRate: faker.datatype.number({ max: 5 }),
        pricesRate: faker.datatype.number({ max: 5 }),
        serviceRate: faker.datatype.number({ max: 5 }),
        userNote: faker.lorem.words(10),
      },
    ],
  });
}

const ratingsFactory = {
  createSomeRatings,
};

export default ratingsFactory;
