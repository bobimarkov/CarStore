import type Order from '../../models/interfaces/order'

interface OrderService {
  addOrder: (order: Order) => Promise<Order>
  deleteOrder: (orderId: string) => Promise<Order>
  updateOrder: (orderId: string, newOrder: Order) => Promise<Order>
  getAllOrders: () => Promise<Order>
  getOrder: (orderId: string) => Promise<Order>
}

export default OrderService
