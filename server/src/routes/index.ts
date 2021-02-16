import {Router} from 'express'
import accountsRouter from './accounts-route'
import authRoutes from './auth'
import paymentsRoute from './payments-route'
import usersRouter from './users-route'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/accounts', accountsRouter)
routes.use('/payments', paymentsRoute)
routes.use('/', authRoutes)
export default routes
