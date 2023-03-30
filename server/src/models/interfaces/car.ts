import { type Document, type Types } from 'mongoose'

interface Review {
  _id: Types.ObjectId
  user: Types.ObjectId
  comment?: string
  rating: number
  createdAt: number
  updatedAt: number
}

interface Car extends Document {
  name: string
  description?: string
  year: number
  type: string
  transmission: string
  hp: number
  fuelType: string
  mileage: number
  kml: number
  interiorColor?: string
  exteriorColor?: string
  price: number
  quantity: number
  photosURLs?: Types.Array<string>
  reviews?: Types.DocumentArray<Review>
  createdAt: number
  updatedAt: number
}

export default Car
export { type Review }
