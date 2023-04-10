import express, { type Router } from 'express'
import type OrderController from '../controllers/interfaces/order-controller.js'
import OrderControllerImpl from '../controllers/order-controller.js'
const orderRouter: Router = express.Router()

const orderController: OrderController = new OrderControllerImpl()

orderRouter.get('/', orderController.listAllOrder)
orderRouter.get('/:id', orderController.getOrder)

export default orderRouter
