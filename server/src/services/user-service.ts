import type User from '../models/interfaces/user.js'
import type UserService from './interfaces/user-service.js'
import type UserRepository from '../repositories/interfaces/user-repository.js'
import UserRepositoryImpl from '../repositories/user-repository.js'
import logger from '../utils/logger.js'
import AppError from '../types/app-error.js'
import { Types } from 'mongoose'

class UserServiceImpl implements UserService {
  private readonly userRepository: UserRepository

  constructor () {
    this.userRepository = new UserRepositoryImpl()
  }

  addUser = async (user: User): Promise<User> => {
    return await this.userRepository.create(user).then((createdUser: User) => {
      logger.info(`User with id ${createdUser._id} has been created!`)
      return createdUser
    }).catch(error => {
      throw new AppError(error)
    })
  }

  updateUser = async (userId: string, user: User): Promise<User> => {
    const currentUser = await this.userRepository.findById(userId)
    if (currentUser == null) {
      throw new AppError(`User with id ${userId} doesn't exist!`, 404)
    }
    logger.info(`User with id ${userId} has been updated!`)
    return await this.userRepository.update(userId, user)
  }

  deleteUser = async (userId: string): Promise<User> => {
    const currentUser = await this.userRepository.findById(userId)
    if (currentUser == null) {
      throw new AppError(`User with id ${userId} doesn't exist!`, 404)
    }
    logger.info(`User with id ${userId} has been deleted!`)
    const deletedUser = await this.userRepository.deleteById(userId)
    return deletedUser!
  }

  getAllUsers = async (): Promise<User | User[]> => {
    return await this.userRepository.findAll()
  }

  getUserById = async (userId: string): Promise<User> => {
    return await this.userRepository.findById(userId).then(foundUser => {
      if (foundUser != null) {
        return foundUser
      }
      throw new AppError(`User with id ${userId} doesn't exist!`, 404)
    }).catch(error => {
      throw new AppError(error.message, error.status)
    })
  }

  addUserToDealership = async (userId: string, dealershipId: string): Promise<void> => {
    const currentUser = await this.userRepository.findById(userId)
    if (currentUser == null) {
      throw new AppError("User doesn't exist", 404)
    }

    const currentDealerships: Types.ObjectId[] = currentUser.dealerships!
    const dealershipOId: Types.ObjectId = new Types.ObjectId(dealershipId)

    if (currentDealerships.includes(dealershipOId)) {
      throw new AppError(`The user with id ${userId} is already a dealer in dealership with id ${dealershipId}`, 409)
    }
    currentDealerships.push(dealershipOId)
    currentUser.set({ dealerships: currentDealerships })

    await this.userRepository.update(userId, currentUser)
  }

  removeUserFromDealership = async (userId: string, dealershipId: string): Promise<void> => {
    const currentUser = await this.userRepository.findById(userId)
    if (currentUser == null) {
      throw new AppError("User doesn't exist", 404)
    }

    const currentDealerships: Types.ObjectId[] = currentUser.dealerships!
    const dealershipOId: Types.ObjectId = new Types.ObjectId(dealershipId)

    if (!currentDealerships.includes(dealershipOId)) {
      throw new AppError(`The user with id ${userId} is not a dealer in dealership with id ${dealershipId}`, 409)
    }
    const dealershipIndex = currentDealerships.indexOf(dealershipOId, 0)
    currentDealerships.splice(dealershipIndex, 1)

    currentUser.set({ dealerships: currentDealerships })

    await this.userRepository.update(userId, currentUser)
  }
}

export default UserServiceImpl
