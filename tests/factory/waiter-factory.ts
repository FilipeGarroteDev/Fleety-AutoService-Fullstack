import { mongoDB } from '@/config';

async function createActiveCall(userId: number) {
  return await mongoDB.collection('calls').insertOne({ userId, createdAt: Date.now() });
}

const waiterFactory = { createActiveCall };

export default waiterFactory;
