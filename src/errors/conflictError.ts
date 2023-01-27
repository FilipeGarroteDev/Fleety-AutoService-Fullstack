import { ErrorEntity } from '@/protocols';

export default function conflictError(): ErrorEntity {
  return {
    name: 'ConflictError',
    message: 'Já há um uma mesa cadastrada com o número/nome indicado',
  };
}
