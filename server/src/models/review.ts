import { Schema, SchemaTypes } from 'mongoose'

const reviewSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
    maxLength: 200
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
}, {
  timestamps: true
})

export default reviewSchema
