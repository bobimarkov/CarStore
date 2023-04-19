import type User from '../models/interfaces/user.js'
import userModel from '../models/user.js'
import AppError from '../types/app-error.js'
import BaseRepositoryImpl from './base-repository.js'
import type UserRepository from './interfaces/user-repository.js'

class UserRepositoryImpl extends BaseRepositoryImpl<User> implements UserRepository {
  constructor () {
    super(userModel)
  }

  async findByUsername (username: string): Promise<User> {
    return await this.model.findOne({ username }).exec()
      .then(user => user!)
      .catch(error => {
        throw new AppError(error)
      })
  }

  async findByEmail (email: string): Promise<User> {
    return await this.model.findOne({ email }).exec()
      .then(user => user!)
      .catch(error => {
        throw new AppError(error)
      })
  }
}

export default UserRepositoryImpl
