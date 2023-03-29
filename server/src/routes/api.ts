import express, { type Router } from 'express'
import userRouter from './users.js'
import carRouter from './cars.js'
import dealershipRouter from './dealerships.js'
import messageRouter from './messages.js'
import orderRouter from './orders.js'
import paymentRouter from './payments.js'
import authRouter from './auth.js'
const apiRouter: Router = express.Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/cars', carRouter)
apiRouter.use('/dealerships', dealershipRouter)
apiRouter.use('/messages', messageRouter)
apiRouter.use('/orders', orderRouter)
apiRouter.use('/payments', paymentRouter)
apiRouter.use('/', authRouter)

export default apiRouter
