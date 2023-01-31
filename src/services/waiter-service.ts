import conflictError from '@/errors/conflictError';
import waiterRepository from '@/repositories/waiter-repository';
import { Document, WithId } from 'mongodb';

async function validateAndCallWaiter(userId: number): Promise<void> {
  const activeCall = await searchActiveUserCall(userId);

  if (activeCall) throw conflictError();

  await waiterRepository.createNewCall(userId);
}

async function searchActiveUserCall(userId: number) {
  const activeCall: WithId<Document> = await waiterRepository.getActiveCallByUserId(userId);
  return activeCall;
}

const waiterService = {
  validateAndCallWaiter,
};

export default waiterService;
