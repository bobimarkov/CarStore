import type ReviewService from './interfaces/review-service.js'
import type ReviewRepository from '../repositories/interfaces/review-repository'
import ReviewRepositoryImpl from '../repositories/review-repository.js'
import type Review from '../models/interfaces/review.js'
import AppError from '../types/app-error.js'
import type UserService from './interfaces/user-service.js'
import UserServiceImpl from './user-service.js'
import logger from '../utils/logger.js'

class ReviewServiceImpl implements ReviewService {
  private readonly reviewRepository: ReviewRepository
  private readonly userService: UserService

  constructor () {
    this.reviewRepository = new ReviewRepositoryImpl()
    this.userService = new UserServiceImpl()
  }

  addReview = async (review: Review): Promise<Review> => {
    try {
      const user = await this.userService.getUserById(review.user.toString())
      if (user == null) {
        throw new AppError(`User with id ${review.user.toString()} doesn't exist!`, 404)
      }

      const createdReview = await this.reviewRepository.create(review)
      logger.info(`Review with id ${createdReview._id} has been created!`)
      return createdReview
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  deleteReview = async (reviewId: string): Promise<Review> => {
    try {
      const currentReview = await this.reviewRepository.findById(reviewId)
      if (currentReview == null) {
        throw new AppError(`Review with id ${reviewId} doesn't exist!`, 404)
      }
      logger.info(`Review with id ${reviewId} has been deleted!`)
      await this.reviewRepository.deleteById(reviewId)

      return currentReview
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  getReview = async (reviewId: string): Promise<Review> => {
    return await this.reviewRepository.findById(reviewId)
      .then(foundReview => {
        if (foundReview == null) {
          throw new AppError(`Review with id ${reviewId} doesn't exist!`, 404)
        }
        return foundReview
      })
      .catch(async error => await Promise.reject(error))
  }

  updateReview = async (reviewId: string, review: Review): Promise<Review> => {
    try {
      const currentReview = await this.reviewRepository.findById(reviewId)
      if (currentReview == null) {
        throw new AppError(`Review with id ${reviewId} doesn't exist!`, 404)
      }
      logger.info(`Review with id ${reviewId} has been updated!`)
      return await this.reviewRepository.update(reviewId, review)
    } catch (error) {
      return await Promise.reject(error)
    }
  }
}

export default ReviewServiceImpl
