import { type NextFunction, type Request, type Response } from 'express'

interface DealershipRequestController {
  addRequest: (req: Request, res: Response, next: NextFunction) => void
  getRequest: (req: Request, res: Response, next: NextFunction) => void
  getAllRequests: (req: Request, res: Response, next: NextFunction) => void
  deleteRequest: (req: Request, res: Response, next: NextFunction) => void

  approveRequest: (req: Request, res: Response, next: NextFunction) => void
  declineRequest: (req: Request, res: Response, next: NextFunction) => void
}

export default DealershipRequestController
