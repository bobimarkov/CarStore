import type User from '../../models/interfaces/user.js'
import type BaseRepository from './base-repository.js'

interface UserRepository extends BaseRepository<User> {
  findByUsername: (username: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
}

export default UserRepository
