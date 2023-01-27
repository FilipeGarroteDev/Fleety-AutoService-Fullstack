import app, { init } from '@/app';
import httpStatus from 'http-status';
import supertest from 'supertest';
import categoriesFactory from '../factory/categories-factory';
import { cleanDb } from '../utils';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /categories/:productType', () => {
  it('should respond with status 400, if params doesnt match with product type name', async () => {
    const response = await server.get('/categories/unknown');

    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 404, if there is no category registered', async () => {
    await categoriesFactory.createFoodType();
    const response = await server.get('/categories/foods');

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it('should respond with status 200 and categories array', async () => {
    const type = await categoriesFactory.createFoodType();
    await categoriesFactory.createCategories(type.id);
    const response = await server.get('/categories/foods');

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
