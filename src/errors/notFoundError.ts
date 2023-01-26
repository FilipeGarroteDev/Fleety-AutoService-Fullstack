import { ErrorEntity } from '@/protocols';

export default function notFoundError(): ErrorEntity {
  return {
    name: 'NotFoundError',
    message: 'Houve um erro com a requisição, nenhum resultado foi localizado. Favor refaça a operação',
  };
}
