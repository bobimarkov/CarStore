import { type Types } from 'mongoose'
import type Dealership from '../models/interfaces/dealership.js'
import type DealershipService from './interfaces/dealership-service.js'
import type DealershipRepository from '../repositories/interfaces/dealership-repository.js'
import DealershipRepositoryImpl from '../repositories/dealership-repository.js'
import AppError from '../types/app-error.js'
import logger from '../utils/logger.js'
import UserServiceImpl from './user-service.js'
import type UserService from './interfaces/user-service.js'
import type CarService from './interfaces/car-service.js'
import CarServiceImpl from './car-service.js'
import type Car from '../models/interfaces/car.js'

class DealershipServiceImpl implements DealershipService {
  private readonly dealershipRepository: DealershipRepository
  private readonly userService: UserService
  private readonly carService: CarService

  constructor () {
    this.dealershipRepository = new DealershipRepositoryImpl()
    this.userService = new UserServiceImpl()
    this.carService = new CarServiceImpl()
  }

  // TODO Get only specific for the operation attributes from the dealership var

  addDealership = async (dealership: Dealership): Promise<Dealership> => {
    return await this.dealershipRepository.create(dealership).then((createdDealership: Dealership) => {
      logger.info(`Dealership with id ${createdDealership._id} has been created!`)
      return createdDealership
    }).catch(error => {
      throw new AppError(error)
    })
  }

  updateDealership = async (dealershipId: string, dealership: Dealership): Promise<Dealership> => {
    const currentDealership = await this.dealershipRepository.findById(dealershipId)
    if (currentDealership != null) {
      logger.info(`Dealership with id ${dealershipId} has been updated!`)
      return await this.dealershipRepository.update(dealershipId, dealership)
    }
    throw new AppError(`User with id ${dealershipId} doesn't exist!`, 404)
  }

  deleteDealership = async (dealershipId: string): Promise<Dealership> => {
    const currentDealership = await this.dealershipRepository.findById(dealershipId)
    if (currentDealership != null) {
      logger.info(`Dealership with id ${dealershipId} has been deleted!`)
      const deletedUser = await this.dealershipRepository.deleteById(dealershipId)
      return deletedUser!
    }
    throw new AppError(`Dealership with id ${dealershipId} doesn't exist!`, 404)
  }

  getAllDealerships = async (): Promise<Dealership | Dealership[]> => {
    return await this.dealershipRepository.findAll()
  }

  getDealership = async (dealershipId: string): Promise<Dealership> => {
    return await this.dealershipRepository.findById(dealershipId).then(foundDealership => {
      if (foundDealership != null) {
        return foundDealership
      }
      throw new AppError(`User with id ${dealershipId} doesn't exist!`, 404)
    }).catch(error => {
      throw new AppError(error.message, error.status)
    })
  }

  recruitDealer = async (dealershipId: string, userId: string): Promise<Dealership> => {
    const currentDealership = await this.dealershipRepository.findById(dealershipId)
    if (currentDealership == null) {
      throw new AppError("Dealership doesn't exist", 404)
    }
    const currentDealers: Types.ObjectId[] = currentDealership.dealers!
    const user = await this.userService.getUserById(userId)
    if (user == null) {
      throw new AppError("User doesn't exist", 404)
    }
    if (currentDealers.includes(user._id)) {
      throw new AppError(`The user with id ${userId} is already a dealer in dealership with id ${dealershipId}`, 409)
    }
    currentDealers.push(user._id)
    currentDealership.set({ dealers: currentDealers })

    await this.userService.addUserToDealership(userId, dealershipId)
    return await this.dealershipRepository.update(dealershipId, currentDealership)
  }

  fireDealer = async (dealershipId: string, userId: string): Promise<Dealership> => {
    const currentDealership = await this.dealershipRepository.findById(dealershipId)
    if (currentDealership == null) {
      throw new AppError("Dealership doesn't exist", 404)
    }
    const currentDealers: Types.ObjectId[] = currentDealership.dealers!
    const user = await this.userService.getUserById(userId)
    if (user == null) {
      throw new AppError("User doesn't exist", 404)
    }
    if (!currentDealers.includes(user._id)) {
      throw new AppError(`The user with id ${userId} is not a dealer in dealership with id ${dealershipId}`, 409)
    }
    const dealerIndex = currentDealers.indexOf(user._id, 0)
    currentDealers.splice(dealerIndex, 1)

    currentDealership.set({ dealers: currentDealers })

    await this.userService.removeUserFromDealership(userId, dealershipId)
    return await this.dealershipRepository.update(dealershipId, currentDealership)
  }

  addCarToDealership = async (dealershipId: string, car: Car): Promise<Dealership> => {
    const currentDealership = await this.dealershipRepository.findById(dealershipId)
    if (currentDealership == null) {
      throw new AppError("Dealership doesn't exist", 404)
    }
    car.dealership = currentDealership._id
    const addedCar: Car = await this.carService.addCar(car)

    const cars = currentDealership.cars!
    cars.push(addedCar._id)

    currentDealership.cars = cars
    return await this.dealershipRepository.update(dealershipId, currentDealership)
  }

  removeCarFromDealership = async (dealershipId: string, carId: string): Promise<Dealership> => {
    const currentDealership = await this.dealershipRepository.findById(dealershipId)
    if (currentDealership == null) {
      throw new AppError(`Dealership with id ${dealershipId} doesn't exist`, 404)
    }

    const car = await this.carService.getCar(carId)
    if (car == null) {
      throw new AppError(`Car with id ${carId} doesn't exist.`, 404)
    }
    if (currentDealership.cars == null || !currentDealership.cars.includes(car._id)) {
      throw new AppError(`Car with id ${carId} is not a car from dealership with id ${dealershipId}`, 400)
    }

    const carIndex = currentDealership.cars.indexOf(car._id, 0)
    currentDealership.cars.splice(carIndex, 1)

    await this.carService.deleteCar(carId)

    return await this.dealershipRepository.update(dealershipId, currentDealership)
  }

  getStatistics = async (): Promise<void> => {
    throw new AppError('Not implemented', 501)
  }
}

export default DealershipServiceImpl
