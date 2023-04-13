import { type Model, Schema, SchemaTypes, model } from 'mongoose'
import { OrderStatus, type Product } from './interfaces/order.js'
import type Order from './interfaces/order.js'

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
    enum: OrderStatus,
    default: OrderStatus.ORDERED
  },
  products: {
    type: [{
      type: productSchema
    }],
    required: true
  }
}, {
  timestamps: true
})

const orderModel = model<Order, Model<Order>>('Order', orderSchema)

export default orderModel
