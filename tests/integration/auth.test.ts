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
  describe('when body is invalid', () => {
    it('should respond with status 422 when body isnt given', async () => {
      const response = await server.post('/auth/signup').send({});

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422, if sign up data is invalid', async () => {
      const invalidSignUpData: Omit<SignUpBody, 'name'> = { password: '123456', role: 'CLIENT' };

      const response = await server.post('/auth/signup').send(invalidSignUpData);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
  });
  describe('when body is valid', () => {
    const generateValidSignUpBody = () => ({
      name: faker.name.firstName(),
      password: faker.internet.password(),
      role: 'CLIENT',
    });

    it('should respond with status 409, if given name already exists on users table', async () => {
      const validBody = generateValidSignUpBody();
      await authFactory.createUserByName(validBody.name, validBody.password);

      const response = await server.post('/auth/signup').send(validBody);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should respond with status 201 and create user when enrollment is successful', async () => {
      const validBody = generateValidSignUpBody();

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
      const validBody = generateValidSignUpBody();

      const response = await server.post('/auth/signup').send(validBody);

      expect(response.body).not.toHaveProperty('password');
    });

    it('should correctly save user on db', async () => {
      const validBody = generateValidSignUpBody();

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
});

describe('POST /signin', () => {
  describe('when body is invalid', () => {
    it('should respond with status 422 when body isnt given', async () => {
      const response = await server.post('/auth/signin').send({});

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422, if sign up data is invalid', async () => {
      const invalidSignInData = { [faker.lorem.word()]: faker.lorem.word() };

      const response = await server.post('/auth/signin').send(invalidSignInData);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
  });
  describe('when body is valid', () => {
    const generateValidSigninBody = () => ({
      name: faker.name.firstName(),
      password: faker.internet.password(),
    });

    it('should respond with status 401, if there is no user for given unique name', async () => {
      const validBody = generateValidSigninBody();

      const response = await server.post('/auth/signin').send(validBody);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401, if password doesnt match with user credentials', async () => {
      const validBody = generateValidSigninBody();
      await authFactory.createUserByName(validBody.name, validBody.password);

      const response = await server.post('/auth/signin').send({ name: validBody.name, password: faker.lorem.word() });

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when credentials are valid', () => {
      it('should respond with status 200', async () => {
        const validBody = generateValidSigninBody();
        await authFactory.createUserByName(validBody.name, validBody.password);
        const response = await server.post('/auth/signin').send(validBody);

        expect(response.status).toBe(httpStatus.OK);
      });

      it('should respond with user data and token', async () => {
        const validBody = generateValidSigninBody();
        const createdUser = await authFactory.createUserByName(validBody.name, validBody.password);
        const response = await server.post('/auth/signin').send(validBody);

        expect(response.body).toEqual(
          expect.objectContaining({
            user: expect.objectContaining({
              name: createdUser.name,
              role: createdUser.role,
              id: createdUser.id,
            }),
            token: expect.any(String),
          }),
        );
      });

      it('should correctly save token on db', async () => {
        const validBody = generateValidSigninBody();
        const createdUser = await authFactory.createUserByName(validBody.name, validBody.password);
        const response = await server.post('/auth/signin').send(validBody);

        const session = await prisma.sessions.findFirst({
          where: {
            userId: createdUser.id
          },
        });

        expect(response.body.token).toEqual(session.token);
      });
    });
  });
});
