import { ErrorEntity } from '@/protocols';

export default function badRequestError(): ErrorEntity {
  return {
    name: 'BadRequestError',
    message: 'Houve um erro com a requisição. Favor refaça a operação.',
  };
}
