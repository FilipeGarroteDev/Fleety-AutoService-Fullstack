import { mongoDB } from '@/config';
import { ObjectId } from 'mongodb';

async function getActiveCallByUserId(userId: number) {
  return await mongoDB.collection('calls').findOne({ userId });
}

async function createNewCall(userId: number) {
  return await mongoDB.collection('calls').insertOne({ userId, createdAt: Date.now() });
}

async function deleteWaiterCall(id: ObjectId) {
  return await mongoDB.collection('calls').deleteOne({ _id: id });
}

const waiterRepository = { getActiveCallByUserId, createNewCall, deleteWaiterCall };

export default waiterRepository;
