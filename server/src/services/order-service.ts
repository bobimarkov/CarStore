import { type Types } from 'mongoose'
import type Order from '../models/interfaces/order'
import type OrderService from './interfaces/order-service'

class OrderServiceImpl implements OrderService {
  constructor () {
    super(orderModel)
  }

  addOrder: (order: Order) => Order
  deleteOrder: (orderId: Types.ObjectId) => Order
  updateOrder: (orderId: Types.ObjectId, newOrder: Order) => Order
  getAllOrders: () => Order
  getOrder: (orderId: Types.ObjectId) => Order
}

export default OrderServiceImpl
