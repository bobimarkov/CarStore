import { type Document, type Types } from 'mongoose'

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
export { type Product }
