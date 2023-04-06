class AppError extends Error {
  public status?: number

  constructor (message: string, status?: number) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
    this.status = status
    this.name = Error.name
    Error.captureStackTrace(this)
  }
}

export default AppError
