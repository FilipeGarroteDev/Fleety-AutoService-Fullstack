import app, { init } from '@/app';
import { prisma } from '@/config';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import authFactory from '../factory/auth-factory';
import { cleanDb, generateTokenAndSession, generateValidToken } from '../utils';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /ratings', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.post('/ratings');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.post('/ratings').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.post('/ratings').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    const generateRatingBody = (userRating: number) => ({
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
      const token = await generateTokenAndSession(faker.name.firstName());

      const response = await server.post('/ratings').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422 if body is invalid', async () => {
      const token = await generateTokenAndSession(faker.name.firstName());

      const response = await server
        .post('/ratings')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: faker.name.firstName(), unknown: faker.lorem.word() });

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422 if user rating is less then one', async () => {
      const token = await generateTokenAndSession(faker.name.firstName());
      const body = generateRatingBody(0);

      const response = await server.post('/ratings').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422 if user rating is more then 5', async () => {
      const token = await generateTokenAndSession(faker.name.firstName());
      const body = generateRatingBody(7);

      const response = await server.post('/ratings').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    describe('when body is valid', () => {
      it('should respond with status 200, if user rating is a number between 1 and 5', async () => {
        const token = await generateTokenAndSession(faker.name.firstName());
        const body = generateRatingBody(5);
        const response = await server.post('/ratings').set('Authorization', `Bearer ${token}`).send(body);

        expect(response.status).toBe(httpStatus.OK);
      });

      it('should save rating body on db', async () => {
        const token = await generateTokenAndSession(faker.name.firstName());
        const body = generateRatingBody(5);

        const response = await server.post('/ratings').set('Authorization', `Bearer ${token}`).send(body);

        const storedRating = await prisma.ratings.findMany({});

        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            userId: expect.any(Number),
            name: storedRating[0].name,
            email: storedRating[0].email,
            environmentRate: storedRating[0].environmentRate,
            foodRate: storedRating[0].foodRate,
            beverageRate: storedRating[0].beverageRate,
            pricesRate: storedRating[0].pricesRate,
            serviceRate: storedRating[0].serviceRate,
            userNote: storedRating[0].userNote,
            createdAt: expect.any(String),
          }),
        );
      });
    });
  });
});
