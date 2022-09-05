const express = require('express')
const SettingsController = require('../controllers/settings-controller')

const router = express.Router()

router.post('/settings', SettingsController.addSetting)
router.put('/settings/:id', SettingsController.updateSetting)
router.get('/settings/:id', SettingsController.getSetting)
router.get('/settings', SettingsController.getSettingsList)

module.exports = router
