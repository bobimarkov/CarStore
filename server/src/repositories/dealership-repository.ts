import dealershipModel from '../models/dealership'
import type Dealership from '../models/interfaces/dealership'
import BaseRepositoryImpl from './base-repository'
import type DealershipRepository from './interfaces/dealership-repository'

class DealershipRepositoryImpl extends BaseRepositoryImpl<Dealership> implements DealershipRepository {
  constructor () {
    super(dealershipModel)
  }
}

export default DealershipRepositoryImpl
