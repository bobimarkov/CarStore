/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Types } from 'mongoose'
import { type Review } from '../models/interfaces/car'
import type Car from '../models/interfaces/car'
import type CarService from './interfaces/car-service'
import CarRepositoryImpl from '../repositories/car-repository'
import type CarRepository from '../repositories/interfaces/car-repository'
import logger from '../utils/logger'

class CarServiceImpl implements CarService {
  private readonly carRepository: CarRepository

  constructor () {
    this.carRepository = new CarRepositoryImpl()
  }

  async addCar (car: Car): Promise<Car> {
    return await this.carRepository.create(car).then((createdCar: Car) => {
      logger.info(`Car with id ${createdCar._id} has been created!`)
      return createdCar
    }).catch(error => {
      throw new Error(error)
    })
  }

  async updateCar (car: Car): Promise<Car> {
    return await this.carRepository.update(car)
  }

  async deleteCar (carId: Types.ObjectId): Promise<Car> {
    return await this.carRepository.deleteById(carId)
  }

  async getAllCars (): Promise<Car | Car[]> {
    return await this.carRepository.findAll()
  }

  async getCarById (id: Types.ObjectId): Promise<Car | null> {
    return await this.carRepository.findById(id).then(foundCar => {
      return foundCar
    }).catch(error => {
      throw new Error(error)
    })
  }

  addReview (carId: Types.ObjectId, review: Review): Car {
    throw new Error('Not implemented')
  }

  deleteReview (carId: Types.ObjectId, reviewId: Types.ObjectId): Car {
    throw new Error('Not implemented')
  }

  updateReview (carId: Types.ObjectId, reviewId: Types.ObjectId, review: Review): Car {
    throw new Error('Not implemented')
  }
}

export default CarServiceImpl
