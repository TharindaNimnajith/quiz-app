const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const uniqueValidator = require('mongoose-unique-validator')
const {userTypes, quizLevels, answers} = require('../config/enums.config')

const Schema = mongoose.Schema

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
  },
  level: {
    type: String,
    enum: userTypes,
    required: false,
    unique: false,
    trim: true
  },
  total: {
    type: Number,
    required: false,
    unique: false,
    trim: true
  },
  results: [{
    quizLevel: {
      type: String,
      enum: quizLevels,
      required: true,
      unique: false,
      trim: true
    },
    question: {
      type: String,
      required: true,
      unique: false,
      trim: true
    },
    studentAnswer: {
      type: Number,
      enum: answers,
      required: true,
      unique: false,
      trim: true
    },
    correctAnswer: {
      type: Number,
      enum: answers,
      required: true,
      unique: false,
      trim: true
    }
  }]
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
