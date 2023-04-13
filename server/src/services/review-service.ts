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
    const user = await this.userService.getUserById(review.user.toString())
    if (user == null) {
      throw new AppError(`User with id ${review.user.toString()} doesn't exist!`, 404)
    }

    return await this.reviewRepository.create(review).then((createdReview: Review) => {
      logger.info(`Review with id ${createdReview._id} has been created!`)
      return createdReview
    }).catch(error => {
      throw new AppError(error)
    })
  }

  removeReview = async (reviewId: string): Promise<Review> => {
    const currentReview = await this.reviewRepository.findById(reviewId)
    if (currentReview == null) {
      throw new AppError(`Review with id ${reviewId} doesn't exist!`, 404)
    }
    logger.info(`Review with id ${reviewId} has been deleted!`)
    await this.reviewRepository.deleteById(reviewId)

    return currentReview
  }

  getReview = async (reviewId: string): Promise<Review> => {
    return await this.reviewRepository.findById(reviewId).then(foundReview => {
      if (foundReview != null) {
        return foundReview
      }
      throw new AppError(`Review with id ${reviewId} doesn't exist!`, 404)
    }).catch(error => {
      throw new AppError(error.message, error.status)
    })
  }

  updateReview = async (reviewId: string, review: Review): Promise<Review> => {
    const currentReview = await this.reviewRepository.findById(reviewId)
    if (currentReview == null) {
      throw new AppError(`Review with id ${reviewId} doesn't exist!`, 404)
    }
    logger.info(`Review with id ${reviewId} has been updated!`)
    return await this.reviewRepository.update(reviewId, review)
  }
}

export default ReviewServiceImpl
