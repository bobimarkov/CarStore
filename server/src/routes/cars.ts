import express, { type Request, type Response, type Router } from 'express'
const carRouter: Router = express.Router()

carRouter.get('/', (_req: Request, res: Response) => {
  res.send('All cars')
})

carRouter.get('/:id', (req: Request, res: Response) => {
  res.send(`Car with id ${req.params.id}`)
})

export default carRouter
