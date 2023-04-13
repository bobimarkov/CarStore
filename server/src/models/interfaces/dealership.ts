import { type Document, type Types } from 'mongoose'

interface Dealership extends Document {
  name: string
  UIC: string
  description?: string
  bannerURL?: string
  manager: Types.ObjectId
  dealers?: Types.Array<Types.ObjectId>
  cars?: Types.Array<Types.ObjectId>
  orders?: Types.Array<Types.ObjectId>
  payments?: Types.Array<Types.ObjectId>
  createdAt: number
  updatedAt: number
}

export default Dealership
