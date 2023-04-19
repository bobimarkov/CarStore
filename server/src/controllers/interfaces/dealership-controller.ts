import { type NextFunction, type Request, type Response } from 'express'

interface DealershipController {
  createDealership: (req: Request, res: Response, next: NextFunction) => void
  getAllDealerships: (req: Request, res: Response, next: NextFunction) => void
  getDealership: (req: Request, res: Response, next: NextFunction) => void
  updateDealership: (req: Request, res: Response, next: NextFunction) => void
  deleteDealership: (req: Request, res: Response, next: NextFunction) => void
  recruitDealer: (req: Request, res: Response, next: NextFunction) => void
  fireDealer: (req: Request, res: Response, next: NextFunction) => void
  addCar: (req: Request, res: Response, next: NextFunction) => void
  deleteCar: (req: Request, res: Response, next: NextFunction) => void
}

export default DealershipController
