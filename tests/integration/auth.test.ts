import app, { init } from '@/app';
import { prisma } from '@/config';
import { SignUpBody } from '@/protocols';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import authFactory from '../factory/auth-factory';
import { cleanDb } from '../utils';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /signup', () => {
  const generateValidBody = () => ({
    name: faker.name.firstName(),
    password: faker.internet.password(),
    role: 'CLIENT',
  });

  it('should respond with status 400 when body isnt given', async () => {
    const response = await server.post('/auth/signup').send({});

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should respond with status 400, if sign up data is invalid', async () => {
    const invalidSignUpData: Omit<SignUpBody, 'name'> = { password: '123456', role: 'CLIENT' };
    const response = await server.post('/auth/signup').send(invalidSignUpData);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should respond with status 409, if given name already exists on users table', async () => {
    const validBody = generateValidBody();
    await authFactory.createUserByNome(validBody.name);
    const response = await server.post('/auth/signup').send(validBody);

    expect(response.status).toBe(httpStatus.CONFLICT);
  });

  it('should respond with status 201 and create user when enrollment is successful', async () => {
    const validBody = generateValidBody();
    const response = await server.post('/auth/signup').send(validBody);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: validBody.name,
        id: expect.any(Number),
      }),
    );
  });

  it('should not return user password on response body', async () => {
    const validBody = generateValidBody();

    const response = await server.post('/auth/signup').send(validBody);

    expect(response.body).not.toHaveProperty('password');
  });

  it('should correctly save user on db', async () => {
    const validBody = generateValidBody();
    const response = await server.post('/auth/signup').send(validBody);

    const createdUser = await prisma.users.findUnique({
      where: {
        name: validBody.name,
      },
    });

    expect(createdUser).toEqual(
      expect.objectContaining({
        name: createdUser.name,
        id: response.body.id,
      }),
    );
  });
});
