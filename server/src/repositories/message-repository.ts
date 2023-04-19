import { Types } from 'mongoose'
import type Message from '../models/interfaces/message.js'
import messageModel from '../models/message.js'
import BaseRepositoryImpl from './base-repository.js'
import type MessageRepository from './interfaces/message-repository.js'
import AppError from '../types/app-error.js'

class MessageRepositoryImpl extends BaseRepositoryImpl<Message> implements MessageRepository {
  constructor () {
    super(messageModel)
  }

  getAllMessagesFrom = async (senderId: string): Promise<Message[]> => {
    return await this.model.find({ from: Types.ObjectId.createFromHexString(senderId) }).exec()
      .then(messages => messages)
      .catch(error => {
        throw new AppError(error)
      })
  }

  getAllMessagesFromTo = async (senderId: string, receiverId: string): Promise<Message[]> => {
    const senderOId = Types.ObjectId.createFromHexString(senderId)
    const receiverOId = Types.ObjectId.createFromHexString(receiverId)
    return await this.model.find({ $or: [{ from: senderOId, to: receiverOId }, { from: receiverOId, to: senderOId }] }).exec()
      .then(messages => messages)
      .catch(error => {
        throw new AppError(error)
      })
  }
}

export default MessageRepositoryImpl
