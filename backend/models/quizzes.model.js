const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const quizLevels = [
  'General',
  '1A',
  '1B',
  '2A',
  '2B',
  '3A',
  '3B'
]

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
  quizDescription: {
    type: String,
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
    correctAnswer: {
      type: Number,
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
