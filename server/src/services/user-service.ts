/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type User from '../models/interfaces/user.js'
import type UserService from './interfaces/user-service.js'
import type UserRepository from '../repositories/interfaces/user-repository.js'
import UserRepositoryImpl from '../repositories/user-repository.js'
import logger from '../utils/logger.js'

class UserServiceImpl implements UserService {
  private readonly userRepository: UserRepository

  constructor () {
    this.userRepository = new UserRepositoryImpl()
  }

  async addUser (user: User): Promise<User> {
    return await this.userRepository.create(user).then((createdUser: User) => {
      logger.info(`User with id ${createdUser._id} has been created!`)
      return createdUser
    }).catch(error => {
      throw new Error(error)
    })
  }

  async updateUser (user: User): Promise<User> {
    return await this.userRepository.update(user)
  }

  async deleteUser (userId: string): Promise<User> {
    return await this.userRepository.deleteById(userId)
  }

  async getAllUsers (): Promise<User | User[]> {
    return await this.userRepository.findAll()
  }

  async getUserById (id: string): Promise<User | null> {
    return await this.userRepository.findById(id).then(foundUser => {
      return foundUser
    }).catch(error => {
      throw new Error(error)
    })
  }
}

export default UserServiceImpl
