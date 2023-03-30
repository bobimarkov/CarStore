import { type Model, Schema, SchemaTypes, model } from 'mongoose'
import type Car from './interfaces/car'
import { type Review } from './interfaces/car'

const reviewSchema: Schema = new Schema<Review>({
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true
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

const carSchema: Schema = new Schema<Car, Model<Car>>({
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

const carModel = model<Car, Model<Car>>('Car', carSchema)

export default carModel
