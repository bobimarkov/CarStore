import type Message from '../../models/interfaces/message'
import type BaseRepository from './base-repository'

interface MessageRepository extends BaseRepository<Message> {
  getAllMessagesFrom: (senderId: string) => Promise<Message[] | null>
  getAllMessagesFromTo: (senderId: string, receiverId: string) => Promise<Message[] | null>
}

export default MessageRepository
