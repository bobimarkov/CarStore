/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Router } from 'express'
import UserController from '../controllers/user-controller.js'
const userRouter: Router = express.Router()

const controller = new UserController()

userRouter.get('/', controller.listAllUsers)

userRouter.post('/', controller.registerUser)

userRouter.get('/:id', controller.getUser)

export default userRouter
