import app, { init } from '@/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import categoriesFactory from '../factory/categories-factory';
import productsFactory from '../factory/products-factory';
import usersFactory from '../factory/users-factory';
import { cleanDb, generateTokenAndSession, generateValidToken } from '../utils';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /products/category/:categoryId', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.get('/products/category/1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await usersFactory.createUserByName('Mesa 13', '123456');
    const response = await server.get('/products/category/1').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await usersFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.get('/products/category/1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 422, if params is invalid', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      const response = await server.get('/products/category/unknown').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 404, if there is no category in database with given id', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      await categoriesFactory.createFoodType();

      const response = await server.get('/products/category/99999999').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and category products array', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      const type = await categoriesFactory.createFoodType();
      await categoriesFactory.createCategories(type.id);
      const categories = await categoriesFactory.getCategoriesIds();
      await productsFactory.createProductsOnDiffCategory(categories[0].id, categories[1].id);

      const response = await server.get(`/products/category/${categories[0].id}`).set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body.length).toBe(3);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            value: expect.any(Number),
            image: expect.any(String),
            categoryId: categories[0].id,
          }),
        ]),
      );
    });
  });
});

describe('GET /products/:productId', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.get('/products/1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await usersFactory.createUserByName('Mesa 13', '123456');
    const response = await server.get('/products/1').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await usersFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.get('/products/1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 422, if params is invalid', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      const response = await server.get('/products/unknown').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 404, if there is no product in database with given id', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      const type = await categoriesFactory.createFoodType();
      await categoriesFactory.createCategories(type.id);

      const response = await server.get('/products/99999999').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and product data with optionals array', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      const type = await categoriesFactory.createFoodType();
      await categoriesFactory.createCategories(type.id);
      const categories = await categoriesFactory.getCategoriesIds();
      await productsFactory.createOptionals();
      const optionals = await productsFactory.findOptionals();
      await productsFactory.populeOptionalsCategoryTable(optionals, categories[0].id, categories[1].id);
      const product = await productsFactory.createSingleProduct(categories[0].id);

      const response = await server.get(`/products/${product.id}`).set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body.Optionals.length).toBe(3);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: product.id,
          name: expect.any(String),
          description: expect.any(String),
          value: expect.any(Number),
          image: expect.any(String),
          categoryId: categories[0].id,
          Optionals: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              value: expect.any(Number),
            }),
          ]),
        }),
      );
    });
  });
});
