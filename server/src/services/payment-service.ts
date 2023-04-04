import { type Types } from 'mongoose'
import type Payment from '../models/interfaces/payment'
import type PaymentService from './interfaces/payment-service'

class PaymentServiceImpl implements PaymentService {
  constructor () {
    super(paymentModel)
  }

  addPayment: (payment: Payment) => Payment
  removePayment: (paymentId: Types.ObjectId) => Payment
  getAllPayments: () => Payment[]
  getPayment: (paymentId: Types.ObjectId) => Payment
}

export default PaymentServiceImpl
