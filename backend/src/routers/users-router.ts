import express from 'express';
import validateSchema from '@/middlewares/schemas-middleware';
import { RegisterBodySchema } from '@/schemas/auth-schemas';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import { deleteUser, listAllActiveUsers, registerNewUser } from '@/controllers/users-controller';

const usersRouter = express.Router();

usersRouter
  .all('/*', authTokenMiddleware)
  .post('/register', validateSchema(RegisterBodySchema), registerNewUser)
  .get('/list', listAllActiveUsers)
  .delete('/:userId', deleteUser);

export default usersRouter;
