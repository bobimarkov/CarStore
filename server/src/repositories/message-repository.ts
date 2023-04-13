import { Types } from 'mongoose'
import type Message from '../models/interfaces/message.js'
import messageModel from '../models/message.js'
import BaseRepositoryImpl from './base-repository.js'
import type MessageRepository from './interfaces/message-repository.js'

class MessageRepositoryImpl extends BaseRepositoryImpl<Message> implements MessageRepository {
  constructor () {
    super(messageModel)
  }

  getAllMessagesFrom = async (senderId: string): Promise<Message[] | null> => {
    return await this.model.find({ from: Types.ObjectId.createFromHexString(senderId) }).exec()
  }

  getAllMessagesFromTo = async (senderId: string, receiverId: string): Promise<Message[] | null> => {
    const senderOId = Types.ObjectId.createFromHexString(senderId)
    const receiverOId = Types.ObjectId.createFromHexString(receiverId)
    return await this.model.find({ $or: [{ from: senderOId, to: receiverOId }, { from: receiverOId, to: senderOId }] }).exec()
  }
}

export default MessageRepositoryImpl
