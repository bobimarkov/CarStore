import dealershipModel from '../models/dealership.js'
import type Dealership from '../models/interfaces/dealership.js'
import BaseRepositoryImpl from './base-repository.js'
import type DealershipRepository from './interfaces/dealership-repository.js'

class DealershipRepositoryImpl extends BaseRepositoryImpl<Dealership> implements DealershipRepository {
  constructor () {
    super(dealershipModel)
  }
}

export default DealershipRepositoryImpl
