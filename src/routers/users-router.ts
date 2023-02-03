import express from 'express';
import validateSchema from '@/middlewares/schemas-middleware';
import { RegisterBodySchema } from '@/schemas/auth-schemas';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import { listAllActiveUsers, registerNewUser } from '@/controllers/users-controller';

const usersRouter = express.Router();

usersRouter
  .all('/*', authTokenMiddleware)
  .post('/register', validateSchema(RegisterBodySchema), registerNewUser)
  .get('/list', listAllActiveUsers);

export default usersRouter;
