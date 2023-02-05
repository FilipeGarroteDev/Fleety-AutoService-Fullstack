import conflictError from '@/errors/conflictError';
import forbiddenError from '@/errors/forbiddenError';
import notFoundError from '@/errors/notFoundError';
import unauthorizedError from '@/errors/unauthorizedError';
import unprocessableEntityError from '@/errors/unprocessableEntityError';
import { RegisterUserBody } from '@/protocols';
import usersRepository from '@/repositories/users-repository';
import { Roles, Users } from '@prisma/client';
import bcrypt from 'bcrypt';

async function validateDataAndRegisterUser(signUpData: RegisterUserBody, role: string) {
  if (role !== 'ADMIN') throw unauthorizedError();
  if (signUpData.restaurantSecretKey !== process.env.RESTAURANT_SECRET_KEY) throw forbiddenError();

  const existentUser = await usersRepository.searchUser(signUpData.name);

  if (existentUser) {
    throw conflictError();
  }

  if (signUpData.role === Roles.ADMIN) {
    const existentAdmin = await usersRepository.searchAdminByEmail(signUpData.email);
    if (existentAdmin) throw conflictError();
  }

  const hashedPassword = await bcrypt.hash(signUpData.password, 10);

  delete signUpData.restaurantSecretKey;

  const user = await usersRepository.insertNewUser({ ...signUpData, password: hashedPassword });
  delete user.password;
  return user;
}

async function validateAndSearchAllUsers(role: string): Promise<Users[]> {
  if (role !== 'ADMIN') throw unauthorizedError();

  const users: Users[] = await usersRepository.getAllUsers();
  return users;
}

async function deleteUserById(userId: string, role: string) {
  if (role !== 'ADMIN') throw forbiddenError();
  const validUserId = Number(userId);

  if (!validUserId) throw unprocessableEntityError();

  const existentUser = await usersRepository.getUserById(validUserId);

  if (!existentUser) {
    throw notFoundError();
  }

  await usersRepository.deleteAllUsersEntities(validUserId);
}

const usersService = {
  validateDataAndRegisterUser,
  validateAndSearchAllUsers,
  deleteUserById,
};

export default usersService;
