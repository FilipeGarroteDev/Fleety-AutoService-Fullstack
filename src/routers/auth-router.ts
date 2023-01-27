import express from 'express';
import validateSchema from '@/middlewares/tokenAuth-middleware';
import { SignUpSchema } from '@/schemas/auth-schemas';
import { signUp } from '@/controllers/auth-controller';

const authRouter = express.Router();

authRouter.post('/signup', validateSchema(SignUpSchema), signUp);

export default authRouter;
