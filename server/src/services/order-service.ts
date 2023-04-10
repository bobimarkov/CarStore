import { type Types } from 'mongoose'
import type Order from '../models/interfaces/order'
import type OrderService from './interfaces/order-service'
import type OrderRepository from '../repositories/interfaces/order-repository'
import OrderRepositoryImpl from '../repositories/order-repository'
import AppError from '../types/app-error'
import logger from '../utils/logger'

class OrderServiceImpl implements OrderService {
  private readonly orderRepository: OrderRepository

  constructor () {
    this.orderRepository = new OrderRepositoryImpl()
  }

  addOrder = async (order: Order): Promise<Order> => {
    return await this.orderRepository.create(order).then((createdOrder: Order) => {
      logger.info(`Order with id ${createdOrder._id} has been created!`)
      return createdOrder
    }).catch(error => {
      throw new AppError(error)
    })
  }

  deleteOrder = async (orderId: string): Promise<Order> => {
    throw new AppError('Not implemented!', 501)
  }

  updateOrder = async (orderId: string, newOrder: Order): Promise<Order> => {
    throw new AppError('Not implemented!', 501)
  }

  getAllOrders = async (): Promise<Order> => {
    throw new AppError('Not implemented!', 501)
  }

  getOrder = async (orderId: string): Promise<Order> => {
    throw new AppError('Not implemented!', 501)
  }
}

export default OrderServiceImpl
