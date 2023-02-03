import express from 'express';
import validateSchema from '@/middlewares/schemas-middleware';
import { RegisterBodySchema, SignInSchema, AdminCredentialsSchema } from '@/schemas/auth-schemas';
import { registerNewUser, signIn, validateTokenAndGetUserData, adminSignIn, listAllActiveUsers } from '@/controllers/auth-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';

const authRouter = express.Router();

authRouter
  .post('/signin', validateSchema(SignInSchema), signIn)
  .post('/admin/signin', validateSchema(AdminCredentialsSchema), adminSignIn)
  .all('/*', authTokenMiddleware)
  .post('/admin/register', validateSchema(RegisterBodySchema), registerNewUser)
  .get('/admin/users', listAllActiveUsers)
  .get('/validate', validateTokenAndGetUserData);

export default authRouter;
