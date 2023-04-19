import type Order from '../models/interfaces/order.js'
import type OrderService from './interfaces/order-service.js'
import type OrderRepository from '../repositories/interfaces/order-repository.js'
import OrderRepositoryImpl from '../repositories/order-repository.js'
import AppError from '../types/app-error.js'
import logger from '../utils/logger.js'
import type UserService from './interfaces/user-service'
import UserServiceImpl from './user-service.js'
import CarServiceImpl from './car-service.js'
import type CarService from './interfaces/car-service.js'

class OrderServiceImpl implements OrderService {
  private readonly orderRepository: OrderRepository
  private readonly userService: UserService
  private readonly carService: CarService

  constructor () {
    this.orderRepository = new OrderRepositoryImpl()
    this.userService = new UserServiceImpl()
    this.carService = new CarServiceImpl()
  }

  addOrder = async (order: Order): Promise<Order> => {
    try {
      const user = await this.userService.getUserById(order.customer.toString())
      if (user == null) {
        throw new AppError(`User with id ${order.customer} doesn't exist!`, 404)
      }

      for (const product in order.products) {
        const foundProduct = await this.carService.getCar(order.products[product].product.toString())
        if (foundProduct == null) {
          throw new AppError(`Product with id ${order.products[product].product} doesn't exist!`, 404)
        }
      }

      const createdOrder = await this.orderRepository.create(order)
      logger.info(`Order with id ${createdOrder._id} has been created!`)
      return createdOrder
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  deleteOrder = async (orderId: string): Promise<Order> => {
    try {
      const currentOrder = await this.orderRepository.findById(orderId)
      if (currentOrder == null) {
        throw new AppError(`Order with id ${orderId} doesn't exist!`, 404)
      }
      logger.info(`Order with id ${orderId} has been deleted!`)
      await this.orderRepository.deleteById(orderId)

      return currentOrder
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  updateOrder = async (orderId: string, newOrder: Order): Promise<Order> => {
    try {
      const currentOrder = await this.orderRepository.findById(orderId)
      if (currentOrder == null) {
        throw new AppError(`Order with id ${orderId} doesn't exist!`, 404)
      }
      logger.info(`Order with id ${orderId} has been updated!`)
      currentOrder.status = newOrder.status != null ? newOrder.status : currentOrder.status
      return await this.orderRepository.update(orderId, currentOrder)
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  getAllOrders = async (): Promise<Order | Order[]> => {
    return await this.orderRepository.findAll()
      .then(orders => orders)
      .catch(async error => await Promise.reject(error))
  }

  getOrder = async (orderId: string): Promise<Order> => {
    return await this.orderRepository.findById(orderId)
      .then(foundOrder => {
        if (foundOrder == null) {
          throw new AppError(`Order with id ${orderId} doesn't exist!`, 404)
        }
        return foundOrder
      })
      .catch(async error => await Promise.reject(error))
  }
}

export default OrderServiceImpl
