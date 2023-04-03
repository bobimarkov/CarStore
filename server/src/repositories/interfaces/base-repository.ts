import { type Query, type Types } from 'mongoose'

interface BaseRepository<T> {
  create: (item: T) => Promise<T & Omit<T, '_id'>>
  update: (item: T) => Promise<T>
  deleteById: (id: Types.ObjectId) => Promise<T & Omit<T, '_id'>>
  findAll: () => Promise<T | T[]>
  findById: (id: Types.ObjectId) => Query<T | null, T>
}

export default BaseRepository
