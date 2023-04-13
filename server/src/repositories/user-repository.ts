import type User from '../models/interfaces/user.js'
import userModel from '../models/user.js'
import BaseRepositoryImpl from './base-repository.js'
import type UserRepository from './interfaces/user-repository.js'

class UserRepositoryImpl extends BaseRepositoryImpl<User> implements UserRepository {
  constructor () {
    super(userModel)
  }

  async findByUsername (username: string): Promise<User | null> {
    return await this.model.findOne({ username }).exec()
  }

  async findByEmail (email: string): Promise<User | null> {
    return await this.model.findOne({ email }).exec()
  }
}

export default UserRepositoryImpl
