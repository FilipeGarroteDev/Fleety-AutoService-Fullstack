import app, { init } from '@/app';
import { prisma } from '@/config';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import authFactory from '../factory/auth-factory';
import categoriesFactory from '../factory/categories-factory';
import productsFactory from '../factory/products-factory';
import ticketsFactory from '../factory/tickets-factory';
import { cleanDb, generateTokenAndSession, generateValidToken } from '../utils';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /chart/add', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.post('/chart/add');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.post('/chart/add').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.post('/chart/add').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    const generateCompleteOrder = (ticketId: number, productId: number) => ({
      ticketId,
      productId,
      totalValue: faker.datatype.number(),
      optionals: faker.lorem.words(8),
      status: 'ORDERED',
      amount: faker.datatype.number({ max: 10 }),
    });
    it('should respond with status 422 if there is no body given', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.post('/chart/add').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422 if body is invalid', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server
        .post('/chart/add')
        .set('Authorization', `Bearer ${data.token}`)
        .send({ totalValue: faker.datatype.number(), unknown: faker.lorem.word() });

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422 if order status isnt ORDERED or DELIVERED', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      const ticket = await ticketsFactory.createReservedTicket(data.userId);
      const foodType = await categoriesFactory.createFoodType();
      const category = await categoriesFactory.createSingleCategory(foodType.id);
      const product = await productsFactory.createSingleProduct(category.id);
      const body = generateCompleteOrder(ticket.id, product.id);

      const response = await server
        .post('/chart/add')
        .set('Authorization', `Bearer ${data.token}`)
        .send({ ...body, status: 'unknown' });

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    describe('when body is valid', () => {
      const generateWithoutOptionals = (ticketId: number, productId: number) => ({
        ticketId,
        productId,
        totalValue: faker.datatype.number(),
        status: 'ORDERED',
        amount: faker.datatype.number({ max: 10 }),
      });

      it('should respond with status 404, if there is no ticket with given ticket id', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        const product = await productsFactory.createSingleProduct(category.id);
        const body = generateCompleteOrder(0, product.id);

        const response = await server.post('/chart/add').set('Authorization', `Bearer ${data.token}`).send(body);

        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });

      it('should respond with status 404, if there is no product with given product id', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        await productsFactory.createSingleProduct(category.id);
        const body = generateCompleteOrder(ticket.id, 0);

        const response = await server.post('/chart/add').set('Authorization', `Bearer ${data.token}`).send(body);

        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });

      it('should respond with status 201, if there is no optionals in the order', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        const product = await productsFactory.createSingleProduct(category.id);
        const body = generateWithoutOptionals(ticket.id, product.id);

        const response = await server.post('/chart/add').set('Authorization', `Bearer ${data.token}`).send(body);

        expect(response.status).toBe(httpStatus.CREATED);
      });

      it('should respond with status 201 and return order object', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        const product = await productsFactory.createSingleProduct(category.id);
        const body = generateCompleteOrder(ticket.id, product.id);

        const response = await server.post('/chart/add').set('Authorization', `Bearer ${data.token}`).send(body);

        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            ticketId: ticket.id,
            productId: product.id,
            totalValue: body.totalValue,
            amount: body.amount,
            optionals: body.optionals,
            status: 'ORDERED',
            createdAt: expect.any(String),
          }),
        );
      });

      it('should save order on db', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        const product = await productsFactory.createSingleProduct(category.id);
        const body = generateCompleteOrder(ticket.id, product.id);

        const response = await server.post('/chart/add').set('Authorization', `Bearer ${data.token}`).send(body);

        const order = await prisma.orders.findFirst({});

        expect(order).toEqual(
          expect.objectContaining({
            id: response.body.id,
            ticketId: response.body.ticketId,
            productId: response.body.productId,
            totalValue: response.body.totalValue,
            amount: response.body.amount,
            optionals: response.body.optionals,
            status: response.body.status,
            createdAt: expect.any(Date),
          }),
        );
      });
    });
  });
});
