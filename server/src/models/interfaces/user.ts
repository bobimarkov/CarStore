import { type Types, type Document, type Date } from 'mongoose'

enum Roles {
  USER = 'User', DEALER = 'Dealer', DEALERSHIP_MANAGER = 'Dealership Manager', ADMIN = 'Admin'
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
  role: Types.Array<string>
  dealerships?: Types.Array<Types.ObjectId>
  is_blocked: boolean
  is_messaging_blocked: boolean
  is_reviewing_blocked: boolean
  createdAt: number
  updatedAt: number
}

export { type Names, type Address, type UserDocumentTypeOverride, Roles }
export default User
