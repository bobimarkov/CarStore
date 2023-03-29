import express, { type Request, type Response, type Router } from 'express'
const dealershipRouter: Router = express.Router()

dealershipRouter.get('/', (_req: Request, res: Response) => {
  res.send('All dealerships')
})

dealershipRouter.get('/:id', (req: Request, res: Response) => {
  res.send(`Dealership with id ${req.params.id}`)
})

export default dealershipRouter
