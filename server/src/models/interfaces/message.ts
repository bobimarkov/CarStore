import { type Document, type Types } from 'mongoose'

interface Message extends Document {
  from: Types.ObjectId
  to: Types.ObjectId
  body: string
  createdAt: number
  updatedAt: number
}

export default Message
