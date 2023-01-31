import app, { init } from '@/app';
import { prisma } from '@/config';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import authFactory from '../factory/auth-factory';
import categoriesFactory from '../factory/categories-factory';
import ordersFactory from '../factory/orders-factory';
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
      status: 'SELECTED',
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

    it('should respond with status 422 if order status isnt SELECTED, PREPARING or DELIVERED', async () => {
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
        status: 'SELECTED',
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
            status: 'SELECTED',
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

describe('GET /chart/:ticketId', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.get('/chart/1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.get('/chart/1').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.get('/chart/1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 422 if ticketId has invalid format', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.get('/chart/unknown').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 404 if there is no ticket with given id', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      await ticketsFactory.createReservedTicket(data.userId);

      const response = await server.get('/chart/999999999').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    describe('when ticket is valid', () => {
      it('should respond with status 200', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);

        const response = await server.get(`/chart/${ticket.id}`).set('Authorization', `Bearer ${data.token}`);

        expect(response.status).toBe(httpStatus.OK);
      });

      it('should respond with status 200 and return empty array, if there is no order', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);

        const response = await server.get(`/chart/${ticket.id}`).set('Authorization', `Bearer ${data.token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body.length).toBe(0);
      });

      it('should respond with status 200 and return empty array, if there is no order', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        await productsFactory.createSingleProduct(category.id);

        const response = await server.get(`/chart/${ticket.id}`).set('Authorization', `Bearer ${data.token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body.length).toBe(0);
      });

      it('should respond with status 200 and return empty array, if doesnt have order with given ticket id', async () => {
        const firstUserData = await generateTokenAndSession(faker.name.firstName());
        const secondUserData = await generateTokenAndSession(faker.name.firstName());

        const firstTicketData = await ticketsFactory.createReservedTicket(firstUserData.userId);
        const secondTicketData = await ticketsFactory.createReservedTicket(secondUserData.userId);

        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        const product = await productsFactory.createSingleProduct(category.id);
        await ordersFactory.createOrderInAnotherTicket(secondTicketData.id, product.id);

        const response = await server
          .get(`/chart/${firstTicketData.id}`)
          .set('Authorization', `Bearer ${firstUserData.token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body.length).toBe(0);
      });

      it('should respond with status 200 and return empty array, if doesnt have order with status SELECTED', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        const product = await productsFactory.createSingleProduct(category.id);
        await ordersFactory.createDeliveredAndPreparingOrders(ticket.id, product.id);

        const response = await server.get(`/chart/${ticket.id}`).set('Authorization', `Bearer ${data.token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body.length).toBe(0);
      });

      it('should respond with status 200 and return orders array, when has 1 or more orders in the given ticketId', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        const product = await productsFactory.createSingleProduct(category.id);
        await ordersFactory.createSelectedAndPreparingOrders(ticket.id, product.id);

        const response = await server.get(`/chart/${ticket.id}`).set('Authorization', `Bearer ${data.token}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              ticketId: ticket.id,
              productId: product.id,
              totalValue: expect.any(Number),
              amount: expect.any(Number),
              optionals: expect.any(String),
              status: 'SELECTED',
              createdAt: expect.any(String),
              Product: expect.objectContaining({
                id: product.id,
                name: product.name,
                image: product.image,
              }),
            }),
          ]),
        );
      });
    });
  });
});

describe('DELETE /chart/:orderId', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.delete('/chart/1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.delete('/chart/1').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.delete('/chart/1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 422 if orderId has invalid format', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.delete('/chart/unknown').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 404 if there is no order with given id', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      await ticketsFactory.createReservedTicket(data.userId);

      const response = await server.delete('/chart/999999999').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with status 401 if the order doesnt belong to the user ', async () => {
      const firstUserData = await generateTokenAndSession(faker.name.firstName());
      const secondUserData = await generateTokenAndSession(faker.name.firstName());

      await ticketsFactory.createReservedTicket(firstUserData.userId);
      const secondTicketData = await ticketsFactory.createReservedTicket(secondUserData.userId);

      const foodType = await categoriesFactory.createFoodType();
      const category = await categoriesFactory.createSingleCategory(foodType.id);
      const product = await productsFactory.createSingleProduct(category.id);
      const order = await ordersFactory.createOrderInAnotherTicket(secondTicketData.id, product.id);

      const response = await server.delete(`/chart/${order.id}`).set('Authorization', `Bearer ${firstUserData.token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when order is valid', () => {
      it('should respond with status 200', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        const product = await productsFactory.createSingleProduct(category.id);
        const order = await ordersFactory.createOrderInAnotherTicket(ticket.id, product.id);

        const response = await server.delete(`/chart/${order.id}`).set('Authorization', `Bearer ${data.token}`);

        expect(response.status).toBe(httpStatus.OK);
      });

      it('should delete order from db', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        const product = await productsFactory.createSingleProduct(category.id);
        const order = await ordersFactory.createOrderInAnotherTicket(ticket.id, product.id);

        const response = await server.delete(`/chart/${order.id}`).set('Authorization', `Bearer ${data.token}`);

        const deletedOrder = await prisma.orders.findUnique({
          where: {
            id: order.id,
          },
        });

        expect(response.status).toBe(httpStatus.OK);
        expect(deletedOrder).toBeNull();
      });
    });
  });
});
