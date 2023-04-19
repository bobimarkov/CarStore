import type Report from '../models/interfaces/report.js'
import reportModel from '../models/report.js'
import BaseRepositoryImpl from './base-repository.js'
import type ReportRepository from './interfaces/report-repository.js'

class ReportRepositoryImpl extends BaseRepositoryImpl<Report> implements ReportRepository {
  constructor () {
    super(reportModel)
  }
}

export default ReportRepositoryImpl
