import validateRequestSchema from '@shared/infra/http/middleware/validateRequestSchema';
import { Router } from 'express';
import { param } from 'express-validator';
import FollowController from '../controller/FollowController';

const followRoutes = Router();

const followController = new FollowController();

followRoutes.patch('/follow/:followingId', param('followingId').isUUID(), validateRequestSchema, followController.follow);

followRoutes.patch('/unfollow/:followingId', param('followingId').isUUID(), validateRequestSchema, followController.unfollow);

export default followRoutes;
