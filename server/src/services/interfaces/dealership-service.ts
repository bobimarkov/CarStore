import type Dealership from '../../models/interfaces/dealership'

interface DealershipService {
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

export default DealershipService
