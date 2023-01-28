import conflictError from '@/errors/conflictError';
import unauthorizedError from '@/errors/unauthorizedError';
import { SignInBody, SignUpBody } from '@/protocols';
import authRepository from '@/repositories/auth-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { Tickets } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function searchUserAndSignUp(signUpData: SignUpBody) {
  const { name, password, role } = signUpData;
  const existentUser = await authRepository.searchUser(name);

  if (existentUser) {
    throw conflictError();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepository.insertNewUser({ name, role, password: hashedPassword });
  delete user.password;
  return user;
}

async function validateCredentialAndSignIn(signInData: SignInBody) {
  const { name, password } = signInData;
  const existentUser = await authRepository.searchUser(name);

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
    ticket
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

async function getUserData(userId: number) {
  const user = await authRepository.getUserById(userId);

  return user.name;
}

const authService = {
  searchUserAndSignUp,
  validateCredentialAndSignIn,
  getUserData,
};

export default authService;
