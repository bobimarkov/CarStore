import { Schema, SchemaTypes, model } from 'mongoose'

const paymentSchema = new Schema({
  order: {
    type: SchemaTypes.ObjectId,
    ref: 'Order',
    required: true
  },
  shipmentAddress: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  }

}, {
  timestamps: true
})

const paymentModel = model('payment', paymentSchema)

export default paymentModel
