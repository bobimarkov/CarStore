/* eslint-disable no-control-regex */
import { Schema, SchemaTypes, model } from 'mongoose'
import logger from '../utils/logger.js'
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
// const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\*\.!@\$%\^&\(\){}\[\]:;<>,\.\?\/~_\+-=\|]).{8,32}$/

const userSchema = new Schema({
  name: {
    firstName: String,
    lastName: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  email: {
    type: String,
    validate: {
      validator: (email: string) => emailRegex.test(email),
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: (props: any) => `The email ${props.value} is not in the correct format!`
    },
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    country: String,
    city: String
  },
  role: [{ // Roles are: USER, DEALER, DEALERSHIP_MANAGER, ADMIN
    type: String,
    default: 'USER'
  }],
  dealerships: [{
    type: SchemaTypes.ObjectId,
    ref: 'Dealership'
  }],
  is_blocked: {
    type: Boolean,
    default: false
  },
  is_messaging_blocked: {
    type: Boolean,
    default: false
  },
  is_reviewing_blocked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

userSchema.statics.findByUsername = function (username) {
  return this.find({ username: new RegExp(username, 'i') })
}

userSchema.statics.findByEmail = function (email) {
  return this.find({ email: new RegExp(email, 'i') })
}

userSchema.post('save', function (doc, next) {
  logger.info(`User with username ${doc.username} has been updated!`)
  next()
})

const userModel = model('User', userSchema)

export default userModel
