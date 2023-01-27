import { Optionals } from '@prisma/client';

export type ErrorEntity = {
  name: string;
  message: string;
};

export type ProductEntity = {
  id: number;
  name: string;
  description: string;
  value: number;
  image: string;
  categoryId: number;
  Optionals: Optionals[];
};

export type SignUpBody = {
  name: string;
  password: string;
  role: 'CLIENT' | 'ADMIN';
};
