import type Order from '../../models/interfaces/order'

interface OrderService {
  addOrder: (order: Order) => Order
  deleteOrder: (orderId: string) => Order
  updateOrder: (orderId: string, newOrder: Order) => Order
  getAllOrders: () => Order
  getOrder: (orderId: string) => Order
}

export default OrderService
