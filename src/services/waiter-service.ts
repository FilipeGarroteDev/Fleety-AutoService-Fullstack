import conflictError from '@/errors/conflictError';
import unauthorizedError from '@/errors/unauthorizedError';
import waiterRepository from '@/repositories/waiter-repository';
import { Document, WithId } from 'mongodb';

async function validateAndCallWaiter(userId: number): Promise<void> {
  const activeCall = await searchActiveUserCall(userId);

  if (activeCall) throw conflictError();

  await waiterRepository.createNewCall(userId);
}

async function verifyAndDeleteWaiterCall(userId: number): Promise<void> {
  const activeCall = await searchActiveUserCall(userId);

  if (!activeCall) throw unauthorizedError();

  await waiterRepository.deleteWaiterCall(activeCall._id);
}

async function searchActiveUserCall(userId: number) {
  const activeCall: WithId<Document> = await waiterRepository.getActiveCallByUserId(userId);
  return activeCall;
}

const waiterService = {
  validateAndCallWaiter,
  verifyAndDeleteWaiterCall,
  searchActiveUserCall,
};

export default waiterService;
