import type Payment from '../models/interfaces/payment'
import paymentModel from '../models/payment'
import BaseRepositoryImpl from './base-repository'
import type PaymentRepository from './interfaces/payment-repository'

class PaymentRepositoryImpl extends BaseRepositoryImpl<Payment> implements PaymentRepository {
  constructor () {
    super(paymentModel)
  }
}

export default PaymentRepositoryImpl
