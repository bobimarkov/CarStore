import express, { type Router } from 'express'
import MessageControllerImpl from '../controllers/message-controller.js'
import type MessageController from '../controllers/interfaces/message-controller.js'
const messageRouter: Router = express.Router()

const messageController: MessageController = new MessageControllerImpl()

messageRouter.post('/', messageController.addMessage)
messageRouter.get('/:id', messageController.getMessengers)
messageRouter.get('/:fromId/:toId', messageController.getMessages)

export default messageRouter
