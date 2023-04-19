import type Order from '../../models/interfaces/order'
import type BaseRepository from './base-repository'

interface OrderRepository extends BaseRepository<Order> {

}

export default OrderRepository
