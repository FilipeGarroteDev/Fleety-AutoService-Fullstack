import { Optionals, OrderStatus } from '@prisma/client';

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

export type SignInBody = {
  name: string;
  password: string;
};

export type NewRatingEntity = {
  userId: number;
  name: string;
  email: string;
  environmentRate: number;
  foodRate: number;
  beverageRate: number;
  pricesRate: number;
  serviceRate: number;
  userNote: string;
};

export type OrderBodyEntity = {
  ticketId: number;
  productId: number;
  totalValue: number;
  optionals: string;
  status: OrderStatus;
  amount: number;
};

export type CheckoutBodyEntity = {
  ticketId: number;
  status: OrderStatus;
};
