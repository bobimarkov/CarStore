import type Payment from '../../models/interfaces/payment'

interface PaymentService {
  addPayment: (payment: Payment) => Payment
  removePayment: (paymentId: string) => Payment
  getAllPayments: () => Payment[]
  getPayment: (paymentId: string) => Payment
}

export default PaymentService
