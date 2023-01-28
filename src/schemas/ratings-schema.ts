import joi from 'joi';

const RatingsSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  environmentRate: joi.number().min(1).max(5).required(),
  foodRate: joi.number().min(1).max(5).required(),
  beverageRate: joi.number().min(1).max(5).required(),
  pricesRate: joi.number().min(1).max(5).required(),
  serviceRate: joi.number().min(1).max(5).required(),
  userNote: joi.string().allow(null, ''),
});

export { RatingsSchema };
