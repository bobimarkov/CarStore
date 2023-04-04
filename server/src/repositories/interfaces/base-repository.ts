import { type Query } from 'mongoose'

interface BaseRepository<T> {
  create: (item: T) => Promise<T & Omit<T, '_id'>>
  update: (item: T) => Promise<T>
  deleteById: (id: string) => Promise<T & Omit<T, '_id'>>
  findAll: () => Promise<T | T[]>
  findById: (id: string) => Query<T | null, T>
}

export default BaseRepository
