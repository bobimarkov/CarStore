import { type NextFunction, type Request, type Response } from 'express'

interface UserController {
  registerUser: (req: Request, res: Response, next: NextFunction) => void
  getAllUsers: (req: Request, res: Response, next: NextFunction) => void
  getUser: (req: Request, res: Response, next: NextFunction) => void
  updateUser: (req: Request, res: Response, next: NextFunction) => void
  deleteUser: (req: Request, res: Response, next: NextFunction) => void
}

export default UserController
