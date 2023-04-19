import carModel from '../models/car.js'
import type Car from '../models/interfaces/car.js'
import BaseRepositoryImpl from './base-repository.js'
import type CarRepository from './interfaces/car-repository.js'

class CarRepositoryImpl extends BaseRepositoryImpl<Car> implements CarRepository {
  constructor () {
    super(carModel)
  }
}

export default CarRepositoryImpl
