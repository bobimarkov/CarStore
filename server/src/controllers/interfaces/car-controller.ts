import { type NextFunction, type Request, type Response } from 'express'

interface CarController {
  addCar: (req: Request, res: Response, next: NextFunction) => void
  listAllCars: (req: Request, res: Response, next: NextFunction) => void
  getCar: (req: Request, res: Response, next: NextFunction) => void
  updateCar: (req: Request, res: Response, next: NextFunction) => void
  deleteCar: (req: Request, res: Response, next: NextFunction) => void

  addReview: (req: Request, res: Response, next: NextFunction) => void
  updateReview: (req: Request, res: Response, next: NextFunction) => void
  deleteReview: (req: Request, res: Response, next: NextFunction) => void
}

export default CarController
