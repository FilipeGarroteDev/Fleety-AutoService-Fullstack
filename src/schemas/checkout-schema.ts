import joi from 'joi';

const CheckoutBodySchema = joi.object({
  ticketId: joi.number().required(),
  status: joi.string().valid('PREPARING', 'DELIVERED').required(),
});

const PaymentBodySchema = joi.object({
  totalValue: joi.number().required(),
  firstName: joi.string().required(),
  cardIssuer: joi.string().valid('MASTERCARD', 'VISA').required(),
  cardLastDigits: joi.string().min(4).max(4).required(),
});

export { CheckoutBodySchema, PaymentBodySchema };
