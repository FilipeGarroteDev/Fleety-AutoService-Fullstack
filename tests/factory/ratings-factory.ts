import { mongoDB } from '@/config';
import faker from '@faker-js/faker';

async function createSomeRatings(userId: number) {
  return await mongoDB.collection('ratings').insertMany([
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
      createdAt: new Date,
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
      createdAt: new Date,
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
      createdAt: new Date,
    },
  ]);
}

const ratingsFactory = {
  createSomeRatings,
};

export default ratingsFactory;
