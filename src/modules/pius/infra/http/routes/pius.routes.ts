import ensureAuthenticated from '@shared/infra/http/middleware/ensureAuthenticated';
import validateRequestSchema from '@shared/infra/http/middleware/validateRequestSchema';
import { Router } from 'express';
import { param } from 'express-validator';
import PiusController from '../controller/PiusController';
import createPiuSchema from '../schemas/createPiuSchema';

const piusRoutes = Router();

const piuController = new PiusController();

piusRoutes.use(ensureAuthenticated);

piusRoutes.post('/',
  createPiuSchema,
  validateRequestSchema,
  piuController.create);

piusRoutes.get('/', piuController.list);

piusRoutes.get('/:id',
  param('id').isUUID(),
  validateRequestSchema,
  piuController.findById);

piusRoutes.put('/:id',
  param('id').isUUID(),
  createPiuSchema,
  validateRequestSchema,
  piuController.update);

piusRoutes.delete('/:id',
  param('id').isUUID(),
  validateRequestSchema,
  piuController.delete);

piusRoutes.patch('/like/:id',
  param('id').isUUID(),
  validateRequestSchema,
  piuController.like);

export default piusRoutes;
