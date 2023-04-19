import { type NextFunction, type Request, type Response } from 'express'

interface PaymentController {
  addPayment: (req: Request, res: Response, next: NextFunction) => void
  getAllPayments: (req: Request, res: Response, next: NextFunction) => void
  getPayment: (req: Request, res: Response, next: NextFunction) => void
  deletePayment: (req: Request, res: Response, next: NextFunction) => void
}

export default PaymentController
