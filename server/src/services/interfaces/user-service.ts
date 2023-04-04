import type User from '../../models/interfaces/user.js'

interface UserService {
  addUser: (user: User) => Promise<User>
  updateUser: (user: User) => Promise<User>
  deleteUser: (userId: string) => Promise<User>
  getAllUsers: () => Promise<User | User[]>
  getUserById: (userId: string) => Promise<User | null>
}

export default UserService
