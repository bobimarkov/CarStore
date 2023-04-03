import { type Query, type Document, type Types } from 'mongoose'

interface BaseRepository<T> {
  create: (item: T) => Promise<Document & Omit<Document, '_id'>>
  update: (item: T) => Promise<Document>
  deleteById: (id: Types.ObjectId) => Promise<Document & Omit<Document, '_id'>>
  findAll: () => Promise<T | T[]>
  findById: (id: Types.ObjectId) => Query<T | null, T>
}

export default BaseRepository
