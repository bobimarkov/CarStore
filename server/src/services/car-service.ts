/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Review } from '../models/interfaces/car'
import type Car from '../models/interfaces/car'
import type CarService from './interfaces/car-service'
import CarRepositoryImpl from '../repositories/car-repository'
import type CarRepository from '../repositories/interfaces/car-repository'
import logger from '../utils/logger'
import AppError from '../types/app-error'

class CarServiceImpl implements CarService {
  private readonly carRepository: CarRepository

  constructor () {
    this.carRepository = new CarRepositoryImpl()
  }

  // TODO Get only specific for the operation attributes from the Car var

  addCar = async (car: Car): Promise<Car> => {
    return await this.carRepository.create(car).then((createdCar: Car) => {
      logger.info(`Car with id ${createdCar._id} has been created!`)
      return createdCar
    }).catch(error => {
      throw new AppError(error)
    })
  }

  updateCar = async (carId: string, car: Car): Promise<Car> => {
    const currentCar = await this.carRepository.findById(carId)
    if (currentCar != null) {
      logger.info(`Car with id ${carId} has been updated!`)
      return await this.carRepository.update(carId, car)
    }
    throw new AppError(`User with id ${carId} doesn't exist!`, 404)
  }

  deleteCar = async (carId: string): Promise<Car> => {
    const currentCar = await this.carRepository.findById(carId)
    if (currentCar != null) {
      logger.info(`Car with id ${carId} has been deleted!`)
      const deletedUser = await this.carRepository.deleteById(carId)
      return deletedUser!
    }
    throw new AppError(`Car with id ${carId} doesn't exist!`, 404)
  }

  getAllCars = async (): Promise<Car | Car[]> => {
    return await this.carRepository.findAll()
  }

  getCar = async (carId: string): Promise<Car> => {
    return await this.carRepository.findById(carId).then(foundCar => {
      if (foundCar != null) {
        return foundCar
      }
      throw new AppError(`User with id ${carId} doesn't exist!`, 404)
    }).catch(error => {
      throw new AppError(error.message, error.status)
    })
  }

  addReview = async (carId: string, review: Review): Promise<Car> => {
    throw new AppError('Not implemented', 501)
  }

  deleteReview = async (carId: string, reviewId: string): Promise<Car> => {
    throw new AppError('Not implemented', 501)
  }

  updateReview = async (carId: string, reviewId: string, review: Review): Promise<Car> => {
    throw new AppError('Not implemented', 501)
  }
}

export default CarServiceImpl
