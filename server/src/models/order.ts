import { Schema, SchemaTypes, model } from 'mongoose'

const orderSchema = new Schema({
  customer: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    default: 'Ordered' // Ordered, Approved/Declined, Shipped
  },
  products: [{
    product: {
      type: SchemaTypes.ObjectId,
      ref: 'Car',
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }]
}, {
  timestamps: true
})

const orderModel = model('order', orderSchema)

export default orderModel
