import app, { init } from '@/app';
import { prisma } from '@/config';
import faker from '@faker-js/faker';
import { OrderStatus } from '@prisma/client';
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

describe('PATCH /checkout', () => {
  it('should respond with status 401 when headers isnt given', async () => {
    const response = await server.patch('/checkout');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if token isnt given', async () => {
    await authFactory.createUserByName('Mesa 13', '123456');
    const response = await server.patch('/checkout').set('Authorization', '');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401, if there is no active session with the given token', async () => {
    const user = await authFactory.createUserByName('Mesa 13', '123456');
    const token = generateValidToken(user.id);
    const response = await server.patch('/checkout').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    const generateInvalidCheckout = (ticketId: number) => ({
      ticketId,
      status: faker.lorem.word(),
    });

    it('should respond with status 422 if there is no body given', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server.patch('/checkout').set('Authorization', `Bearer ${data.token}`);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422 if body is invalid', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());

      const response = await server
        .patch('/checkout')
        .set('Authorization', `Bearer ${data.token}`)
        .send({ ticketId: faker.datatype.number(), unknown: faker.lorem.word() });

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422 if order status isnt PREPARING or DELIVERED', async () => {
      const data = await generateTokenAndSession(faker.name.firstName());
      const ticket = await ticketsFactory.createReservedTicket(data.userId);
      const body = generateInvalidCheckout(ticket.id);

      const response = await server.patch('/checkout').set('Authorization', `Bearer ${data.token}`).send(body);

      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    describe('when body is valid', () => {
      const generateValidCheckout = (ticketId: number) => ({
        ticketId,
        status: 'PREPARING',
      });

      it('should respond with status 404 if there is no ticket with given id', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        await ticketsFactory.createReservedTicket(data.userId);
        const body = generateValidCheckout(999999999);

        const response = await server.patch('/checkout').set('Authorization', `Bearer ${data.token}`).send(body);

        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });

      it('should respond with status 400 if there is no orders in the given ticket', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        await productsFactory.createSingleProduct(category.id);
        const body = generateValidCheckout(ticket.id);

        const response = await server.patch('/checkout').set('Authorization', `Bearer ${data.token}`).send(body);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });

      it('should respond with status 400 if there is no SELECTED orders in the given ticket', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        const product = await productsFactory.createSingleProduct(category.id);
        await ordersFactory.createManyDeliveredOrders(ticket.id, product.id);
        const body = generateValidCheckout(ticket.id);

        const response = await server.patch('/checkout').set('Authorization', `Bearer ${data.token}`).send(body);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });

      it('should respond with status 200 checkout is successful', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        const product = await productsFactory.createSingleProduct(category.id);
        await ordersFactory.createManySelectedOrders(ticket.id, product.id);
        const body = generateValidCheckout(ticket.id);

        const response = await server.patch('/checkout').set('Authorization', `Bearer ${data.token}`).send(body);

        expect(response.status).toBe(httpStatus.OK);
      });

      it('should update order status to PREPARING on db', async () => {
        const data = await generateTokenAndSession(faker.name.firstName());
        const ticket = await ticketsFactory.createReservedTicket(data.userId);
        const foodType = await categoriesFactory.createFoodType();
        const category = await categoriesFactory.createSingleCategory(foodType.id);
        const product = await productsFactory.createSingleProduct(category.id);
        await ordersFactory.createManySelectedOrders(ticket.id, product.id);
        const body = generateValidCheckout(ticket.id);

        const response = await server.patch('/checkout').set('Authorization', `Bearer ${data.token}`).send(body);

        const storedPreparingOrders = await prisma.orders.findMany({
          where: {
            status: OrderStatus.PREPARING,
          },
        });

        expect(response.status).toBe(httpStatus.OK);
        expect(storedPreparingOrders).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              ticketId: ticket.id,
              productId: product.id,
              totalValue: expect.any(Number),
              amount: expect.any(Number),
              optionals: expect.any(String),
              status: 'PREPARING',
              createdAt: expect.any(Date),
            }),
          ]),
        );
      });
    });
  });
});
