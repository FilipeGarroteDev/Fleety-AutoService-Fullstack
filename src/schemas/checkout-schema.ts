import joi from 'joi';

const CheckoutBodySchema = joi.object({
  ticketId: joi.number().required(),
  status: joi.string().valid('PREPARING', 'DELIVERED').required(),
});

export { CheckoutBodySchema };
