import { type Model, Schema, SchemaTypes, model } from 'mongoose'
import type Message from './interfaces/message'

const messageSchema = new Schema<Message, Model<Message>>({
  from: {
    type: SchemaTypes.ObjectId,
    required: true
  },
  to: {
    type: SchemaTypes.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true,
    maxLength: 2000
  }
}, {
  timestamps: true
})

const messageModel = model<Message, Model<Message>>('message', messageSchema)

export default messageModel
