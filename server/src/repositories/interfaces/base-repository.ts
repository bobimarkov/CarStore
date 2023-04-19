interface BaseRepository<T> {
  create: (item: T) => Promise<T & Omit<T, '_id'>>
  update: (id: string, item: T) => Promise<T>
  deleteById: (id: string) => Promise<T & Omit<T, '_id'>>
  findAll: (toPopulate?: string) => Promise<T | T[]>
  findById: (id: string, toPopulate?: string) => Promise<T>
}

export default BaseRepository
