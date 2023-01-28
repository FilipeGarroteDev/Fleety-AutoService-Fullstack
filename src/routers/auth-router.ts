import express from 'express';
import validateSchema from '@/middlewares/schemas-middleware';
import { SignUpSchema, SignInSchema } from '@/schemas/auth-schemas';
import { signUp, signIn, validateTokenAndGetUserData } from '@/controllers/auth-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';

const authRouter = express.Router();

authRouter
  .post('/signup', validateSchema(SignUpSchema), signUp)
  .post('/signin', validateSchema(SignInSchema), signIn)
  .get('/validate', authTokenMiddleware, validateTokenAndGetUserData);

export default authRouter;
