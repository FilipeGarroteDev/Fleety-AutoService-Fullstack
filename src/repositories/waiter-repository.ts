import { mongoDB } from '@/config';

async function getActiveCallByUserId(userId: number) {
  return await mongoDB.collection('calls').findOne({ userId });
}

async function createNewCall(userId: number) {
  return await mongoDB.collection('calls').insertOne({ userId, createdAt: Date.now() });
}

const waiterRepository = { getActiveCallByUserId, createNewCall };

export default waiterRepository;
