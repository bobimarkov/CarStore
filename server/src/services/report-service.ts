import type Report from '../models/interfaces/report.js'
import { ReportStatus, ReportTargetTypes } from '../models/interfaces/report.js'
import type ReportRepository from '../repositories/interfaces/report-repository.js'
import ReportRepositoryImpl from '../repositories/report-repository.js'
import AppError from '../types/app-error.js'
import logger from '../utils/logger.js'
import CarServiceImpl from './car-service.js'
import DealershipServiceImpl from './dealership-service.js'
import type CarService from './interfaces/car-service.js'
import type DealershipService from './interfaces/dealership-service.js'
import type ReportService from './interfaces/report-service.js'
import type ReviewService from './interfaces/review-service.js'
import type UserService from './interfaces/user-service.js'
import ReviewServiceImpl from './review-service.js'
import UserServiceImpl from './user-service.js'

class ReportServiceImpl implements ReportService {
  private readonly reportRepository: ReportRepository
  private readonly reviewService: ReviewService
  private readonly userService: UserService
  private readonly carService: CarService
  private readonly dealershipService: DealershipService

  constructor () {
    this.reportRepository = new ReportRepositoryImpl()
    this.reviewService = new ReviewServiceImpl()
    this.userService = new UserServiceImpl()
    this.carService = new CarServiceImpl()
    this.dealershipService = new DealershipServiceImpl()
  }

  addReport = async (report: Report): Promise<Report> => {
    try {
      const user = await this.userService.getUserById(report.from.toString())
      if (user == null) {
        throw new AppError(`User with id ${report.from} doesn't exist!`, 404)
      }

      switch (report.about.type) {
        case ReportTargetTypes.REVIEW:
          if (await this.reviewService.getReview(report.about.target.toString()) == null) {
            throw new AppError(`Review with id ${report.about.target} doesn't exist!`, 404)
          }
          break
        case ReportTargetTypes.USER:
          if (await this.userService.getUserById(report.about.target.toString()) == null) {
            throw new AppError(`User with id ${report.about.target} doesn't exist!`, 404)
          }
          break
        case ReportTargetTypes.PRODUCT:
          if (await this.carService.getCar(report.about.target.toString()) == null) {
            throw new AppError(`Car with id ${report.about.target} doesn't exist!`, 404)
          }
          break
        case ReportTargetTypes.DEALERSHIP:
          if (await this.dealershipService.getDealership(report.about.target.toString()) == null) {
            throw new AppError(`User with id ${report.about.target} doesn't exist!`, 404)
          }
          break
        default:
          throw new AppError('Invalid type of target')
      }

      const createdReport = await this.reportRepository.create(report)
      logger.info(`Report with id ${createdReport._id} has been created!`)
      return createdReport
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  getReport = async (reportId: string): Promise<Report> => {
    return await this.reportRepository.findById(reportId)
      .then(foundReport => {
        if (foundReport == null) {
          throw new AppError(`Report with id ${reportId} doesn't exist!`, 404)
        }
        return foundReport
      })
      .catch(async error => await Promise.reject(error))
  }

  getAllReports = async (): Promise<Report | Report[]> => {
    return await this.reportRepository.findAll()
      .then(reports => reports)
      .catch(async error => await Promise.reject(error))
  }

  deleteReport = async (reportId: string): Promise<Report> => {
    try {
      const currentReport = await this.reportRepository.findById(reportId)
      if (currentReport == null) {
        throw new AppError(`Report with id ${reportId} doesn't exist!`, 404)
      }
      logger.info(`Report with id ${reportId} has been deleted!`)
      await this.reportRepository.deleteById(reportId)

      return currentReport
    } catch (error) {
      return await Promise.reject(error)
    }
  }

  closeReport = async (reportId: string): Promise<Report> => {
    try {
      const reportRequest = await this.reportRepository.findById(reportId)
      if (reportRequest == null) {
        throw new AppError(`Report with id ${reportId} doesn't exist!`, 404)
      }

      if (reportRequest.status !== ReportStatus.OPEN) {
        throw new AppError(`The report with id ${reportId} has been already closed`)
      }

      reportRequest.status = ReportStatus.CLOSED
      return await this.reportRepository.update(reportId, reportRequest)
    } catch (error) {
      return await Promise.reject(error)
    }
  }
}

export default ReportServiceImpl
