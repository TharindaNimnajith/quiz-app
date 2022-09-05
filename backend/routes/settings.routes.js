const express = require('express')
const SettingsController = require('../controllers/settings-controller')

const router = express.Router()

router.post('/settings', SettingsController.addSetting)
router.put('/settings', SettingsController.updateSetting)
router.get('/settings/:key', SettingsController.getSetting)

module.exports = router
