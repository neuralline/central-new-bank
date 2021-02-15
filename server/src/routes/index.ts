import { Router } from 'express';
import accountsRouter from './accounts-route';
import paymentsRoute from './payments-route';
import usersRouter from './users-route';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/accounts', accountsRouter);
routes.use('/payments', paymentsRoute);
export default routes;
