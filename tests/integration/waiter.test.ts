import app, { init } from '@/app';
import { mongoDB } from '@/config';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import { Document, ObjectId, WithId } from 'mongodb';
import supertest from 'supertest';
import authFactory from '../factory/users-factory';
import waiterFactory from '../factory/waiter-factory';
import { cleanDb, generateAdminTokenAndSession, generateTokenAndSession, generateValidToken } from '../utils';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /api/waiter', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.post('/api/waiter');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.post('/api/waiter').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.post('/api/waiter').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 409 if there is an active call with the given userId', async () => {
      const name: string = faker.name.firstName();
      const data = await generateTokenAndSession(name);
      await waiterFactory.createActiveCall(data.userId, name);

      const response = await server.post('/api/waiter').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should respond with status 201 if waiter call is successful', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.post('/api/waiter').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.CREATED);
    });

    it('should save waiter call on mongodb', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.post('/api/waiter').set('Authorization', `Bearer ${data.token}`);

      const waiterCall: WithId<Document> = await mongoDB.collection('calls').findOne({ userId: data.userId });

      expect(response.status).toBe(httpStatus.CREATED);
      expect(waiterCall).toEqual(
        expect.objectContaining({
          _id: expect.any(ObjectId),
          userId: data.userId,
          createdAt: expect.any(Number),
          table: expect.any(String),
        }),
      );
    });
  });
});

describe('DELETE /api/waiter/:userId', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.delete('/api/waiter/1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.delete('/api/waiter/1').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.delete('/api/waiter/1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 401 if there is no active call with the given userId', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.delete(`/api/waiter/${data.userId}`).set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200 if there is an active call with the given userId', async () => {
      const name: string = faker.name.firstName();
      const data = await generateTokenAndSession(name);
      await waiterFactory.createActiveCall(data.userId, name);

      const response = await server.delete(`/api/waiter/${data.userId}`).set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.OK);
    });

    it('should delete waiter call on mongodb', async () => {
      const name: string = faker.name.firstName();
      const data = await generateTokenAndSession(name);
      await waiterFactory.createActiveCall(data.userId, name);

      const response = await server.delete(`/api/waiter/${data.userId}`).set('Authorization', `Bearer ${data.token}`);

      const waiterCall: WithId<Document> = await mongoDB.collection('calls').findOne({ userId: data.userId });

      expect(response.status).toBe(httpStatus.OK);
      expect(waiterCall).toBeNull();
    });
  });
});

describe('GET /api/waiter/mycall', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.get('/api/waiter/mycall');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.get('/api/waiter/mycall').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.get('/api/waiter/mycall').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 if there is an active call with the given userId, and return the waiter call', async () => {
      const name: string = faker.name.firstName();
      const data = await generateTokenAndSession(name);
      await waiterFactory.createActiveCall(data.userId, name);

      const response = await server.get('/api/waiter/mycall').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          userId: data.userId,
          createdAt: expect.any(Number),
          table: name,
        }),
      );
    });

    it('should respond with status 200 if there is no call with the given userId, and return null', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.get('/api/waiter/mycall').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({});
    });
  });
});

describe('GET /api/waiter/calls', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.get('/api/waiter/calls');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.get('/api/waiter/calls').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.get('/api/waiter/calls').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 401 if user role isnt ADMIN', async () => {
      const name: string = faker.name.firstName();
      const data = await generateTokenAndSession(name);

      const response = await server.get('/api/waiter/calls').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200 if there is no active call and return empty array', async () => {
      const name: string = faker.name.firstName();
      const data = await generateAdminTokenAndSession(name);

      const response = await server.get('/api/waiter/calls').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it('should respond with status 200 and return calls array', async () => {
      const name: string = faker.name.firstName();
      const data = await generateAdminTokenAndSession(name);
      await waiterFactory.createSomeActiveCalls();

      const response = await server.get('/api/waiter/calls').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            createdAt: expect.any(Number),
            userId: expect.any(Number),
            table: expect.any(String),
          }),
        ]),
      );
    });
  });
});
