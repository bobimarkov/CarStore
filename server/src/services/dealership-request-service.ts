import type DealershipRequest from '../models/interfaces/dealership-request.js'
import type DealershipRequestService from './interfaces/dealership-request-service.js'
import type DealershipRequestRepository from '../repositories/interfaces/dealership-request-repository.js'
import DealershipRequestRepositoryImpl from '../repositories/dealership-request-repository.js'
import AppError from '../types/app-error.js'
import type UserService from './interfaces/user-service.js'
import UserServiceImpl from './user-service.js'
import logger from '../utils/logger.js'
import type Dealership from '../models/interfaces/dealership.js'
import type DealershipService from './interfaces/dealership-service.js'
import DealershipServiceImpl from './dealership-service.js'
import { DealershipRequestStatus } from '../models/interfaces/dealership-request.js'

class DealershipRequestServiceImpl implements DealershipRequestService {
  private readonly dealershipRequestRepository: DealershipRequestRepository
  private readonly dealershipService: DealershipService
  private readonly userService: UserService

  constructor () {
    this.dealershipRequestRepository = new DealershipRequestRepositoryImpl()
    this.userService = new UserServiceImpl()
    this.dealershipService = new DealershipServiceImpl()
  }

  addRequest = async (dealershipRequest: DealershipRequest): Promise<DealershipRequest> => {
    const user = await this.userService.getUserById(dealershipRequest.manager.toString())
    if (user == null) {
      throw new AppError(`User with id ${dealershipRequest.manager._id} doesn't exist!`, 404)
    }

    return await this.dealershipRequestRepository.create(dealershipRequest).then((createdDealershipRequest: DealershipRequest) => {
      logger.info(`Dealership request with id ${createdDealershipRequest._id} has been created!`)
      return createdDealershipRequest
    }).catch(error => {
      throw new AppError(error)
    })
  }

  deleteRequest = async (dealershipRequestId: string): Promise<DealershipRequest> => {
    const currentDealershipRequest = await this.dealershipRequestRepository.findById(dealershipRequestId)
    if (currentDealershipRequest == null) {
      throw new AppError(`Dealership request with id ${dealershipRequestId} doesn't exist!`, 404)
    }
    logger.info(`Dealership request with id ${dealershipRequestId} has been deleted!`)
    await this.dealershipRequestRepository.deleteById(dealershipRequestId)

    return currentDealershipRequest
  }

  getAllRequests = async (): Promise<DealershipRequest | DealershipRequest[]> => {
    return await this.dealershipRequestRepository.findAll()
  }

  getRequest = async (dealershipRequestId: string): Promise<DealershipRequest> => {
    return await this.dealershipRequestRepository.findById(dealershipRequestId).then(foundDealershipRequest => {
      if (foundDealershipRequest != null) {
        return foundDealershipRequest
      }
      throw new AppError(`Dealership request with id ${dealershipRequestId} doesn't exist!`, 404)
    }).catch(error => {
      throw new AppError(error.message, error.status)
    })
  }

  approveRequest = async (dealershipRequestId: string): Promise<Dealership> => {
    const currentDealershipRequest = await this.dealershipRequestRepository.findById(dealershipRequestId)
    if (currentDealershipRequest == null) {
      throw new AppError(`Dealership request with id ${dealershipRequestId} doesn't exist!`, 404)
    }

    if (currentDealershipRequest.status !== DealershipRequestStatus.REQUESTED) {
      throw new AppError('This request has been already closed')
    }

    const newDealershipBody = {
      name: currentDealershipRequest.name,
      UIC: currentDealershipRequest.UIC,
      description: currentDealershipRequest.description,
      manager: currentDealershipRequest.manager
    }

    const newDealership = await this.dealershipService.addDealership(newDealershipBody as Dealership)

    currentDealershipRequest.status = DealershipRequestStatus.APPROVED
    await this.dealershipRequestRepository.update(dealershipRequestId, currentDealershipRequest)

    return newDealership
  }

  declineRequest = async (dealershipRequestId: string): Promise<DealershipRequest> => {
    const currentDealershipRequest = await this.dealershipRequestRepository.findById(dealershipRequestId)
    if (currentDealershipRequest == null) {
      throw new AppError(`Dealership request with id ${dealershipRequestId} doesn't exist!`, 404)
    }

    if (currentDealershipRequest.status !== DealershipRequestStatus.REQUESTED) {
      throw new AppError('This request has been already closed')
    }

    currentDealershipRequest.status = DealershipRequestStatus.DECLINED
    return await this.dealershipRequestRepository.update(dealershipRequestId, currentDealershipRequest)
  }
}

export default DealershipRequestServiceImpl
