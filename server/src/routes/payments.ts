import express, { type Request, type Response, type Router } from 'express'
const paymentRouter: Router = express.Router()

paymentRouter.get('/', (_req: Request, res: Response) => {
  res.send('All payments')
})

paymentRouter.get('/:id', (req: Request, res: Response) => {
  res.send(`Payment with id ${req.params.id}`)
})

export default paymentRouter
