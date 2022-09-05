const SettingsModel = require('../models/settings.model')

const addSetting = async (req, res) => {
  let existingSetting

  let {
    key,
    value
  } = req.body

  try {
    existingSetting = await SettingsModel.findOne({
      key: key
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  if (existingSetting) {
    res.send({
      status: 409,
      message: 'A setting with the same key already exists.'
    })
  }

  const newSetting = new SettingsModel({
    key,
    value
  })

  try {
    await newSetting.save()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 201,
    message: 'New setting added successfully!'
  })
}

const updateSetting = async (req, res) => {
  let setting

  const {
    id
  } = req.params

  const {
    value
  } = req.body

  try {
    setting = await SettingsModel.findById(id)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  setting.value = value

  try {
    await setting.save()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    message: 'Updated successfully!',
    setting: setting
  })
}

const getSetting = async (req, res) => {
  let setting

  const {
    id
  } = req.params

  try {
    setting = await SettingsModel.findById(id)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    setting: setting
  })
}

const getSettingsList = async (req, res) => {
  let settingsList

  try {
    settingsList = await SettingsModel.find()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    settingsList: settingsList
  })
}

exports.addSetting = addSetting
exports.updateSetting = updateSetting
exports.getSetting = getSetting
exports.getSettingsList = getSettingsList
