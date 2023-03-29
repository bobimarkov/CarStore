import express, { type Request, type Response, type Router } from 'express'
const userRouter: Router = express.Router()

userRouter.get('/', (_req: Request, res: Response) => {
  res.send('All users')
})

userRouter.get('/:id', (req: Request, res: Response) => {
  res.send(`User with id ${req.params.id}`)
})

export default userRouter
