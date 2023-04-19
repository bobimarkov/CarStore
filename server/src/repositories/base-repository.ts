import { type Model, type Document, Types } from 'mongoose'
import type BaseRepository from './interfaces/base-repository.js'
import AppError from '../types/app-error.js'

class BaseRepositoryImpl<T extends Document> implements BaseRepository<T> {
  protected readonly model: Model<T>

  constructor (schemaModel: Model<T>) {
    this.model = schemaModel
  }

  create = async (item: T): Promise<T & Omit<T, '_id'>> => {
    return await this.model.create(item)
      .then(createdItem => createdItem)
      .catch(error => {
        throw new AppError(error)
      })
  }

  update = async (id: string, item: T): Promise<T> => {
    try {
      const foundItem = await this.findById(id)
      foundItem.set(item)
      const updatedItem = await foundItem.save()
      return updatedItem
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  deleteById = async (id: string): Promise<T & Omit<T, '_id'>> => {
    return await this.model.findOneAndDelete({ _id: Types.ObjectId.createFromHexString(id) })
      .then(deletedItem => deletedItem!)
      .catch(error => {
        throw new AppError(error)
      })
  }

  findAll = async (toPopulate?: string): Promise<T | T[]> => {
    try {
      const query = this.model.find({})
      if (toPopulate != null) {
        return await query.populate(toPopulate).exec()
      }
      return await query.exec()
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  findById = async (id: string, toPopulate?: string): Promise<T> => {
    try {
      const query = this.model.findOne({ _id: Types.ObjectId.createFromHexString(id) })
      if (toPopulate != null) {
        const foundItem = await query.populate(toPopulate).exec()
        return foundItem! as T
      }
      const foundItem = await query.exec()
      return foundItem!
    } catch (error) {
      throw new AppError('Item not found', 404)
    }
  }
}

export default BaseRepositoryImpl
