import type Payment from '../../models/interfaces/payment'
import type BaseRepository from './base-repository'

interface PaymentRepository extends BaseRepository<Payment> {

}

export default PaymentRepository
