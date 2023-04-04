import { type Types } from 'mongoose'
import type Message from '../../models/interfaces/message'

interface MessageService {
  getAllMessengers: (fromId: Types.ObjectId) => string[]
  getAllMessages: (fromId: Types.ObjectId, toId: Types.ObjectId) => Message[]
  addMessage: (message: Message) => Message
}

export default MessageService
