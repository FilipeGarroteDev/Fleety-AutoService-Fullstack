import { PrismaClient } from '@prisma/client';

export let prismaPG: PrismaClient;

export function connectDb(): void {
  prismaPG = new PrismaClient();
}

export async function disconnectDb(): Promise<void> {
  await prismaPG?.$disconnect();
}
