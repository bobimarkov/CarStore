import { type Review } from '../models/interfaces/car.js'
import type Car from '../models/interfaces/car.js'
import type CarService from './interfaces/car-service.js'
import CarRepositoryImpl from '../repositories/car-repository.js'
import type CarRepository from '../repositories/interfaces/car-repository.js'
import logger from '../utils/logger.js'
import AppError from '../types/app-error.js'
import UserRepositoryImpl from '../repositories/user-repository.js'
import type UserRepository from '../repositories/interfaces/user-repository.js'

class CarServiceImpl implements CarService {
  private readonly carRepository: CarRepository
  private readonly userRepository: UserRepository

  constructor () {
    this.carRepository = new CarRepositoryImpl()
    this.userRepository = new UserRepositoryImpl()
  }

  // TODO Get only specific for the operation attributes from the Car var

  addCar = async (car: Car): Promise<Car> => {
    return await this.carRepository.create(car).then((createdCar: Car) => {
      logger.info(`Car with id ${createdCar._id} has been created for dealership with id ${createdCar.dealership}!`)
      return createdCar
    }).catch(error => {
      throw new AppError(error)
    })
  }

  updateCar = async (carId: string, car: Car): Promise<Car> => {
    const currentCar = await this.carRepository.findById(carId)
    if (currentCar == null) {
      throw new AppError(`Car with id ${carId} doesn't exist!`, 404)
    }
    logger.info(`Car with id ${carId} has been updated!`)
    return await this.carRepository.update(carId, car)
  }

  deleteCar = async (carId: string): Promise<Car> => {
    const currentCar = await this.carRepository.findById(carId)
    if (currentCar == null) {
      throw new AppError(`Car with id ${carId} doesn't exist!`, 404)
    }
    logger.info(`Car with id ${carId} has been deleted!`)
    await this.carRepository.deleteById(carId)

    return currentCar
  }

  getAllCars = async (): Promise<Car | Car[]> => {
    return await this.carRepository.findAll()
  }

  getCar = async (carId: string): Promise<Car> => {
    return await this.carRepository.findById(carId).then(foundCar => {
      if (foundCar != null) {
        return foundCar
      }
      throw new AppError(`Car with id ${carId} doesn't exist!`, 404)
    }).catch(error => {
      throw new AppError(error.message, error.status)
    })
  }

  addReview = async (carId: string, review: Review): Promise<Car> => {
    const currentCar = await this.carRepository.findById(carId)
    if (currentCar == null) {
      throw new AppError(`Car with id ${carId} doesn't exist!`, 404)
    }
    const user = await this.userRepository.findById(review.user.toString())
    if (user == null) {
      throw new AppError(`User with id ${review.user} doesn't exist!`, 404)
    }
    const reviews = currentCar.reviews!
    reviews.push(review)
    currentCar.reviews = reviews
    logger.info(`Review for car with id ${carId} has been added!`)
    return await this.carRepository.update(carId, currentCar)
  }

  deleteReview = async (carId: string, reviewId: string): Promise<Car> => {
    const currentCar = await this.carRepository.findById(carId)
    if (currentCar == null) {
      throw new AppError(`Car with id ${carId} doesn't exist!`, 404)
    }
    const reviews = currentCar.reviews!
    const reviewIndex = reviews.findIndex(review => review._id.equals(reviewId))
    if (reviewIndex === -1) {
      throw new AppError(`Review with id ${reviewId} for car with id ${carId} doesn't exist!`, 404)
    }
    reviews.splice(reviewIndex, 1)
    currentCar.reviews = reviews
    logger.info(`Review for car with id ${carId} has been deleted!`)
    return await this.carRepository.update(carId, currentCar)
  }

  updateReview = async (carId: string, reviewId: string, review: Review): Promise<Car> => {
    const currentCar = await this.carRepository.findById(carId)
    if (currentCar == null) {
      throw new AppError(`Car with id ${carId} doesn't exist!`, 404)
    }
    const reviews = currentCar.reviews!
    const reviewIndex = reviews.findIndex(review => review._id.equals(reviewId))
    if (reviewIndex === -1) {
      throw new AppError(`Review with id ${reviewId} for car with id ${carId} doesn't exist!`, 404)
    }
    if (review.comment != null) {
      reviews[reviewIndex].comment = review.comment
    }
    if (review.rating != null) {
      reviews[reviewIndex].rating = review.rating
    }

    currentCar.reviews = reviews
    logger.info(`Review with id ${reviewId} for car with id ${carId} has been updated!`)
    return await this.carRepository.update(carId, currentCar)
  }
}

export default CarServiceImpl
