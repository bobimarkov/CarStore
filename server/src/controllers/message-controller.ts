import { type Request, type Response, type NextFunction } from 'express'
import type MessageService from '../services/interfaces/message-service.js'
import MessageServiceImpl from '../services/message-service.js'
import type MessageController from './interfaces/message-controller.js'

class MessageControllerImpl implements MessageController {
  private readonly messageService: MessageService

  constructor () {
    this.messageService = new MessageServiceImpl()
  }

  getMessengers = (req: Request, res: Response, next: NextFunction): void => {
    this.messageService.getAllMessengers(req.params.id).then(messengers => {
      res.json(messengers)
    }).catch(error => {
      next(error)
    })
  }

  getMessages = (req: Request, res: Response, next: NextFunction): void => {
    this.messageService.getAllMessages(req.params.fromId, req.params.toId).then(messages => {
      res.json(messages)
    }).catch(error => {
      next(error)
    })
  }

  addMessage = (req: Request, res: Response, next: NextFunction): void => {
    this.messageService.addMessage(req.body).then(message => {
      res.json(message)
    }).catch(error => {
      next(error)
    })
  }
}

export default MessageControllerImpl
