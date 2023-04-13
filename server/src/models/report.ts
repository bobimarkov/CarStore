import { type Model, Schema, model, SchemaTypes } from 'mongoose'
import type Report from './interfaces/report.js'
import { ReportTargetTypes, type ReportTarget, ReportStatus } from './interfaces/report.js'

const reportTargetSchema = new Schema<ReportTarget>({
  target: {
    type: SchemaTypes.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ReportTargetTypes
  }
})

const reportSchema = new Schema<Report, Model<Report>>({
  from: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  about: {
    type: reportTargetSchema,
    required: true
  },
  reason: {
    type: String,
    required: true,
    max: 200
  },
  status: {
    type: String,
    enum: ReportStatus,
    default: ReportStatus.OPEN
  }
})

const reportModel = model<Report, Model<Report>>('Report', reportSchema)

export default reportModel
