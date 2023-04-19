import type Payment from '../../models/interfaces/payment.js'
import type BaseRepository from './base-repository'

interface PaymentRepository extends BaseRepository<Payment> {

}

export default PaymentRepository
