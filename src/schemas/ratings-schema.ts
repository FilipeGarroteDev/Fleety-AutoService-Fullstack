import joi from 'joi';

const RatingsSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  environmentRate: joi.number().min(1).max(5),
  foodRate: joi.number().min(1).max(5),
  beverageRate: joi.number().min(1).max(5),
  pricesRate: joi.number().min(1).max(5),
  serviceRate: joi.number().min(1).max(5),
  userNote: joi.string().allow(null, ''),
});

export { RatingsSchema };
