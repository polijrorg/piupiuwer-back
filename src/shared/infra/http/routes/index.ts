import { Router } from 'express';

// Users
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import piusRoutes from '@modules/pius/infra/http/routes/pius.routes';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const routes = Router();

// Users
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

// Pius
routes.use('/pius', ensureAuthenticated, piusRoutes);

export default routes;
