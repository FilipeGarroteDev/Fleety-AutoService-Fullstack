import joi from 'joi';

const OrdersBodySchema = joi.object({
  ticketId: joi.number().required(),
  productId: joi.number().required(),
  totalValue: joi.number().required(),
  optionals: joi.string().allow(''),
  status: joi.string().valid('SELECTED', 'PREPARING', 'DELIVERED').required(),
  amount: joi.number().required(),
});

export { OrdersBodySchema };
