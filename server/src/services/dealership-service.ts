import type Dealership from '../models/interfaces/dealership'
import type DealershipService from './interfaces/dealership-service'

class DealershipServiceImpl implements DealershipService {
  constructor () {
    super(dealershipModel)
  }

  addDealership: () => Dealership
  removeDealership: () => Dealership
  updateDealership: () => Dealership
  getAllDealerships: () => Dealership[]
  getDealership: () => Dealership
  recruitDealer: () => Dealership
  fireDealer: () => Dealership
  addCarToDealership: () => Dealership
  removeCarFromDealership: () => Dealership
  getStatistics: () => void
}

export default DealershipServiceImpl
