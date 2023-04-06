import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express, { type Express, type NextFunction, type Request, type Response } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from './utils/logger.js'
import apiRouter from './routes/api.js'
import { fileURLToPath } from 'url'
import type AppError from './types/app-error.js'
dotenv.config()

const app: Express = express()
const PORT: string = process.env.PORT ?? '3000'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename: string = fileURLToPath(import.meta.url)
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname: string = path.dirname(__filename)

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '..', 'public')))

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Incoming <${req.socket.remoteAddress!}>: ${req.method.toUpperCase()} - ${req.url}`)

  res.on('finish', () => {
    logger.info(`Outgoing <${req.socket.remoteAddress!}>: ${req.method.toUpperCase()} - ${req.url} [${res.statusCode}]`)
  })
  next()
})

app.use('/api', apiRouter)

app.use('/', (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  const errMessage = err.message
  const errStack = err.stack
  const errStatus: number = err.status ?? 400

  logger.error(errStack)
  res.status(errStatus).json({ error: errMessage })
})

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404)
  res.format({
    html: () => {
      res.sendFile(path.join(__dirname, '..', 'views', '404.html'))
    },
    json: () => {
      res.json({ message: '404 Not Found!' })
    },
    default: () => {
      res.send('404 Not Found!')
    }
  })
})

mongoose.connect(process.env.DB_URI)
  .then(() => {
    logger.info('Connected with MongoDB.')

    app.listen(PORT, () => {
      logger.info(`Server is listening on port ${PORT}.`)
    })
  }).catch((e: Error) => {
    logger.error(e.message)
  })

/** TODO
 *  [X] MONGODB + MONGOOSE
 *  [X] MODELS
 *  [X] CONVERT TO TYPESCRIPT
 *  [] DOMAIN DRIVEN DESIGN IMPLEMENTATION (REPOSITORY, INTERFACES, SERVICES)
 *          Entity Interfaces -> Schema -> Repository -> Service -> Controller -> Routes
 *          [X] Interfaces
 *          [X] Schemas
 *          [X] Repositories
 *          [] Services
 *  [] CONTROLLERS
 *  [] CORS
 *  [] AUTH + JWT
 *  [] ALL MIDDLEWARE FUNCTIONS TO BE EXTRACTED IN SEPARATE FILES
 */
