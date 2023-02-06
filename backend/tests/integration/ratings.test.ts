import app, { init } from '@/app';
import { mongoDB } from '@/config';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import authFactory from '../factory/users-factory';
import ratingsFactory from '../factory/ratings-factory';
import { cleanDb, generateAdminTokenAndSession, generateTokenAndSession, generateValidToken } from '../utils';
import { ObjectId } from 'mongodb';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /api/ratings', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.post('/api/ratings');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.post('/api/ratings').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.post('/api/ratings').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    const generateCompleteRating = (userRating: number) => ({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      environmentRate: userRating,
      foodRate: userRating - 1,
      beverageRate: userRating,
      pricesRate: userRating - 1,
      serviceRate: userRating,
      userNote: '',
    });
    it('should respond with status 422 if there is no body given', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.post('/api/ratings').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422 if body is invalid', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server
        .post('/api/ratings')
        .set('Authorization', `Bearer ${data.token}`)
        .send({ name: faker.name.firstName(), unknown: faker.lorem.word() });

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422 if user rating is less then one', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      const body = generateCompleteRating(0);

      const response = await server.post('/api/ratings').set('Authorization', `Bearer ${data.token}`).send(body);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422 if user rating is more then 5', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      const body = generateCompleteRating(7);

      const response = await server.post('/api/ratings').set('Authorization', `Bearer ${data.token}`).send(body);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    describe('when body is valid', () => {
      const generateWithoutRatings = () => ({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        userNote: 'Ruim',
      });
      it('should respond with status 201, if ratings isnt given and return ratings with default value = 1', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const body = generateWithoutRatings();

        const response = await server.post('/api/ratings').set('Authorization', `Bearer ${data.token}`).send(body);

        const ratings = await mongoDB.collection('ratings').findOne({ userId: data.userId });
        expect(response.status).toBe(httpStatus.CREATED);

        expect(ratings).toEqual(
          expect.objectContaining({
            _id: expect.any(ObjectId),
            userId: data.userId,
            name: body.name,
            email: body.email,
            environmentRate: 1,
            foodRate: 1,
            beverageRate: 1,
            pricesRate: 1,
            serviceRate: 1,
            userNote: body.userNote,
            createdAt: expect.any(Date),
          }),
        );
      });

      it('should respond with status 201, if user rating is a number between 1 and 5', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const body = generateCompleteRating(5);
        const response = await server.post('/api/ratings').set('Authorization', `Bearer ${data.token}`).send(body);

        const ratings = await mongoDB.collection('ratings').findOne({ userId: data.userId });
        expect(response.status).toBe(httpStatus.CREATED);

        expect(ratings).toEqual(
          expect.objectContaining({
            _id: expect.any(ObjectId),
            userId: data.userId,
            name: body.name,
            email: body.email,
            environmentRate: 5,
            foodRate: 4,
            beverageRate: 5,
            pricesRate: 4,
            serviceRate: 5,
            userNote: body.userNote,
            createdAt: expect.any(Date),
          }),
        );
      });

      it('should save rating body on db', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const body = generateCompleteRating(5);

        await server.post('/api/ratings').set('Authorization', `Bearer ${data.token}`).send(body);

        const ratings = await mongoDB.collection('ratings').findOne({ userId: data.userId });

        expect(ratings).toEqual(
          expect.objectContaining({
            _id: expect.any(ObjectId),
            userId: expect.any(Number),
            name: ratings.name,
            email: ratings.email,
            environmentRate: ratings.environmentRate,
            foodRate: ratings.foodRate,
            beverageRate: ratings.beverageRate,
            pricesRate: ratings.pricesRate,
            serviceRate: ratings.serviceRate,
            userNote: ratings.userNote,
            createdAt: expect.any(Date),
          }),
        );
      });
    });
  });
});

describe('GET /api/ratings', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.get('/api/ratings');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.get('/api/ratings').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.get('/api/ratings').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 401 if user role isnt ADMIN', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.get('/api/ratings').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when user is admin', () => {
      it('should respond with status 200', async () => {
        const adminData = await generateAdminTokenAndSession(faker.name.firstName());

        const response = await server.get('/api/ratings').set('Authorization', `Bearer ${adminData.token}`);

        expect(response.status).toBe(httpStatus.OK);
      });

      it('should respond with status 200 and return empty array, if there is no order', async () => {
        const adminData = await generateAdminTokenAndSession(faker.name.firstName());
        await generateTokenAndSession(faker.name.firstName());

        const response = await server.get('/api/ratings').set('Authorization', `Bearer ${adminData.token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual([]);
      });

      it('should respond with status 200 and return orders array, when has 1 or more PREPARING orders', async () => {
        const adminData = await generateAdminTokenAndSession(faker.name.firstName());
        const clientData = await generateTokenAndSession(faker.name.firstName());
        await ratingsFactory.createSomeRatings(clientData.userId);

        const response = await server.get('/api/ratings').set('Authorization', `Bearer ${adminData.token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              userId: clientData.userId,
              name: expect.any(String),
              email: expect.any(String),
              environmentRate: expect.any(Number),
              foodRate: expect.any(Number),
              beverageRate: expect.any(Number),
              pricesRate: expect.any(Number),
              serviceRate: expect.any(Number),
              userNote: expect.any(String),
            }),
          ]),
        );
      });
    });
  });
});
