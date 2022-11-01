import validateRequestSchema from '@shared/infra/http/middleware/validateRequestSchema';
import { Router } from 'express';
import { param } from 'express-validator';
import FavoritesController from '../controller/FavoriteController';

const favoritesRoutes = Router();

const favoriteController = new FavoritesController();

favoritesRoutes.patch('/favorite/:id',
  param('id').isUUID(),
  validateRequestSchema,
  favoriteController.favorite);

favoritesRoutes.patch('/unfavorite/:id',
  param('id').isUUID(),
  validateRequestSchema,
  favoriteController.unfavorite);

export default favoritesRoutes;
