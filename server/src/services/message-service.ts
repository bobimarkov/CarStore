import { type Types } from 'mongoose'
import type Message from '../models/interfaces/message'
import type MessageService from './interfaces/message-service'

class MessageServiceImpl implements MessageService {
  constructor () {
    super(messageModel)
  }

  getAllMessengers: (fromId: Types.ObjectId) => string[]
  getAllMessages: (fromId: Types.ObjectId, toId: Types.ObjectId) => Message[]
  addMessage: (message: Message) => Message
}

export default MessageServiceImpl
