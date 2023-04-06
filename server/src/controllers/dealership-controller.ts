import { type NextFunction, type Request, type Response } from 'express'
import DealershipServiceImpl from '../services/dealership-service.js'
import type dealershipService from '../services/interfaces/dealership-service.js'
import type DealershipController from './interfaces/dealership-controller.js'

class DealershipControllerImpl implements DealershipController {
  private readonly dealershipService: dealershipService

  constructor () {
    this.dealershipService = new DealershipServiceImpl()
  }

  createDealership = (req: Request, res: Response, next: NextFunction): void => {
    this.dealershipService.addDealership(req.body).then(dealership => {
      // TODO: Location header with the path to the new resource when 201
      res.status(201).json(dealership.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  listAllDealerships = (_req: Request, res: Response, next: NextFunction): void => {
    this.dealershipService.getAllDealerships().then(dealerships => {
      res.json(dealerships)
    }).catch(error => {
      next(error)
    })
  }

  getDealership = (req: Request, res: Response, next: NextFunction): void => {
    this.dealershipService.getDealership(req.params.id).then(dealership => {
      res.json(dealership)
    }).catch(error => {
      next(error)
    })
  }

  updateDealership = (req: Request, res: Response, next: NextFunction): void => {
    this.dealershipService.updateDealership(req.params.id, req.body).then(dealership => {
      res.json(dealership.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  deleteDealership = (req: Request, res: Response, next: NextFunction): void => {
    this.dealershipService.deleteDealership(req.params.id).then(dealership => {
      res.json(dealership.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  recruitDealer = (req: Request, res: Response, next: NextFunction): void => {
    this.dealershipService.recruitDealer(req.params.id, req.body.Dealership).then(dealership => {
      res.json(dealership.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  fireDealer = (req: Request, res: Response, next: NextFunction): void => {
    this.dealershipService.fireDealer(req.params.dealershipId, req.params.dealerId).then(dealership => {
      res.json(dealership.toJSON())
    }).catch(error => {
      next(error)
    })
  }
}

export default DealershipControllerImpl
