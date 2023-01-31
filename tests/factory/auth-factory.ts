import { prismaPG } from '@/config';
import bcrypt from 'bcrypt';

async function createUserByName(name: string, password: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);

  return await prismaPG.users.create({
    data: {
      name,
      password: hashedPassword,
      role: 'CLIENT',
    },
  });
}

const authFactory = {
  createUserByName,
};

export default authFactory;
