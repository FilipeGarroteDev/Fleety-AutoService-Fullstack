import { ErrorEntity } from '@/protocols';

export default function forbiddenError(): ErrorEntity {
  return {
    name: 'ForbiddenError',
    message: 'Não é possível completar essa solicitação. Favor refaça a operação.',
  };
}
