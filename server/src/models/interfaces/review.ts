import { type Document, type Types } from 'mongoose'

interface Review extends Document {
  user: Types.ObjectId
  car: Types.ObjectId
  rating: number
  comment?: string
  createdAt: number
  updatedAt: number
}

export default Review
