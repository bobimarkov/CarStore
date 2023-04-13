import { type Request, type Response, type NextFunction } from 'express'
import type OrderController from './interfaces/order-controller.js'
import type OrderService from '../services/interfaces/order-service.js'
import OrderServiceImpl from '../services/order-service.js'

class OrderControllerImpl implements OrderController {
  private readonly orderService: OrderService

  constructor () {
    this.orderService = new OrderServiceImpl()
  }

  addOrder = (req: Request, res: Response, next: NextFunction): void => {
    this.orderService.addOrder(req.body).then(order => {
      // TODO: Location header with the path to the new resource when 201
      res.status(201).json(order.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  updateOrder = (req: Request, res: Response, next: NextFunction): void => {
    this.orderService.updateOrder(req.params.id, req.body).then(order => {
      res.json(order.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  deleteOrder = (req: Request, res: Response, next: NextFunction): void => {
    this.orderService.deleteOrder(req.params.id).then(order => {
      res.json(order.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  getOrder = (req: Request, res: Response, next: NextFunction): void => {
    this.orderService.getOrder(req.params.id).then(order => {
      res.json(order)
    }).catch(error => {
      next(error)
    })
  }

  listAllOrder = (_req: Request, res: Response, next: NextFunction): void => {
    this.orderService.getAllOrders().then(orders => {
      res.json(orders)
    }).catch(error => {
      next(error)
    })
  }
}

export default OrderControllerImpl
