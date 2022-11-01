import validateRequestSchema from '@shared/infra/http/middleware/validateRequestSchema';
import { Router } from 'express';
import { param } from 'express-validator';
import FollowsController from '../controller/FollowsController';

const followsRoutes = Router();

const followsController = new FollowsController();

followsRoutes.patch('/follow/:followingId', param('followingId').isUUID(), validateRequestSchema, followsController.follow);

followsRoutes.patch('/unfollow/:followingId', param('followingId').isUUID(), validateRequestSchema, followsController.unfollow);

export default followsRoutes;
