import { type Query } from 'mongoose'
import type User from '../../models/interfaces/user.js'
import type BaseRepository from './base-repository.js'

interface UserRepository extends BaseRepository<User> {
  findByUsername: (username: string) => Query<User | null, User>
  findByEmail: (email: string) => Query<User | null, User>
}

export default UserRepository
