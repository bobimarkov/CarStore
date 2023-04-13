import type Message from '../models/interfaces/message.js'
import type MessageService from './interfaces/message-service.js'
import type MessageRepository from '../repositories/interfaces/message-repository.js'
import MessageRepositoryImpl from '../repositories/message-repository.js'
import AppError from '../types/app-error.js'
import type UserService from './interfaces/user-service.js'
import UserServiceImpl from './user-service.js'

class MessageServiceImpl implements MessageService {
  private readonly messageRepository: MessageRepository
  private readonly userService: UserService

  constructor () {
    this.messageRepository = new MessageRepositoryImpl()
    this.userService = new UserServiceImpl()
  }

  getAllMessengers = async (fromId: string): Promise<string[]> => {
    const sender = await this.userService.getUserById(fromId)
    if (sender == null) {
      throw new AppError(`User with id ${fromId} doesn't exist!`, 404)
    }
    const messages = await this.messageRepository.getAllMessagesFrom(fromId)
    const allReceivers = [...new Set(messages?.map(message => message.to.toString()))]

    return allReceivers
  }

  getAllMessages = async (fromId: string, toId: string): Promise<Message[] | null> => {
    const sender = await this.userService.getUserById(fromId)
    if (sender == null) {
      throw new AppError(`Sender with id ${fromId} doesn't exist!`, 404)
    }
    const receiver = await this.userService.getUserById(toId)
    if (receiver == null) {
      throw new AppError(`Receiver with id ${toId} doesn't exist!`, 404)
    }
    return await this.messageRepository.getAllMessagesFromTo(fromId, toId)
  }

  addMessage = async (message: Message): Promise<Message> => {
    const sender = await this.userService.getUserById(message.from.toString())
    if (sender == null) {
      throw new AppError(`Sender with id ${message.from.toString()} doesn't exist!`, 404)
    }
    const receiver = await this.userService.getUserById(message.to.toString())
    if (receiver == null) {
      throw new AppError(`Receiver with id ${message.to.toString()} doesn't exist!`, 404)
    }
    return await this.messageRepository.create(message)
  }
}

export default MessageServiceImpl
