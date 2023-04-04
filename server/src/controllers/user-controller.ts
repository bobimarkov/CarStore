import { type NextFunction, type Request, type Response } from 'express'
import UserServiceImpl from '../services/user-service.js'
import type UserService from '../services/interfaces/user-service.js'

class UserController {
  private readonly userService: UserService

  constructor () {
    this.userService = new UserServiceImpl()
  }

  registerUser = (req: Request, res: Response, next: NextFunction): void => {
    this.userService.addUser(req.body).then(user => {
      // TODO: Location header with the path to the new resource when 201
      res.status(201).json(user.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  listAllUsers = (_req: Request, res: Response, next: NextFunction): void => {
    this.userService.getAllUsers().then(users => {
      res.json(users)
    }).catch(error => {
      next(error)
    })
  }

  getUser = (req: Request, res: Response, next: NextFunction): void => {
    this.userService.getUserById(req.params.id).then(user => {
      res.json(user)
    }).catch(error => {
      next(error)
    })
  }
}

export default UserController
