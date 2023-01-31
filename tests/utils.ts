import { prisma } from '@/config';
import faker from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import authFactory from './factory/auth-factory';
import { createSession } from './factory/sessions-factory';

export async function cleanDb() {
  await prisma.optionals_Category.deleteMany({});
  await prisma.payments.deleteMany({});
  await prisma.orders.deleteMany({});
  await prisma.products.deleteMany({});
  await prisma.productCategories.deleteMany({});
  await prisma.productTypes.deleteMany({});
  await prisma.optionals.deleteMany({});
  await prisma.sessions.deleteMany({});
  await prisma.ratings.deleteMany({});
  await prisma.tickets.deleteMany({});
  await prisma.users.deleteMany({});
}

export function generateValidToken(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
}

export async function generateTokenAndSession(name: string) {
  const incomingUser = await authFactory.createUserByName(name, faker.internet.password());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(incomingUser.id, token);

  return { token, userId: incomingUser.id };
}
