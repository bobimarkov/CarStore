import { type Query } from 'mongoose'
import type User from '../models/interfaces/user.js'
import userModel from '../models/user.js'
import BaseRepositoryImpl from './base-repository.js'
import type UserRepository from './interfaces/user-repository.js'

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
