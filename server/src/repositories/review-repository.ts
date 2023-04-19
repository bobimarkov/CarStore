import reviewModel from '../models/review.js'
import type Review from '../models/interfaces/review.js'
import BaseRepositoryImpl from './base-repository.js'
import type ReviewRepository from './interfaces/review-repository.js'

class ReviewRepositoryImpl extends BaseRepositoryImpl<Review> implements ReviewRepository {
  constructor () {
    super(reviewModel)
  }
}

export default ReviewRepositoryImpl
