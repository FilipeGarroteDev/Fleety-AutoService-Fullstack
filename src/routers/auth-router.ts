import express from 'express';
import validateSchema from '@/middlewares/schemas-middleware';
import { SignInSchema, AdminCredentialsSchema } from '@/schemas/auth-schemas';
import {  signIn, validateTokenAndGetUserData, adminSignIn } from '@/controllers/auth-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';

const authRouter = express.Router();

authRouter
  .post('/signin', validateSchema(SignInSchema), signIn)
  .post('/admin/signin', validateSchema(AdminCredentialsSchema), adminSignIn)
  .all('/*', authTokenMiddleware)
  .get('/validate', validateTokenAndGetUserData);

export default authRouter;
