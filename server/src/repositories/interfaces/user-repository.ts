import type User from '../../models/interfaces/user.js'
import type BaseRepository from './base-repository.js'

interface UserRepository extends BaseRepository<User> {
  findByUsername: (username: string) => Promise<User>
  findByEmail: (email: string) => Promise<User>
}

export default UserRepository
