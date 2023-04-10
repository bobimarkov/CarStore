import express, { type Router } from 'express'
import type CarController from '../controllers/interfaces/car-controller.js'
import CarControllerImpl from '../controllers/car-controller.js'
const carRouter: Router = express.Router()

const carController: CarController = new CarControllerImpl()

carRouter.post('/', carController.addCar)
carRouter.get('/', carController.listAllCars)
carRouter.get('/:id', carController.getCar)
carRouter.put('/:id', carController.updateCar)
carRouter.delete('/:id', carController.deleteCar)

carRouter.post('/:id/reviews', carController.addReview)
carRouter.put('/:carId/reviews/:reviewId', carController.updateReview)
carRouter.delete('/:carId/reviews/:reviewId', carController.deleteReview)

export default carRouter
