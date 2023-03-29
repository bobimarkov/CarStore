import express, { type Request, type Response, type Router } from 'express'
const orderRouter: Router = express.Router()

orderRouter.get('/', (_req: Request, res: Response) => {
  res.send('All orders')
})

orderRouter.get('/:id', (req: Request, res: Response) => {
  res.send(`Order with id ${req.params.id}`)
})

export default orderRouter
