import { type NextFunction, type Request, type Response } from 'express'
import PaymentServiceImpl from '../services/payment-service.js'
import type PaymentService from '../services/interfaces/payment-service.js'
import type PaymentController from './interfaces/payment-controller.js'

class PaymentControllerImpl implements PaymentController {
  private readonly paymentService: PaymentService

  constructor () {
    this.paymentService = new PaymentServiceImpl()
  }

  addPayment = (req: Request, res: Response, next: NextFunction): void => {
    this.paymentService.addPayment(req.body).then(payment => {
      // TODO: Location header with the path to the new resource when 201
      res.status(201).json(payment.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  getAllPayments = (_req: Request, res: Response, next: NextFunction): void => {
    this.paymentService.getAllPayments().then(payments => {
      res.json(payments)
    }).catch(error => {
      next(error)
    })
  }

  getPayment = (req: Request, res: Response, next: NextFunction): void => {
    this.paymentService.getPayment(req.params.id).then(payment => {
      res.json(payment)
    }).catch(error => {
      next(error)
    })
  }

  deletePayment = (req: Request, res: Response, next: NextFunction): void => {
    this.paymentService.deletePayment(req.params.id).then(payment => {
      res.json(payment.toJSON())
    }).catch(error => {
      next(error)
    })
  }
}

export default PaymentControllerImpl
