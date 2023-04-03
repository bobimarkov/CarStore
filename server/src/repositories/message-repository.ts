import type Message from '../models/interfaces/message'
import messageModel from '../models/message'
import BaseRepositoryImpl from './base-repository'
import type MessageRepository from './interfaces/message-repository'

class MessageRepositoryImpl extends BaseRepositoryImpl<Message> implements MessageRepository {
  constructor () {
    super(messageModel)
  }
}

export default MessageRepositoryImpl
