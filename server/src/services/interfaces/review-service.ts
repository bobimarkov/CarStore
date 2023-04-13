import type Review from '../../models/interfaces/review.js'

interface ReviewService {
  addReview: (review: Review) => Promise<Review>
  removeReview: (reviewId: string) => Promise<Review>
  getReview: (reviewId: string) => Promise<Review>
  updateReview: (reviewId: string, review: Review) => Promise<Review>
}

export default ReviewService
