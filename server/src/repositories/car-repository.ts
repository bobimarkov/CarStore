import carModel from '../models/car'
import type Car from '../models/interfaces/car'
import BaseRepositoryImpl from './base-repository'
import type CarRepository from './interfaces/car-repository'

class CarRepositoryImpl extends BaseRepositoryImpl<Car> implements CarRepository {
  constructor () {
    super(carModel)
  }
}

export default CarRepositoryImpl
