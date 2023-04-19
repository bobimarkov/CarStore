import { type Request, type Response, type NextFunction } from 'express'
import type DealershipRequestController from './interfaces/dealership-request-controller.js'
import type DealershipRequestService from '../services/interfaces/dealership-request-service.js'
import DealershipRequestServiceImpl from '../services/dealership-request-service.js'

class DealershipRequestControllerImpl implements DealershipRequestController {
  private readonly dealershipRequestService: DealershipRequestService

  constructor () {
    this.dealershipRequestService = new DealershipRequestServiceImpl()
  }

  addRequest = (req: Request, res: Response, next: NextFunction): void => {
    this.dealershipRequestService.addRequest(req.body).then(dealershipRequest => {
      // TODO: Location header with the path to the new resource when 201
      res.status(201).json(dealershipRequest.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  getRequest = (req: Request, res: Response, next: NextFunction): void => {
    this.dealershipRequestService.getRequest(req.params.id).then(dealershipRequest => {
      res.json(dealershipRequest)
    }).catch(error => {
      next(error)
    })
  }

  getAllRequests = (_req: Request, res: Response, next: NextFunction): void => {
    this.dealershipRequestService.getAllRequests().then(dealershipRequests => {
      res.json(dealershipRequests)
    }).catch(error => {
      next(error)
    })
  }

  deleteRequest = (req: Request, res: Response, next: NextFunction): void => {
    this.dealershipRequestService.deleteRequest(req.params.id).then(dealershipRequest => {
      res.json(dealershipRequest.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  approveRequest = (req: Request, res: Response, next: NextFunction): void => {
    this.dealershipRequestService.approveRequest(req.params.id).then(dealershipRequest => {
      res.json(dealershipRequest.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  declineRequest = (req: Request, res: Response, next: NextFunction): void => {
    this.dealershipRequestService.declineRequest(req.params.id).then(dealershipRequest => {
      res.json(dealershipRequest.toJSON())
    }).catch(error => {
      next(error)
    })
  }
}

export default DealershipRequestControllerImpl
