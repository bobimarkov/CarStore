import { type NextFunction, type Request, type Response } from 'express'

interface DealershipController {
  createDealership: (req: Request, res: Response, next: NextFunction) => void
  listAllDealerships: (req: Request, res: Response, next: NextFunction) => void
  getDealership: (req: Request, res: Response, next: NextFunction) => void
  updateDealership: (req: Request, res: Response, next: NextFunction) => void
  deleteDealership: (req: Request, res: Response, next: NextFunction) => void
  recruitDealer: (req: Request, res: Response, next: NextFunction) => void
  fireDealer: (req: Request, res: Response, next: NextFunction) => void
}

export default DealershipController
