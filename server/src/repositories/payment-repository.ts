import type Payment from '../models/interfaces/payment.js'
import paymentModel from '../models/payment.js'
import BaseRepositoryImpl from './base-repository.js'
import type PaymentRepository from './interfaces/payment-repository.js'

class PaymentRepositoryImpl extends BaseRepositoryImpl<Payment> implements PaymentRepository {
  constructor () {
    super(paymentModel)
  }
}

export default PaymentRepositoryImpl
