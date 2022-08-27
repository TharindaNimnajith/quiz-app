const express = require('express')
const UsersController = require('../controllers/users-controller')

const router = express.Router()

router.post('/users', UsersController.addUser)
router.post('/admin', UsersController.addAdmin)
router.put('/users/:id', UsersController.updateUser)
router.delete('/users/:id', UsersController.deleteUser)
router.get('/users/:id', UsersController.getUser)
router.get('/users', UsersController.getUserList)

module.exports = router
