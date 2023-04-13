import express, { type Router } from 'express'
import PaymentControllerImpl from '../controllers/payment-controller.js'
import type PaymentController from '../controllers/interfaces/payment-controller.js'
const paymentRouter: Router = express.Router()

const paymentController: PaymentController = new PaymentControllerImpl()

paymentRouter.post('/', paymentController.addPayment)
paymentRouter.get('/', paymentController.listAllPayments)
paymentRouter.get('/:id', paymentController.getPayment)
paymentRouter.delete('/:id', paymentController.deletePayment)

export default paymentRouter
