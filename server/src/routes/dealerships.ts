import express, { type Router } from 'express'
import DealershipControllerImpl from '../controllers/dealership-controller.js'
const dealershipRouter: Router = express.Router()

const dealershipController = new DealershipControllerImpl()

dealershipRouter.post('/', dealershipController.createDealership)
dealershipRouter.get('/', dealershipController.listAllDealerships)
dealershipRouter.get('/:id', dealershipController.getDealership)
dealershipRouter.put('/:id', dealershipController.updateDealership)
dealershipRouter.delete('/:id', dealershipController.deleteDealership)
dealershipRouter.post('/:id/dealers', dealershipController.recruitDealer)
dealershipRouter.delete('/:dealershipId/dealers/:dealerId', dealershipController.fireDealer)

export default dealershipRouter
