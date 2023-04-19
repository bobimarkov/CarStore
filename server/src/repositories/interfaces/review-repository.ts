import type Review from '../../models/interfaces/review.js'
import type BaseRepository from './base-repository.js'

interface ReviewRepository extends BaseRepository<Review> {

}

export default ReviewRepository
