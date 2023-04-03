import { type Model, type Document, type Types, type Query } from 'mongoose'
import type BaseRepository from './interfaces/base-repository'

class BaseRepositoryImpl<T extends Document> implements BaseRepository<T> {
  constructor (private readonly model: Model<Document>) {
    this.model = model
  }

  async create (item: T): Promise<Document & Omit<Document, '_id'>> {
    return await this.model.create(item)
  }

  async update (item: T): Promise<Document> {
    return await this.findById(item._id).then(async entity => {
      entity!.set(item)
      return await entity!.save()
    }).catch(error => {
      throw new Error(error)
    })
  }

  async deleteById (id: Types.ObjectId): Promise<Document & Omit<Document, '_id'>> {
    return await this.model.findById({ _id: id }).deleteOne()
  }

  async findAll (): Promise<T | T[]> {
    return await this.model.find({})
  }

  findById (id: Types.ObjectId): Query<T | null, T> {
    return this.model.findOne({ _id: id })
  }
}

export default BaseRepositoryImpl
