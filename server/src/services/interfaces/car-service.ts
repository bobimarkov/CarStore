import type Car from '../../models/interfaces/car.js'
import { type Review } from '../../models/interfaces/car.js'

interface CarService {
  addCar: (car: Car) => Promise<Car>
  updateCar: (carId: string, car: Car) => Promise<Car>
  deleteCar: (carId: string) => Promise<Car>
  getAllCars: () => Promise<Car | Car[]>
  getCar: (id: string) => Promise<Car>

  addReview: (carId: string, review: Review) => Promise<Car>
  deleteReview: (carId: string, reviewId: string) => Promise<Car>
  updateReview: (carId: string, reviewId: string, review: Review) => Promise<Car>
}

export default CarService
