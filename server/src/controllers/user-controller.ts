import { type NextFunction, type Request, type Response } from 'express'
import UserServiceImpl from '../services/user-service.js'
import type UserService from '../services/interfaces/user-service.js'
import type UserController from './interfaces/user-controller.js'

class UserControllerImpl implements UserController {
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

  getAllUsers = (_req: Request, res: Response, next: NextFunction): void => {
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

  updateUser = (req: Request, res: Response, next: NextFunction): void => {
    this.userService.updateUser(req.params.id, req.body).then(user => {
      res.json(user.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  deleteUser = (req: Request, res: Response, next: NextFunction): void => {
    this.userService.deleteUser(req.params.id).then(user => {
      res.json(user.toJSON())
    }).catch(error => {
      next(error)
    })
  }
}

export default UserControllerImpl
