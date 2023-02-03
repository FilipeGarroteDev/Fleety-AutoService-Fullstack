import { Issuers, Optionals, OrderStatus, Products } from '@prisma/client';

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

export type RegisterUserBody = {
  name: string;
  password: string;
  email?: string;
  role: 'CLIENT' | 'ADMIN';
  restaurantSecretKey: string;
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

export type OrderWithProductInfo = {
  id: number;
  ticketId: number;
  productId: number;
  totalValue: number;
  amount: number;
  optionals: string | null;
  status: OrderStatus;
  createdAt: Date;
  Product: Partial<Products>;
};

export type PaymentBody = {
  totalValue: number;
  firstName: string;
  cardIssuer?: Issuers;
  cardLastDigits: string;
  isSplitted: boolean
};

export type AdminCredentials = {
  name: string;
  email: string;
  image: string;
  restaurantSecretKey: string;
};
