import { Schema, SchemaTypes, model } from 'mongoose'

const dealershipSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxLength: 2000
  },
  bannerURL: String,
  manager: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
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

const dealershipModel = model('Dealership', dealershipSchema)

export default dealershipModel
