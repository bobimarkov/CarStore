import { type Types, type Document } from 'mongoose'

enum ReportTargetTypes {
  REVIEW = 'Review', USER = 'User', PRODUCT = 'Product', DEALERSHIP = 'Dealership'
}

enum ReportStatus {
  OPEN = 'Open', CLOSED = 'Closed'
}

interface ReportTarget {
  target: Types.ObjectId
  type: string
}

interface Report extends Document {
  from: Types.ObjectId
  about: ReportTarget
  reason: string
  status: string
}

export { type ReportTarget, ReportTargetTypes, ReportStatus }
export default Report
