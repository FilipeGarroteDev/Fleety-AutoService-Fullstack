import joi from 'joi';

const OrdersBodySchema = joi.object({
  ticketId: joi.number().required(),
  productId: joi.number().required(),
  totalValue: joi.number().required(),
  optionals: joi.string(),
  status: joi.string().valid('ORDERED', 'DELIVERED').required(),
  amount: joi.number().required(),
});

export { OrdersBodySchema };
