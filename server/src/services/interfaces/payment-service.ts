import { type Types } from 'mongoose'
import type Payment from '../../models/interfaces/payment'

interface PaymentService {
  addPayment: (payment: Payment) => Payment
  removePayment: (paymentId: Types.ObjectId) => Payment
  getAllPayments: () => Payment[]
  getPayment: (paymentId: Types.ObjectId) => Payment
}

export default PaymentService
