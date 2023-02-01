import { mongoDB } from '@/config';
import { ObjectId } from 'mongodb';

async function getActiveCallByUserId(userId: number) {
  return await mongoDB.collection('calls').findOne({ userId });
}

async function createNewCall(userId: number, table: string) {
  return await mongoDB.collection('calls').insertOne({ userId, createdAt: Date.now(), table });
}

async function deleteWaiterCall(id: ObjectId) {
  return await mongoDB.collection('calls').deleteOne({ _id: id });
}

async function getAllWaiterCalls() {
  return await mongoDB.collection('calls').find().toArray();
}

const waiterRepository = { getActiveCallByUserId, createNewCall, deleteWaiterCall, getAllWaiterCalls };

export default waiterRepository;
