// noinspection JSUnresolvedVariable

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const uniqueValidator = require('mongoose-unique-validator')
const {lessons} = require('../config/enums.config')

const Schema = mongoose.Schema

const SettingsSchema = new Schema({
  settingId: {
    type: Number,
    required: false,
    unique: true,
    trim: true
  },
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: Number,
    default: 1,
    enum: lessons,
    required: true,
    unique: false,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'Settings'
})

SettingsSchema.plugin(uniqueValidator)

autoIncrement.initialize(mongoose.connection)

SettingsSchema.plugin(autoIncrement.plugin, {
  model: 'Settings',
  field: 'settingId',
  startAt: 1000,
  incrementBy: 1
})

module.exports = mongoose.model('Settings', SettingsSchema)
