import type Report from '../../models/interfaces/report.js'

interface ReportService {
  addReport: (report: Report) => Promise<Report>
  getReport: (reportId: string) => Promise<Report>
  getAllReports: () => Promise<Report | Report[]>
  deleteReport: (reportId: string) => Promise<Report>

  closeReport: (reportId: string) => Promise<Report>
}

export default ReportService
