import { ErrorEntity } from '@/protocols';

export default function unprocessableEntityError(): ErrorEntity {
  return {
    name: 'UnprocessableEntityError',
    message: 'O(s) dado(s) informado(s) está(ão) inválido(s). Favor refaça a operação',
  };
}
