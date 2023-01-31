import { PrismaClient } from '@prisma/client';
import { Db, MongoClient } from 'mongodb';

export let prismaPG: PrismaClient;
export let mongoDB: Db;

export function connectDb(): void {
  prismaPG = new PrismaClient();
}

export async function disconnectDb(): Promise<void> {
  await prismaPG?.$disconnect();
}

export function connectMongoDB(): void {
  const mongoClient = new MongoClient(process.env.MONGO_URI);

  try {
    mongoClient.connect();
  } catch (error) {
    console.log(error.message);
  }

  mongoDB = mongoClient.db(process.env.MONGO_DB);
}

export async function disconnectMongoDB(): Promise<void> {
  const mongoClient = new MongoClient(process.env.MONGO_URI);

  try {
    await mongoClient.close();
  } catch (error) {
    console.log(error.message);
  }
}
