// noinspection JSUnresolvedVariable

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const uniqueValidator = require('mongoose-unique-validator')
const {lessons, quizLevels, answers} = require('../config/enums.config')

const Schema = mongoose.Schema

const QuizzesSchema = new Schema({
  quizId: {
    type: Number,
    required: false,
    unique: true,
    trim: true
  },
  quizTitle: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  lesson: {
    type: Number,
    enum: lessons,
    required: true,
    unique: false,
    trim: true
  },
  quizLevel: {
    type: String,
    enum: quizLevels,
    required: true,
    unique: false,
    trim: true
  },
  questions: [{
    question: {
      type: String,
      required: true,
      unique: false,
      trim: true
    },
    hints: {
      type: String,
      required: false,
      unique: false,
      trim: true
    },
    answer1: {
      type: String,
      required: true,
      unique: false,
      trim: true
    },
    answer2: {
      type: String,
      required: true,
      unique: false,
      trim: true
    },
    answer3: {
      type: String,
      required: true,
      unique: false,
      trim: true
    },
    answer4: {
      type: String,
      required: true,
      unique: false,
      trim: true
    },
    answer5: {
      type: String,
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
  collection: 'Quizzes'
})

QuizzesSchema.plugin(uniqueValidator)

autoIncrement.initialize(mongoose.connection)

QuizzesSchema.plugin(autoIncrement.plugin, {
  model: 'Quizzes',
  field: 'quizId',
  startAt: 1000,
  incrementBy: 1
})

module.exports = mongoose.model('Quizzes', QuizzesSchema)
