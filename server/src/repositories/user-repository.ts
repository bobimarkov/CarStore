import { type Query } from 'mongoose'
import type User from '../models/interfaces/user'
import userModel from '../models/user'
import BaseRepositoryImpl from './base-repository'
import type UserRepository from './interfaces/user-repository'

class UserRepositoryImpl extends BaseRepositoryImpl<User> implements UserRepository {
  constructor () {
    super(userModel)
  }

  findByUsername (username: string): Query<User | null, User> {
    return this.model.findOne({ username })
  }

  findByEmail (email: string): Query<User | null, User> {
    return this.model.findOne({ email })
  }
}

export default UserRepositoryImpl
