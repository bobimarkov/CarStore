import type Car from '../../models/interfaces/car.js'
import type Dealership from '../../models/interfaces/dealership.js'

interface DealershipService {
  addDealership: (dealership: Dealership) => Promise<Dealership>
  updateDealership: (dealershipId: string, dealership: Dealership) => Promise<Dealership>
  deleteDealership: (dealershipId: string) => Promise<Dealership>
  getAllDealerships: () => Promise<Dealership | Dealership[]>
  getDealership: (dealershipId: string) => Promise<Dealership>

  recruitDealer: (dealershipId: string, userId: string) => Promise<Dealership>
  fireDealer: (dealershipId: string, userId: string) => Promise<Dealership>

  // TODO Ще се създаде кола тук в Cars колекция. Ще и бъде наложен dealershipdId и ще се извика метод createCar от CarService layer. Адресът на ендпоинта е в документа на Траян.
  addCarToDealership: (dealershipId: string, car: Car) => Promise<Dealership>
  removeCarFromDealership: (dealershipId: string, carId: string) => Promise<Dealership>

  getStatistics: () => void
}

export default DealershipService
