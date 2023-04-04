import { type Types } from 'mongoose'
import type Car from '../../models/interfaces/car'
import { type Review } from '../../models/interfaces/car'

interface CarService {
  addCar: (car: Car) => Promise<Car>
  updateCar: (car: Car) => Promise<Car>
  deleteCar: (carId: Types.ObjectId) => Promise<Car>
  getAllCars: () => Promise<Car | Car[]>
  getCarById: (id: Types.ObjectId) => Promise<Car | null>

  addReview: (carId: Types.ObjectId, review: Review) => Car
  deleteReview: (carId: Types.ObjectId, reviewId: Types.ObjectId) => Car
  updateReview: (carId: Types.ObjectId, reviewId: Types.ObjectId, review: Review) => Car
}

export default CarService
