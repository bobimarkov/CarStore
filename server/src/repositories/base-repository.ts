import { type Model, type Document, Types, type Query } from 'mongoose'
import type BaseRepository from './interfaces/base-repository.js'

class BaseRepositoryImpl<T extends Document> implements BaseRepository<T> {
  protected readonly model: Model<T>

  constructor (schemaModel: Model<T>) {
    this.model = schemaModel
  }

  create = async (item: T): Promise<T & Omit<T, '_id'>> => {
    return await this.model.create(item)
  }

  update = async (id: string, item: T): Promise<T> => {
    return await this.findById(id).then(async foundItem => {
      foundItem!.set(item)
      return await foundItem!.save()
    })
      .catch(error => {
        throw new Error(error)
      })
  }

  deleteById = async (id: string): Promise<T & Omit<T, '_id'> | null> => {
    return await this.model.findOneAndDelete({ _id: Types.ObjectId.createFromHexString(id) })
  }

  findAll = async (): Promise<T | T[]> => {
    return await this.model.find({})
  }

  findById = (id: string): Query<T | null, T> => {
    return this.model.findOne({ _id: Types.ObjectId.createFromHexString(id) })
  }
}

export default BaseRepositoryImpl
