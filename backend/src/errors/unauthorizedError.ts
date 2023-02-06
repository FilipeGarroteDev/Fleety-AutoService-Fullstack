import { ErrorEntity } from '@/protocols';

export default function unauthorizedError(): ErrorEntity {
  return {
    name: 'UnauthorizedError',
    message: 'Você não está permitido para acessar esta página. Favor tente novamente',
  };
}
