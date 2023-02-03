import app, { init } from '@/app';
import { prismaPG } from '@/config';
import { RegisterUserBody } from '@/protocols';
import faker from '@faker-js/faker';
import { Roles } from '@prisma/client';
import httpStatus from 'http-status';
import supertest from 'supertest';
import usersFactory from '../factory/users-factory';
import { cleanDb, generateAdminTokenAndSession, generateTokenAndSession, generateValidToken } from '../utils';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /users/register', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.post('/users/register');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await usersFactory.createNewAdmin(faker.name.firstName(), faker.internet.email());
    const response = await server.post('/users/register').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const admin = await usersFactory.createNewAdmin(faker.name.firstName(), faker.internet.email());
    const token = generateValidToken(admin.id);
    const response = await server.post('/users/register').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 422 when body isnt given', async () => {
      const data = await generateAdminTokenAndSession(faker.name.firstName());

      const response = await server.post('/users/register').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422, if sign up data is invalid', async () => {
      const data = await generateAdminTokenAndSession(faker.name.firstName());
      const invalidSignUpData: Partial<RegisterUserBody> = {
        password: faker.internet.password(),
        email: faker.internet.email(),
        role: 'CLIENT',
        restaurantSecretKey: faker.lorem.word(),
      };

      const response = await server
        .post('/users/register')
        .set('Authorization', `Bearer ${data.token}`)
        .send(invalidSignUpData);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422, if restaurant secret key doesnt given', async () => {
      const data = await generateAdminTokenAndSession(faker.name.firstName());
      const invalidSignUpData: Partial<RegisterUserBody> = {
        name: faker.name.firstName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        role: 'CLIENT',
      };

      const response = await server
        .post('/users/register')
        .set('Authorization', `Bearer ${data.token}`)
        .send(invalidSignUpData);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
  });
  describe('when body is valid', () => {
    const generateValidClientData = (restaurantSecretKey: string) => ({
      name: faker.name.firstName(),
      password: faker.internet.password(),
      role: 'CLIENT',
      restaurantSecretKey,
    });

    it('should respond with status 401, if requester does not have admin role', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      const validBody = generateValidClientData(faker.lorem.word());

      const response = await server
        .post('/users/register')
        .set('Authorization', `Bearer ${data.token}`)
        .send(validBody);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 403, if given restaurant secret key isnt correct', async () => {
      const data = await generateAdminTokenAndSession(faker.name.firstName());
      const validBody = generateValidClientData(faker.lorem.word());

      const response = await server
        .post('/users/register')
        .set('Authorization', `Bearer ${data.token}`)
        .send(validBody);

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    describe('when admin tries to register a client', () => {
      it('should respond with status 409, if given name already exists on users table', async () => {
        const data = await generateAdminTokenAndSession(faker.name.firstName());
        const validBody = generateValidClientData(process.env.RESTAURANT_SECRET_KEY);
        await usersFactory.createUserByName(validBody.name, validBody.password);

        const response = await server
          .post('/users/register')
          .set('Authorization', `Bearer ${data.token}`)
          .send(validBody);

        expect(response.status).toBe(httpStatus.CONFLICT);
      });

      it('should respond with status 201 and create user when enrollment is successful', async () => {
        const data = await generateAdminTokenAndSession(faker.name.firstName());
        const validBody = generateValidClientData(process.env.RESTAURANT_SECRET_KEY);

        const response = await server
          .post('/users/register')
          .set('Authorization', `Bearer ${data.token}`)
          .send(validBody);

        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toEqual(
          expect.objectContaining({
            name: validBody.name,
            role: Roles.CLIENT,
            id: expect.any(Number),
          }),
        );
      });

      it('should not return user password on response body', async () => {
        const data = await generateAdminTokenAndSession(faker.name.firstName());
        const validBody = generateValidClientData(process.env.RESTAURANT_SECRET_KEY);

        const response = await server
          .post('/users/register')
          .set('Authorization', `Bearer ${data.token}`)
          .send(validBody);

        expect(response.body).not.toHaveProperty('password');
      });

      it('should correctly save user on db', async () => {
        const data = await generateAdminTokenAndSession(faker.name.firstName());
        const validBody = generateValidClientData(process.env.RESTAURANT_SECRET_KEY);

        const response = await server
          .post('/users/register')
          .set('Authorization', `Bearer ${data.token}`)
          .send(validBody);

        const createdUser = await prismaPG.users.findUnique({
          where: {
            name: validBody.name,
          },
        });

        expect(createdUser).toEqual(
          expect.objectContaining({
            name: createdUser.name,
            role: Roles.CLIENT,
            id: response.body.id,
          }),
        );
      });
    });

    describe('when admin tries to register another admin', () => {
      const generateValidAdminData = (restaurantSecretKey: string) => ({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'ADMIN',
        restaurantSecretKey,
      });

      it('should respond with status 409, if given name already exists on users table', async () => {
        const data = await generateAdminTokenAndSession(faker.name.firstName());
        const validBody = generateValidAdminData(process.env.RESTAURANT_SECRET_KEY);
        await usersFactory.createNewAdmin(validBody.name, faker.internet.email());

        const response = await server
          .post('/users/register')
          .set('Authorization', `Bearer ${data.token}`)
          .send(validBody);

        expect(response.status).toBe(httpStatus.CONFLICT);
      });

      it('should respond with status 409, if given email already exists with another admin', async () => {
        const data = await generateAdminTokenAndSession(faker.name.firstName());
        const validBody = generateValidAdminData(process.env.RESTAURANT_SECRET_KEY);
        await usersFactory.createNewAdmin(faker.name.firstName(), validBody.email);

        const response = await server
          .post('/users/register')
          .set('Authorization', `Bearer ${data.token}`)
          .send(validBody);

        expect(response.status).toBe(httpStatus.CONFLICT);
      });

      it('should respond with status 201 and create user when enrollment is successful', async () => {
        const data = await generateAdminTokenAndSession(faker.name.firstName());
        const validBody = generateValidAdminData(process.env.RESTAURANT_SECRET_KEY);

        const response = await server
          .post('/users/register')
          .set('Authorization', `Bearer ${data.token}`)
          .send(validBody);

        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toEqual(
          expect.objectContaining({
            name: validBody.name,
            email: validBody.email,
            role: Roles.ADMIN,
            id: expect.any(Number),
          }),
        );
      });

      it('should not return user password on response body', async () => {
        const data = await generateAdminTokenAndSession(faker.name.firstName());
        const validBody = generateValidAdminData(process.env.RESTAURANT_SECRET_KEY);

        const response = await server
          .post('/users/register')
          .set('Authorization', `Bearer ${data.token}`)
          .send(validBody);

        expect(response.body).not.toHaveProperty('password');
      });

      it('should correctly save user on db', async () => {
        const data = await generateAdminTokenAndSession(faker.name.firstName());
        const validBody = generateValidAdminData(process.env.RESTAURANT_SECRET_KEY);

        const response = await server
          .post('/users/register')
          .set('Authorization', `Bearer ${data.token}`)
          .send(validBody);

        const createdUser = await prismaPG.users.findFirst({
          where: {
            email: validBody.email,
          },
        });

        expect(createdUser).toEqual(
          expect.objectContaining({
            name: createdUser.name,
            email: validBody.email,
            role: Roles.ADMIN,
            id: response.body.id,
          }),
        );
      });
    });
  });
});

describe('GET /users/list', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.get('/users/list');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await usersFactory.createNewAdmin(faker.name.firstName(), faker.internet.email());
    const response = await server.get('/users/list').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const admin = await usersFactory.createNewAdmin(faker.name.firstName(), faker.internet.email());
    const token = generateValidToken(admin.id);
    const response = await server.get('/users/list').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 401, if requester does not have admin role', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.get('/users/list').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200', async () => {
      const data = await generateAdminTokenAndSession(faker.name.firstName());
      await usersFactory.createManyUsers();

      const response = await server.get('/users/list').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.OK);
    });

    it('should respond with the active users list', async () => {
      const data = await generateAdminTokenAndSession(faker.name.firstName());
      await usersFactory.createManyUsers();

      const response = await server.get('/users/list').set('Authorization', `Bearer ${data.token}`);

      expect(response.body.length).toBe(5);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            image: expect.any(String),
            role: expect.any(String),
            createdAt: expect.any(String),
          }),
        ]),
      );
    });
  });
});
