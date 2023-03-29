import dotenv from 'dotenv'

import express, { type Express, type NextFunction, type Request, type Response } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from './utils/logger.js'
import connectDB from './config/db_config.js'
import apiRouter from './routes/api.js'
import { fileURLToPath } from 'url'
dotenv.config()

const app: Express = express()
const PORT: string = process.env.PORT ?? '3000'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename: string = fileURLToPath(import.meta.url)
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname: string = path.dirname(__filename)

void connectDB()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '..', 'public')))

app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info(`${req.method.toUpperCase()} - ${req.url}`)
  next()
})

app.use('/api', apiRouter)

app.use('/', (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const errMessage = err.message
  const errStack = err.stack
  const errStatus: number = err.status ?? 500

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

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}.`)
})

/** TODO:
 *  [X] MONGODB + MONGOOSE
 *  [X] MODELS
 *  [X] CONVERT TO TYPESCRIPT
 *  [] DOMAIN DRIVEN DESIGN IMPLEMENTATION (REPOSITORY, INTERFACES)
 *  [] CONTROLLERS
 *  [] CORS
 *  [] AUTH + JWT
 */
