import { type NextFunction, type Request, type Response } from 'express'

interface OrderController {
  addOrder: (req: Request, res: Response, next: NextFunction) => void
  updateOrder: (req: Request, res: Response, next: NextFunction) => void
  deleteOrder: (req: Request, res: Response, next: NextFunction) => void
  getOrder: (req: Request, res: Response, next: NextFunction) => void
  getAllOrders: (req: Request, res: Response, next: NextFunction) => void
}

export default OrderController
