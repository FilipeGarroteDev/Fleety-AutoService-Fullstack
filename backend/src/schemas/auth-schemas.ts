import joi from 'joi';

const RegisterBodySchema = joi.object({
  role: joi.string().valid('CLIENT', 'ADMIN').required(),
  password: joi.string().required(),
  name: joi.string().required(),
  email: joi.string().allow(''),
  image: joi.string().allow(''),
  restaurantSecretKey: joi.string().required(),
});

const SignInSchema = joi.object({
  password: joi.string().required(),
  name: joi.string().required(),
});

const AdminCredentialsSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  image: joi.string().required(),
  restaurantSecretKey: joi.string().required(),
});

export { RegisterBodySchema, SignInSchema, AdminCredentialsSchema };
