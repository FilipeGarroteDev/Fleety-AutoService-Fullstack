import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.optionals_Category.deleteMany({});
  await prisma.products.deleteMany({});
  await prisma.productCategories.deleteMany({});
  await prisma.productTypes.deleteMany({});
  await prisma.optionals.deleteMany({});
  await prisma.sessions.deleteMany({});
  await prisma.users.deleteMany({});
}
