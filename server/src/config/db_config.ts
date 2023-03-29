import mongoose from 'mongoose'
import logger from '../utils/logger.js'

async function connectDB (): Promise<void> {
  try {
    await mongoose.connect(process.env.DB_URI)
    logger.info('The connection with the database is successful')
  } catch (e: any) {
    logger.error(e.message)
  }
}

export default connectDB
