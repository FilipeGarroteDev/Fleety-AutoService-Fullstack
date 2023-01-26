import app, { init } from '@/app';
import httpStatus from 'http-status';
import supertest from 'supertest';
import foodsMenuFactory from '../factory/foodsMenu-factory';
import { cleanDb } from '../utils';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /menu/:productType', () => {
  it('should respond with status 404, if query string doesnt match with Category entities', async () => {
    await foodsMenuFactory.createFoodType();

    const response = await server.get('/menu/unknown');
    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });
});
