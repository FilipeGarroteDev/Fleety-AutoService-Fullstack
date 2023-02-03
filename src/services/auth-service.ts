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
  const user = await authRepository.getUserById(userId);

  return user;
}

async function handleAdminLogin(signInData: AdminCredentials) {
  if (signInData.restaurantSecretKey !== process.env.RESTAURANT_SECRET_KEY) throw forbiddenError();

  const existentUser = await authRepository.searchAdminByEmail(signInData.email);

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
  validateDataAndRegisterUser,
  validateCredentialAndSignIn,
  getUserData,
  handleAdminLogin,
};

export default authService;
