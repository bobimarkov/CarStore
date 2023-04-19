import { type Types, type Document } from 'mongoose'

enum DealershipRequestStatus {
  REQUESTED = 'Requested', APPROVED = 'Approved', DECLINED = 'Declined'
}

interface DealershipRequest extends Document {
  name: string
  UIC: string
  description?: string
  manager: Types.ObjectId
  status: string
  createdAt: number
  updatedAt: number
}

export { DealershipRequestStatus }
export default DealershipRequest
