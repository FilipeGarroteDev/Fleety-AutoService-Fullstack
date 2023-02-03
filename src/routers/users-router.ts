import express from 'express';
import validateSchema from '@/middlewares/schemas-middleware';
import { RegisterBodySchema } from '@/schemas/auth-schemas';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import { listAllActiveUsers, registerNewUser } from '@/controllers/users-controller';

const authRouter = express.Router();

authRouter
  .all('/*', authTokenMiddleware)
  .post('/admin/register', validateSchema(RegisterBodySchema), registerNewUser)
  .get('/admin/users', listAllActiveUsers);

export default authRouter;
