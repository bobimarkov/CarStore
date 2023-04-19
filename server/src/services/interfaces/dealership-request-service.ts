import type DealershipRequest from '../../models/interfaces/dealership-request.js'
import type Dealership from '../../models/interfaces/dealership.js'

interface DealershipRequestService {
  addRequest: (request: DealershipRequest) => Promise<DealershipRequest>
  getRequest: (requestId: string) => Promise<DealershipRequest>
  getAllRequests: () => Promise<DealershipRequest | DealershipRequest[]>
  deleteRequest: (requestId: string) => Promise<DealershipRequest>

  approveRequest: (requestId: string) => Promise<Dealership>
  declineRequest: (requestId: string) => Promise<DealershipRequest>
}

export default DealershipRequestService
