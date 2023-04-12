import { type NextFunction, type Request, type Response } from 'express'

interface ReportController {
  addReport: (req: Request, res: Response, next: NextFunction) => void
  getReport: (req: Request, res: Response, next: NextFunction) => void
  getAllReports: (req: Request, res: Response, next: NextFunction) => void
  deleteReport: (req: Request, res: Response, next: NextFunction) => void

  closeReport: (req: Request, res: Response, next: NextFunction) => void
}

export default ReportController
