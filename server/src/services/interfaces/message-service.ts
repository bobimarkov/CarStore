import type Message from '../../models/interfaces/message'

interface MessageService {
  getAllMessengers: (fromId: string) => string[]
  getAllMessages: (fromId: string, toId: string) => Message[]
  addMessage: (message: Message) => Message
}

export default MessageService
