import { type Types, type Document, type Date } from 'mongoose'

enum Roles {
  USER = 1, DEALER = 2, DEALERSHIP_MANAGER = 3, ADMIN = 4
}

interface Names {
  _id: Types.ObjectId
  firstName: string
  lastName: string
}

interface Address {
  _id: Types.ObjectId
  country: string
  city: string
}

interface UserDocumentTypeOverride {
  name: Types.Subdocument<Types.ObjectId> & Names
  address: Types.Subdocument<Types.ObjectId> & Address
}

interface User extends Document {
  name: Names
  username: string
  password: string
  email: string
  dateOfBirth: Date
  address?: Address
  role: Types.Array<number>
  dealerships?: Types.Array<Types.ObjectId>
  is_blocked: boolean
  is_messaging_blocked: boolean
  is_reviewing_blocked: boolean
  createdAt: number
  updatedAt: number
}

export { type Names, type Address, type UserDocumentTypeOverride, Roles }
export default User
