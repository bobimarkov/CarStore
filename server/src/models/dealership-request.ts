import { Schema, type Model, model, SchemaTypes } from 'mongoose'
import type DealershipRequest from './interfaces/dealership-request.js'
import { DealershipRequestStatus } from './interfaces/dealership-request.js'

const dealershipRequestSchema = new Schema<DealershipRequest, Model<DealershipRequest>>({
  name: {
    type: String,
    required: true
  },
  UIC: {
    type: String,
    required: true,
    unique: true,
    max: 9,
    min: 9
  },
  description: {
    type: String,
    maxLength: 2000
  },
  manager: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: DealershipRequestStatus,
    default: DealershipRequestStatus.REQUESTED
  }
},
{
  timestamps: true
})

const dealershipRequestModel = model<DealershipRequest, Model<DealershipRequest>>('Dealership Request', dealershipRequestSchema)

export default dealershipRequestModel
