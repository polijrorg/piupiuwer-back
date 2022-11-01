import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import validateRequestSchema from '@shared/infra/http/middleware/validateRequestSchema';
import { Router } from 'express';
import { param } from 'express-validator';
import UserController from '../controller/UsersController';

import registerSchema from '../schemas/registerSchema';
import followRoutes from './follow.routes';

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.post('/register',
  registerSchema,
  validateRequestSchema,
  userController.create);

usersRoutes.use(ensureAuthenticated);

usersRoutes.get('/', userController.list);

usersRoutes.get('/:id',
  param('id').isUUID(),
  userController.findById);

usersRoutes.use('/', followRoutes);

export default usersRoutes;
