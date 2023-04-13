import { type Request, type Response, type NextFunction } from 'express'
import type ReportController from './interfaces/report-controller.js'
import type ReportService from '../services/interfaces/report-service.js'
import ReportServiceImpl from '../services/report-service.js'

class ReportControllerImpl implements ReportController {
  private readonly reportService: ReportService

  constructor () {
    this.reportService = new ReportServiceImpl()
  }

  addReport = (req: Request, res: Response, next: NextFunction): void => {
    this.reportService.addReport(req.body).then(report => {
      // TODO: Location header with the path to the new resource when 201
      res.status(201).json(report.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  getReport = (req: Request, res: Response, next: NextFunction): void => {
    this.reportService.getReport(req.params.id).then(report => {
      res.json(report)
    }).catch(error => {
      next(error)
    })
  }

  getAllReports = (_req: Request, res: Response, next: NextFunction): void => {
    this.reportService.getAllReports().then(reports => {
      res.json(reports)
    }).catch(error => {
      next(error)
    })
  }

  deleteReport = (req: Request, res: Response, next: NextFunction): void => {
    this.reportService.deleteReport(req.params.id).then(report => {
      res.json(report.toJSON())
    }).catch(error => {
      next(error)
    })
  }

  closeReport = (req: Request, res: Response, next: NextFunction): void => {
    this.reportService.closeReport(req.params.id).then(report => {
      res.json(report.toJSON())
    }).catch(error => {
      next(error)
    })
  }
}

export default ReportControllerImpl
