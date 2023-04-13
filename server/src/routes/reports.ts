import express from 'express'
import type ReportController from '../controllers/interfaces/report-controller.js'
import ReportControllerImpl from '../controllers/report-controller.js'
const reportRouter = express.Router()

const reportController: ReportController = new ReportControllerImpl()

reportRouter.post('/', reportController.addReport)
reportRouter.get('/', reportController.getAllReports)
reportRouter.get('/:id', reportController.getReport)
reportRouter.delete('/:id', reportController.deleteReport)
reportRouter.put('/:id/close', reportController.closeReport)

export default reportRouter
