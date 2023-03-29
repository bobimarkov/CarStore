import express, { type Request, type Response, type Router } from 'express'
const messageRouter: Router = express.Router()

messageRouter.get('/', (_req: Request, res: Response) => {
  res.send('All chats')
})

messageRouter.get('/:id', (req: Request, res: Response) => {
  res.send(`Chat with user with id ${req.params.id}`)
})

export default messageRouter
