import express, { type Router } from 'express'
import type OrderController from '../controllers/interfaces/order-controller.js'
import OrderControllerImpl from '../controllers/order-controller.js'
const orderRouter: Router = express.Router()

const orderController: OrderController = new OrderControllerImpl()

orderRouter.post('/', orderController.addOrder)
orderRouter.get('/', orderController.getAllOrders)
orderRouter.get('/:id', orderController.getOrder)
orderRouter.put('/:id', orderController.updateOrder)
orderRouter.delete('/:id', orderController.deleteOrder)

export default orderRouter
