import { type NextFunction, type Response, type Request } from 'express'
import type CarController from './interfaces/car-controller.js'
import CarServiceImpl from '../services/car-service.js'
import type CarService from '../services/interfaces/car-service.js'
import AppError from '../types/app-error.js'
import DealershipServiceImpl from '../services/dealership-service.js'
import type DealershipService from '../services/interfaces/dealership-service.js'

class CarControllerImpl implements CarController {
  private readonly carService: CarService
  private readonly dealershipService: DealershipService

  constructor () {
    this.carService = new CarServiceImpl()
    this.dealershipService = new DealershipServiceImpl()
  }

  addCar = (req: Request, res: Response, next: NextFunction): void => {
    this.dealershipService.addCarToDealership(req.body.dealership, req.body).then(car => {
      // TODO: Location header with the path to the new resource when 201
      res.status(201).json(car.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  listAllCars = (_req: Request, res: Response, next: NextFunction): void => {
    this.carService.getAllCars().then(cars => {
      res.json(cars)
    }).catch(error => {
      next(error)
    })
  }

  getCar = (req: Request, res: Response, next: NextFunction): void => {
    this.carService.getCar(req.params.id).then(car => {
      res.json(car)
    }).catch(error => {
      next(error)
    })
  }

  updateCar = (req: Request, res: Response, next: NextFunction): void => {
    this.carService.updateCar(req.params.id, req.body).then(car => {
      res.json(car.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  deleteCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await this.carService.getCar(req.params.id).then(async car => {
      await this.dealershipService.removeCarFromDealership(car.dealership.toString(), req.params.id).then(car => {
        res.json(car.toJSON())
      }).catch(error => {
        next(error)
      }).catch(error => { next(error) })
    })
  }

  addReview = (req: Request, res: Response, next: NextFunction): void => {
    this.carService.addReview(req.params.id, req.body).then(car => {
      res.json(car.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  updateReview = (req: Request, res: Response, next: NextFunction): void => {
    this.carService.updateReview(req.params.carId, req.params.reviewId, req.body).then(car => {
      res.json(car.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  deleteReview = (req: Request, res: Response, next: NextFunction): void => {
    this.carService.deleteReview(req.params.carId, req.params.reviewId).then(car => {
      res.json(car.toJSON())
    }).catch(error => {
      next(error)
    })
  }
}

export default CarControllerImpl
