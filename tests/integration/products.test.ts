import app, { init } from '@/app';
import httpStatus from 'http-status';
import supertest from 'supertest';
import categoriesFactory from '../factory/categories-factory';
import productsFactory from '../factory/products-factory';
import { cleanDb } from '../utils';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /products/category/:categoryId', () => {
  it('should respond with status 422, if params is invalid', async () => {
    const response = await server.get('/products/category/unknown');

    expect(response.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should respond with status 404, if there is no category in database with given id', async () => {
    await categoriesFactory.createFoodType();
    const response = await server.get('/products/category/999999');

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it('should respond with status 200 and category products array', async () => {
    const type = await categoriesFactory.createFoodType();
    await categoriesFactory.createCategories(type.id);
    const categories = await categoriesFactory.getCategoriesIds();
    await productsFactory.createProductsOnDiffCategory(categories[0].id, categories[1].id);
    const response = await server.get(`/products/category/${categories[0].id}`);

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body.length).toEqual(3);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          value: expect.any(Number),
          image: expect.any(String),
          categoryId: expect.any(Number),
        }),
      ]),
    );
  });
});

// describe('GET /menu/category/:categoryId', () => {
//   it('should respond with status 400, if params doesnt match with product type name', async () => {
//     const response = await server.get('/menu/unknown');

//     expect(response.status).toEqual(httpStatus.BAD_REQUEST);
//   });

//   it('should respond with status 404, if there is no category registered', async () => {
//     await categoriesFactory.createFoodType();
//     const response = await server.get('/menu/foods');

//     expect(response.status).toEqual(httpStatus.NOT_FOUND);
//   });

//   it('should respond with status 200 and categories array', async () => {
//     const type = await categoriesFactory.createFoodType();
//     await categoriesFactory.createCategories(type.id);
//     const response = await server.get('/menu/foods');

//     expect(response.status).toEqual(httpStatus.OK);
//     expect(response.body).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({
//           id: expect.any(Number),
//           name: expect.any(String),
//           image: expect.any(String),
//           typeId: expect.any(Number),
//         }),
//       ]),
//     );
//   });
// });
