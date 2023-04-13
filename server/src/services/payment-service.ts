import type Payment from '../models/interfaces/payment.js'
import type PaymentService from './interfaces/payment-service.js'
import type PaymentRepository from '../repositories/interfaces/payment-repository.js'
import PaymentRepositoryImpl from '../repositories/payment-repository.js'
import AppError from '../types/app-error.js'
import type OrderService from './interfaces/order-service.js'
import OrderServiceImpl from './order-service.js'
import logger from '../utils/logger.js'

class PaymentServiceImpl implements PaymentService {
  private readonly paymentRepository: PaymentRepository
  private readonly orderService: OrderService

  constructor () {
    this.paymentRepository = new PaymentRepositoryImpl()
    this.orderService = new OrderServiceImpl()
  }

  addPayment = async (payment: Payment): Promise<Payment> => {
    const order = await this.orderService.getOrder(payment.order._id.toString())
    if (order == null) {
      throw new AppError(`Order with id ${payment.order._id} doesn't exist!`, 404)
    }

    return await this.paymentRepository.create(payment).then((createdPayment: Payment) => {
      logger.info(`Payment with id ${createdPayment._id} has been created!`)
      return createdPayment
    }).catch(error => {
      throw new AppError(error)
    })
  }

  removePayment = async (paymentId: string): Promise<Payment> => {
    const currentPayment = await this.paymentRepository.findById(paymentId)
    if (currentPayment == null) {
      throw new AppError(`Payment with id ${paymentId} doesn't exist!`, 404)
    }
    logger.info(`Payment with id ${paymentId} has been deleted!`)
    await this.paymentRepository.deleteById(paymentId)

    return currentPayment
  }

  getAllPayments = async (): Promise<Payment | Payment[]> => {
    return await this.paymentRepository.findAll()
  }

  getPayment = async (paymentId: string): Promise<Payment> => {
    return await this.paymentRepository.findById(paymentId).then(foundPayment => {
      if (foundPayment != null) {
        return foundPayment
      }
      throw new AppError(`Payment with id ${paymentId} doesn't exist!`, 404)
    }).catch(error => {
      throw new AppError(error.message, error.status)
    })
  }
}

export default PaymentServiceImpl
