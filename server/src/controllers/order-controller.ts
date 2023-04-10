import { type Request, type Response, type NextFunction } from 'express'
import type OrderController from './interfaces/order-controller.js'
import AppError from '../types/app-error.js'

class OrderControllerImpl implements OrderController {
  addOrder = (req: Request, res: Response, next: NextFunction): void => {
    throw new AppError('Not implemented!', 501)
  }

  updateOrder = (req: Request, res: Response, next: NextFunction): void => {
    throw new AppError('Not implemented!', 501)
  }

  deleteOrder = (req: Request, res: Response, next: NextFunction): void => {
    throw new AppError('Not implemented!', 501)
  }

  getOrder = (req: Request, res: Response, next: NextFunction): void => {
    throw new AppError('Not implemented!', 501)
  }

  listAllOrder = (req: Request, res: Response, next: NextFunction): void => {
    throw new AppError('Not implemented!', 501)
  }
}

export default OrderControllerImpl
