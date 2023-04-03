import type Message from '../../models/interfaces/message'
import type BaseRepository from './base-repository'

interface MessageRepository extends BaseRepository<Message> {

}

export default MessageRepository
