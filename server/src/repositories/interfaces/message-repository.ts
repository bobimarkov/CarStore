import type Message from '../../models/interfaces/message'
import type BaseRepository from './base-repository'

interface MessageRepository extends BaseRepository<Message> {
  getAllMessagesFrom: (senderId: string) => Promise<Message[]>
  getAllMessagesFromTo: (senderId: string, receiverId: string) => Promise<Message[]>
}

export default MessageRepository
