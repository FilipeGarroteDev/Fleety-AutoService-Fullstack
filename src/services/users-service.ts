import conflictError from '@/errors/conflictError';
import forbiddenError from '@/errors/forbiddenError';
import unauthorizedError from '@/errors/unauthorizedError';
import { AdminCredentials, SignInBody, RegisterUserBody } from '@/protocols';
import authRepository from '@/repositories/auth-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { Roles, Tickets, Users } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function validateDataAndRegisterUser(signUpData: RegisterUserBody, role: string) {
  if (role !== 'ADMIN') throw unauthorizedError();
  if (signUpData.restaurantSecretKey !== process.env.RESTAURANT_SECRET_KEY) throw forbiddenError();

  const existentUser = await authRepository.searchUser(signUpData.name);

  if (existentUser) {
    throw conflictError();
  }

  if (signUpData.role === Roles.ADMIN) {
    const existentAdmin = await authRepository.searchAdminByEmail(signUpData.email);
    if (existentAdmin) throw conflictError();
  }

  const hashedPassword = await bcrypt.hash(signUpData.password, 10);

  delete signUpData.restaurantSecretKey;

  const user = await authRepository.insertNewUser({ ...signUpData, password: hashedPassword });
  delete user.password;
  return user;
}

async function validateAndSearchAllUsers(role: string): Promise<Users[]> {
  if (role !== 'ADMIN') throw unauthorizedError();

  const users: Users[] = await authRepository.getAllUsers();
  return users;
}

const usersService = {
  validateDataAndRegisterUser,
  validateAndSearchAllUsers,
};

export default usersService;
