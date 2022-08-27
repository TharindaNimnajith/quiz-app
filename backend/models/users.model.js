const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userTypes = [
  'Admin',
  'User'
]

const UsersSchema = new Schema({
  userId: {
    type: Number,
    required: false,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  lastName: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  userType: {
    type: String,
    enum: userTypes,
    required: false,
    unique: false,
    trim: true,
    default: 'User'
  }
}, {
  timestamps: true,
  collection: 'Users'
})

UsersSchema.plugin(uniqueValidator)

autoIncrement.initialize(mongoose.connection)

UsersSchema.plugin(autoIncrement.plugin, {
  model: 'Users',
  field: 'userId',
  startAt: 1000,
  incrementBy: 1
})

module.exports = mongoose.model('Users', UsersSchema)
