import type Order from '../models/interfaces/order.js'
import orderModel from '../models/order.js'
import BaseRepositoryImpl from './base-repository.js'
import type OrderRepository from './interfaces/order-repository.js'

class OrderRepositoryImpl extends BaseRepositoryImpl<Order> implements OrderRepository {
  constructor () {
    super(orderModel)
  }
}

export default OrderRepositoryImpl
