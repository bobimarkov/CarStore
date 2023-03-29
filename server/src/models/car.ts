import { Schema, model } from 'mongoose'
import reviewSchema from './review.js'

const carSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxLength: 2000
  },
  year: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  hp: {
    type: Number,
    required: true
  },
  fuelType: {
    type: String,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  kml: {
    type: Number,
    required: true
  },
  interiorColor: String,
  exteriorColor: String,
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  photosURLs: [String],
  reviews: [reviewSchema]
}, {
  timestamps: true
})

const carModel = model('Car', carSchema)

export default carModel
