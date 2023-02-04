import app, { init } from '@/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import categoriesFactory from '../factory/categories-factory';
import usersFactory from '../factory/users-factory';
import { cleanDb, generateTokenAndSession, generateValidToken } from '../utils';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /categories/:productType', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.get('/categories/1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await usersFactory.createUserByName('Mesa 13', '123456');
    const response = await server.get('/categories/1').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await usersFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.get('/categories/1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400, if params doesnt match with product type name', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      const response = await server.get('/categories/unknown').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 404, if there is no category registered', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      await categoriesFactory.createFoodType();
      const response = await server.get('/categories/foods').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and categories array', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      const type = await categoriesFactory.createFoodType();
      await categoriesFactory.createCategories(type.id);
      const response = await server.get('/categories/foods').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            image: expect.any(String),
            typeId: expect.any(Number),
          }),
        ]),
      );
    });
  });
});
