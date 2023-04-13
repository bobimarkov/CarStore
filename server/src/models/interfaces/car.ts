import { type Document, type Types } from 'mongoose'

interface Car extends Document {
  name: string
  description?: string
  dealership: Types.ObjectId
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
  reviews?: Types.Array<Types.ObjectId>
  createdAt: number
  updatedAt: number
}

export default Car
