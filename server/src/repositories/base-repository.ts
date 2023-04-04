import { type Model, type Document, Types, type Query } from 'mongoose'
import type BaseRepository from './interfaces/base-repository.js'

class BaseRepositoryImpl<T extends Document> implements BaseRepository<T> {
  protected readonly model: Model<T>

  constructor (schemaModel: Model<T>) {
    this.model = schemaModel
  }

  async create (item: T): Promise<T & Omit<T, '_id'>> {
    return await this.model.create(item)
  }

  async update (item: T): Promise<T> {
    return await this.findById(item._id).then(async entity => {
      entity!.set(item)
      return await entity!.save()
    }).catch(error => {
      throw new Error(error)
    })
  }

  async deleteById (id: string): Promise<T & Omit<T, '_id'>> {
    return await this.model.find({ _id: Types.ObjectId.createFromHexString(id) }).deleteOne()
  }

  async findAll (): Promise<T | T[]> {
    return await this.model.find({})
  }

  findById (id: string): Query<T | null, T> {
    return this.model.findOne({ _id: Types.ObjectId.createFromHexString(id) })
  }
}

export default BaseRepositoryImpl
