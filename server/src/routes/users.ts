/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Router } from 'express'
import type UserController from '../controllers/user-controller.js'
import UserControllerImpl from '../controllers/user-controller.js'
const userRouter: Router = express.Router()

const controller: UserController = new UserControllerImpl()

userRouter.get('/', controller.getAllUsers)

userRouter.post('/', controller.registerUser)

userRouter.get('/:id', controller.getUser)

userRouter.put('/:id', controller.updateUser)

userRouter.delete('/:id', controller.deleteUser)

export default userRouter
