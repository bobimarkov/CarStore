import type Review from '../models/interfaces/review.js'
import type Car from '../models/interfaces/car.js'
import type CarService from './interfaces/car-service.js'
import CarRepositoryImpl from '../repositories/car-repository.js'
import type CarRepository from '../repositories/interfaces/car-repository.js'
import logger from '../utils/logger.js'
import AppError from '../types/app-error.js'
import type UserService from './interfaces/user-service.js'
import type ReviewService from './interfaces/review-service.js'
import UserServiceImpl from './user-service.js'
import ReviewServiceImpl from './review-service.js'

class CarServiceImpl implements CarService {
  private readonly carRepository: CarRepository
  private readonly userService: UserService
  private readonly reviewService: ReviewService

  constructor () {
    this.carRepository = new CarRepositoryImpl()
    this.userService = new UserServiceImpl()
    this.reviewService = new ReviewServiceImpl()
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
    try {
      const currentCar = await this.carRepository.findById(carId)
      if (currentCar == null) {
        throw new AppError(`Car with id ${carId} doesn't exist!`, 404)
      }
      logger.info(`Car with id ${carId} has been updated!`)
      return await this.carRepository.update(carId, car)
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  deleteCar = async (carId: string): Promise<Car> => {
    try {
      const currentCar = await this.carRepository.findById(carId)
      if (currentCar == null) {
        throw new AppError(`Car with id ${carId} doesn't exist!`, 404)
      }

      logger.info(`Car with id ${carId} has been deleted!`)
      const deletedCar = await this.carRepository.deleteById(carId)

      return deletedCar
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  getAllCars = async (): Promise<Car | Car[]> => {
    try {
      return await this.carRepository.findAll()
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  getCar = async (carId: string): Promise<Car> => {
    return await this.carRepository.findById(carId, 'reviews')
      .then(foundCar => {
        if (foundCar == null) {
          throw new AppError(`Car with id ${carId} was not found!`, 404)
        }

        return foundCar
      })
      .catch(async error => await Promise.reject(error))
  }

  addReview = async (carId: string, review: Review): Promise<Car> => {
    try {
      const currentCar = await this.carRepository.findById(carId)
      if (currentCar == null) {
        throw new AppError(`Car with id ${carId} doesn't exist!`, 404)
      }
      const user = await this.userService.getUserById(review.user.toString())
      if (user == null) {
        throw new AppError(`User with id ${review.user} doesn't exist!`, 404)
      }

      review.car = currentCar._id
      const newReview = await this.reviewService.addReview(review)
      currentCar.reviews!.push(newReview._id)

      logger.info(`Review for car with id ${carId} has been added!`)
      return await this.carRepository.update(carId, currentCar)
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  deleteReview = async (carId: string, reviewId: string): Promise<Car> => {
    try {
      const currentCar = await this.carRepository.findById(carId)
      if (currentCar == null) {
        throw new AppError(`Car with id ${carId} doesn't exist!`, 404)
      }

      const review = await this.reviewService.getReview(reviewId)
      if (review == null) {
        throw new AppError(`Review with id ${reviewId} doesn't exist!`, 404)
      }

      const reviewIndex = currentCar.reviews!.indexOf(review._id, 0)
      if (reviewIndex === -1) {
        throw new AppError(`Review with id ${reviewId} for car with id ${carId} doesn't exist!`, 404)
      }

      currentCar.reviews!.splice(reviewIndex, 1)

      logger.info(`Review for car with id ${carId} has been deleted!`)
      return await this.carRepository.update(carId, currentCar)
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  updateReview = async (carId: string, reviewId: string, review: Review): Promise<Review> => {
    try {
      const currentCar = await this.carRepository.findById(carId)
      if (currentCar == null) {
        throw new AppError(`Car with id ${carId} doesn't exist!`, 404)
      }

      const foundReview = await this.reviewService.getReview(reviewId)
      if (foundReview == null) {
        throw new AppError(`Review with id ${reviewId} doesn't exist!`, 404)
      }

      if (!currentCar.reviews!.includes(foundReview._id)) {
        throw new AppError(`Review with id ${reviewId} for car with id ${carId} doesn't exist!`, 404)
      }

      logger.info(`Review with id ${reviewId} for car with id ${carId} has been updated!`)
      return await this.reviewService.updateReview(carId, review)
    } catch (error) {
      return await Promise.reject(error)
    }
  }
}

export default CarServiceImpl
