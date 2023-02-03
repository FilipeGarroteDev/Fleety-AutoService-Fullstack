import forbiddenError from '@/errors/forbiddenError';
import unauthorizedError from '@/errors/unauthorizedError';
import { AdminCredentials, SignInBody } from '@/protocols';
import authRepository from '@/repositories/auth-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import usersRepository from '@/repositories/users-repository';
import { Tickets, Users } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function validateCredentialAndSignIn(signInData: SignInBody) {
  const { name, password } = signInData;
  const existentUser = await usersRepository.searchUser(name);

  if (!existentUser) {
    throw unauthorizedError();
  }

  const validatePassword = await bcrypt.compare(password, existentUser.password);

  if (!validatePassword) {
    throw unauthorizedError();
  }

  const token = await createSession(existentUser.id);
  const ticket = await verifyAndCreateTicket(existentUser.id);

  const clientAccountData = {
    user: {
      id: existentUser.id,
      name,
      role: existentUser.role,
    },
    token,
    ticket,
  };

  return clientAccountData;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await authRepository.createNewSession(userId, token);

  return token;
}

async function verifyAndCreateTicket(userId: number): Promise<Tickets> {
  const ticket = await ticketsRepository.getActiveTicketByUserId(userId);

  if (!ticket) {
    return await ticketsRepository.createNewTicket(userId);
  }

  return ticket;
}

async function getUserData(userId: number): Promise<Users> {
  const user = await usersRepository.getUserById(userId);

  return user;
}

async function handleAdminLogin(signInData: AdminCredentials) {
  if (signInData.restaurantSecretKey !== process.env.RESTAURANT_SECRET_KEY) throw forbiddenError();

  const existentUser = await usersRepository.searchAdminByEmail(signInData.email);

  if (!existentUser) {
    throw unauthorizedError();
  }

  const token = await createSession(existentUser.id);

  const adminAccountData = {
    user: {
      id: existentUser.id,
      name: signInData.name,
      image: signInData.image,
      role: existentUser.role,
    },
    token,
  };

  return adminAccountData;
}

const authService = {
  validateCredentialAndSignIn,
  getUserData,
  handleAdminLogin,
};

export default authService;
