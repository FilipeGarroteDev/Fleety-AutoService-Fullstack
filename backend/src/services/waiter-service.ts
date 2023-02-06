import conflictError from '@/errors/conflictError';
import unauthorizedError from '@/errors/unauthorizedError';
import waiterRepository from '@/repositories/waiter-repository';
import { Document, WithId } from 'mongodb';

async function validateAndCallWaiter(userId: number, name: string): Promise<void> {
  const activeCall = await searchActiveUserCall(userId);

  if (activeCall) throw conflictError();

  await waiterRepository.createNewCall(userId, name);
}

async function verifyAndDeleteWaiterCall(userId: number): Promise<void> {
  const activeCall = await searchActiveUserCall(userId);

  if (!activeCall) throw unauthorizedError();

  await waiterRepository.deleteWaiterCall(activeCall._id);
}

async function searchActiveUserCall(userId: number): Promise<WithId<Document>> {
  const activeCall: WithId<Document> = await waiterRepository.getActiveCallByUserId(userId);
  return activeCall;
}

async function searchAllWaiterCalls(role: string): Promise<WithId<Document>[]> {
  if (role !== 'ADMIN') throw unauthorizedError();

  const activeCalls: WithId<Document>[] = await waiterRepository.getAllWaiterCalls();
  return activeCalls;
}

const waiterService = {
  validateAndCallWaiter,
  verifyAndDeleteWaiterCall,
  searchActiveUserCall,
  searchAllWaiterCalls,
};

export default waiterService;
