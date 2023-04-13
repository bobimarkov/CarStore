import { Schema, SchemaTypes, model, type Model } from 'mongoose'
import type Dealership from './interfaces/dealership'

const dealershipSchema = new Schema<Dealership, Model<Dealership>>({
  name: {
    type: String,
    required: true
  },
  UIC: {
    type: String,
    required: true,
    unique: true,
    max: 9,
    min: 9
  },
  description: {
    type: String,
    maxLength: 2000
  },
  bannerURL: String,
  manager: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  dealers: [{
    type: SchemaTypes.ObjectId,
    ref: 'User'
  }],
  cars: [{
    type: SchemaTypes.ObjectId,
    ref: 'Car'
  }],
  orders: [{
    type: SchemaTypes.ObjectId,
    ref: 'Order'
  }],
  payments: [{
    type: SchemaTypes.ObjectId,
    ref: 'Payment'
  }]
}, {
  timestamps: true
})

const dealershipModel = model<Dealership, Model<Dealership>>('Dealership', dealershipSchema)

export default dealershipModel
