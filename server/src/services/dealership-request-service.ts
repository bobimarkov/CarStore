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
    try {
      const user = await this.userService.getUserById(dealershipRequest.manager.toString())
      if (user == null) {
        throw new AppError(`User with id ${dealershipRequest.manager._id} doesn't exist!`, 404)
      }

      const createdDealershipRequest = await this.dealershipRequestRepository.create(dealershipRequest)

      logger.info(`Dealership request with id ${createdDealershipRequest._id} has been created!`)
      return createdDealershipRequest
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  deleteRequest = async (dealershipRequestId: string): Promise<DealershipRequest> => {
    try {
      const currentDealershipRequest = await this.dealershipRequestRepository.findById(dealershipRequestId)
      if (currentDealershipRequest == null) {
        throw new AppError(`Dealership request with id ${dealershipRequestId} doesn't exist!`, 404)
      }
      logger.info(`Dealership request with id ${dealershipRequestId} has been deleted!`)
      await this.dealershipRequestRepository.deleteById(dealershipRequestId)

      return currentDealershipRequest
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  getAllRequests = async (): Promise<DealershipRequest | DealershipRequest[]> => {
    return await this.dealershipRequestRepository.findAll()
      .then(dealerships => dealerships)
      .catch(async error => await Promise.reject(error))
  }

  getRequest = async (dealershipRequestId: string): Promise<DealershipRequest> => {
    return await this.dealershipRequestRepository.findById(dealershipRequestId)
      .then(foundDealershipRequest => {
        if (foundDealershipRequest == null) {
          throw new AppError(`Dealership request with id ${dealershipRequestId} doesn't exist!`, 404)
        }

        return foundDealershipRequest
      })
      .catch(async error => await Promise.reject(error))
  }

  approveRequest = async (dealershipRequestId: string): Promise<Dealership> => {
    try {
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
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  declineRequest = async (dealershipRequestId: string): Promise<DealershipRequest> => {
    try {
      const currentDealershipRequest = await this.dealershipRequestRepository.findById(dealershipRequestId)
      if (currentDealershipRequest == null) {
        throw new AppError(`Dealership request with id ${dealershipRequestId} doesn't exist!`, 404)
      }

      if (currentDealershipRequest.status !== DealershipRequestStatus.REQUESTED) {
        throw new AppError('This request has been already closed')
      }

      currentDealershipRequest.status = DealershipRequestStatus.DECLINED
      return await this.dealershipRequestRepository.update(dealershipRequestId, currentDealershipRequest)
    } catch (error) {
      return await Promise.reject(error)
    }
  }
}

export default DealershipRequestServiceImpl
