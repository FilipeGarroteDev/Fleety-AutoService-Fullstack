import app, { init } from '@/app';
import { mongoDB } from '@/config';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import { Document, ObjectId, WithId } from 'mongodb';
import supertest from 'supertest';
import authFactory from '../factory/auth-factory';
import waiterFactory from '../factory/waiter-factory';
import { cleanDb, generateTokenAndSession, generateValidToken } from '../utils';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /waiter', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.post('/waiter');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.post('/waiter').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.post('/waiter').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 409 if there is an active call with the given userId', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      await waiterFactory.createActiveCall(data.userId);

      const response = await server.post('/waiter').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should respond with status 201 if waiter call is successful', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.post('/waiter').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.CREATED);
    });

    it('should save waiter call on mongodb', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.post('/waiter').set('Authorization', `Bearer ${data.token}`);

      const waiterCall: WithId<Document> = await mongoDB.collection('calls').findOne({ userId: data.userId });

      expect(response.status).toBe(httpStatus.CREATED);
      expect(waiterCall).toEqual(
        expect.objectContaining({
          _id: expect.any(ObjectId),
          userId: data.userId,
          createdAt: expect.any(Number),
        }),
      );
    });
  });
});

describe('DELETE /waiter', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.delete('/waiter');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.delete('/waiter').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.delete('/waiter').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 401 if there is no active call with the given userId', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.delete('/waiter').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200 if there is an active call with the given userId', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      await waiterFactory.createActiveCall(data.userId);

      const response = await server.delete('/waiter').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.OK);
    });

    it('should delete waiter call on mongodb', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      await waiterFactory.createActiveCall(data.userId);

      const response = await server.delete('/waiter').set('Authorization', `Bearer ${data.token}`);

      const waiterCall: WithId<Document> = await mongoDB.collection('calls').findOne({ userId: data.userId });

      expect(response.status).toBe(httpStatus.OK);
      expect(waiterCall).toBeNull();
    });
  });
});
