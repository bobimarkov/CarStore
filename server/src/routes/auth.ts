import express, { type Request, type Response, type Router } from 'express'
const authRouter: Router = express.Router()

authRouter.post('/login', (_req: Request, res: Response) => {
  res.send('Logged in')
})

authRouter.post('/logout', (_req: Request, res: Response) => {
  res.send('Logged out')
})

authRouter.get('/refresh', (_req: Request, res: Response) => {
  res.send('Token refreshed')
})

export default authRouter
