import { mongoDB } from '@/config';
import faker from '@faker-js/faker';

async function createActiveCall(userId: number, table: string) {
  return await mongoDB.collection('calls').insertOne({ userId, createdAt: Date.now(), table });
}

async function createSomeActiveCalls() {
  return await mongoDB.collection('calls').insertMany([
    { userId: faker.datatype.number(), createdAt: Date.now(), table: faker.lorem.word() },
    { userId: faker.datatype.number(), createdAt: Date.now(), table: faker.lorem.word() },
    { userId: faker.datatype.number(), createdAt: Date.now(), table: faker.lorem.word() },
    { userId: faker.datatype.number(), createdAt: Date.now(), table: faker.lorem.word() },
    { userId: faker.datatype.number(), createdAt: Date.now(), table: faker.lorem.word() },
  ]);
}

const waiterFactory = { createActiveCall, createSomeActiveCalls };

export default waiterFactory;
