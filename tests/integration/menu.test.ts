import app, { init } from '@/app';
import httpStatus from 'http-status';
import supertest from 'supertest';
import menuFactory from '../factory/menu-factory';
import foodsMenuFactory from '../factory/menu-factory';
import { cleanDb } from '../utils';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /foods/categories', () => {
  it('should respond with status 400, if params doesnt match with product type name', async () => {
    const response = await server.get('/menu/unknown');

    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 404, if there is no category registered', async () => {
    await menuFactory.createFoodType();
    const response = await server.get('/menu/foods');

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it('should respond with status 200 and categories array', async () => {
    const type = await menuFactory.createFoodType();
    await menuFactory.createCategories(type.id);
    const response = await server.get('/menu/foods');

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
