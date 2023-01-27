import conflictError from '@/errors/conflictError';
import unauthorizedError from '@/errors/unauthorizedError';
import { SignInBody, SignUpBody } from '@/protocols';
import authRepository from '@/repositories/auth-repository';
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
  const userAndToken = {
    user: {
      id: existentUser.id,
      name,
      role: existentUser.role,
    },
    token,
  };

  return userAndToken;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await authRepository.createNewSession(userId, token);

  return token;
}

const authService = {
  searchUserAndSignUp,
  validateCredentialAndSignIn,
};

export default authService;
