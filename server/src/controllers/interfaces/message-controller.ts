import { type NextFunction, type Request, type Response } from 'express'

interface MessageController {
  getMessengers: (req: Request, res: Response, next: NextFunction) => void
  getMessages: (req: Request, res: Response, next: NextFunction) => void
  addMessage: (req: Request, res: Response, next: NextFunction) => void
}

export default MessageController
