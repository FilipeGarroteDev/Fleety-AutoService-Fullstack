import { ErrorEntity } from '@/protocols';

export default function UnprocessableEntityError(): ErrorEntity {
  return {
    name: 'UnprocessableEntityError',
    message: 'O dado informado está inválido, favor revisar.',
  };
}
