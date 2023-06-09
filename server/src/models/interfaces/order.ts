import { type Document, type Types } from 'mongoose'

enum OrderStatus {
  ORDERED = 'Ordered', APPROVED = 'Approved', DECLINED = 'Declined', SHIPPED = 'Shipped'
}

interface Product {
  _id: Types.ObjectId
  product: Types.ObjectId
  quantity: number
}

interface Order extends Document {
  customer: Types.ObjectId
  status: string
  products: Types.DocumentArray<Product>
  createdAt: number
  updatedAt: number
}

export default Order
export { type Product, OrderStatus }
