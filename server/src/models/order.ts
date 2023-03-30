import { type Model, Schema, SchemaTypes, model } from 'mongoose'
import { type Product } from './interfaces/order'
import type Order from './interfaces/order'

const productSchema = new Schema<Product>({
  product: {
    type: SchemaTypes.ObjectId,
    ref: 'Car',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
})

const orderSchema = new Schema<Order, Model<Order>>({
  customer: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    default: 'Ordered' // Ordered, Approved/Declined, Shipped
  },
  products: {
    type: [productSchema],
    required: true
  }
}, {
  timestamps: true
})

const orderModel = model<Order, Model<Order>>('order', orderSchema)

export default orderModel
