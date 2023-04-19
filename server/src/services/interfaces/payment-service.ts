import type Payment from '../../models/interfaces/payment'

interface PaymentService {
  addPayment: (payment: Payment) => Promise<Payment>
  deletePayment: (paymentId: string) => Promise<Payment>
  getAllPayments: () => Promise<Payment | Payment[]>
  getPayment: (paymentId: string) => Promise<Payment>
}

export default PaymentService
