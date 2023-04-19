import type Car from '../../models/interfaces/car'
import type BaseRepository from './base-repository'

interface CarRepository extends BaseRepository<Car> {

}

export default CarRepository
