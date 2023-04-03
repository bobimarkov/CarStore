import { type Query } from 'mongoose'
import type User from '../../models/interfaces/user'
import type BaseRepository from './base-repository'

interface UserRepository extends BaseRepository<User> {
  findByUsername: (username: string) => Query<User | null, User>
  findByEmail: (email: string) => Query<User | null, User>
}

export default UserRepository
