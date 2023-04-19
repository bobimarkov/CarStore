import type Message from '../../models/interfaces/message'

interface MessageService {
  getAllMessengers: (fromId: string) => Promise<string[]>
  getAllMessages: (fromId: string, toId: string) => Promise<Message[] | null>
  addMessage: (message: Message) => Promise<Message>
}

export default MessageService
