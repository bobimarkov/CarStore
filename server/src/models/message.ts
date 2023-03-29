import { Schema, SchemaTypes, model } from 'mongoose'

const messageSchema = new Schema({
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

const messageModel = model('message', messageSchema)

export default messageModel
