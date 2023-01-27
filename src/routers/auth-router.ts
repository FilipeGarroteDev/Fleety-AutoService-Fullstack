import express from 'express';
import validateSchema from '@/middlewares/schemas-middleware';
import { SignUpSchema, SignInSchema } from '@/schemas/auth-schemas';
import { signUp, signIn } from '@/controllers/auth-controller';

const authRouter = express.Router();

authRouter
  .post('/signup', validateSchema(SignUpSchema), signUp)
  .post('/signin', validateSchema(SignInSchema), signIn);

export default authRouter;
