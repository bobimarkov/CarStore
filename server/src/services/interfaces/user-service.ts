import type User from '../../models/interfaces/user.js'

interface UserService {
  addUser: (user: User) => Promise<User>
  updateUser: (userId: string, user: User) => Promise<User>
  deleteUser: (userId: string) => Promise<User>
  getAllUsers: () => Promise<User | User[]>
  getUserById: (userId: string) => Promise<User>

  addUserToDealership: (userId: string, dealershipId: string) => Promise<void>
  removeUserFromDealership: (userId: string, dealershipId: string) => Promise<void>
}

export default UserService
