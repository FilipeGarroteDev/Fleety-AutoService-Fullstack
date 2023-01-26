import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.productCategories.deleteMany({});
  await prisma.productTypes.deleteMany({});
}
