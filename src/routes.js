import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import AppointmentController from './app/controllers/AppointmentController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/appointment', AppointmentController.store);

export default routes;
