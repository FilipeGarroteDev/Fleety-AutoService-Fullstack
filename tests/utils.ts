import { prisma } from '@/config';
import * as jwt from 'jsonwebtoken';

export async function cleanDb() {
  await prisma.optionals_Category.deleteMany({});
  await prisma.products.deleteMany({});
  await prisma.productCategories.deleteMany({});
  await prisma.productTypes.deleteMany({});
  await prisma.optionals.deleteMany({});
  await prisma.sessions.deleteMany({});
  await prisma.users.deleteMany({});
}

export function generateValidToken(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
}
