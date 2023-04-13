import express from 'express'
import DealershipRequestControllerImpl from '../controllers/dealership-request-controller.js'
import type DealershipRequestController from '../controllers/interfaces/dealership-request-controller.js'

const dealershipRequestRouter = express.Router()

const dealershipRequestController: DealershipRequestController = new DealershipRequestControllerImpl()

dealershipRequestRouter.post('/', dealershipRequestController.addRequest)
dealershipRequestRouter.get('/', dealershipRequestController.getAllRequests)
dealershipRequestRouter.get('/:id', dealershipRequestController.getRequest)
dealershipRequestRouter.delete('/:id', dealershipRequestController.deleteRequest)
dealershipRequestRouter.put('/:id/approve', dealershipRequestController.approveRequest)
dealershipRequestRouter.put('/:id/decline', dealershipRequestController.declineRequest)

export default dealershipRequestRouter
