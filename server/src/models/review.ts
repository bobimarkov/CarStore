import { type Model, Schema, SchemaTypes, model } from 'mongoose'
import type Review from './interfaces/review.js'

const reviewSchema: Schema = new Schema<Review, Model<Review>>({
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: SchemaTypes.ObjectId,
    ref: 'Car',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  comment: {
    type: String,
    maxLength: 200
  }
}, {
  timestamps: true
})

const reviewModel = model<Review, Model<Review>>('Review', reviewSchema)

export default reviewModel
