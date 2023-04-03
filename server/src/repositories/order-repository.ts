import type Order from '../models/interfaces/order'
import orderModel from '../models/order'
import BaseRepositoryImpl from './base-repository'
import type OrderRepository from './interfaces/order-repository'

class OrderRepositoryImpl extends BaseRepositoryImpl<Order> implements OrderRepository {
  constructor () {
    super(orderModel)
  }
}

export default OrderRepositoryImpl
