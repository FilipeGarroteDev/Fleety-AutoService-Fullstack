import conflictError from '@/errors/conflictError';
import { SignUpBody } from '@/protocols';
import authRepository from '@/repositories/auth-repository';
import bcrypt from 'bcrypt';

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

const authService = {
  searchUserAndSignUp,
};

export default authService;
