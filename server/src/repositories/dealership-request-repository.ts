import type DealershipRequest from '../models/interfaces/dealership-request.js'
import dealershipRequestModel from '../models/dealership-request.js'
import BaseRepositoryImpl from './base-repository.js'
import type DealershipRequestRepository from './interfaces/dealership-request-repository.js'

class DealershipRequestRepositoryImpl extends BaseRepositoryImpl<DealershipRequest> implements DealershipRequestRepository {
  constructor () {
    super(dealershipRequestModel)
  }
}

export default DealershipRequestRepositoryImpl
