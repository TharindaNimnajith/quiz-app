const bcrypt = require('bcrypt')
const UserModel = require('../models/users.model')

require('dotenv').config()

const addUser = async (req, res) => {
  let existingUser

  let {
    firstName,
    lastName,
    email,
    password
  } = req.body

  try {
    existingUser = await UserModel.findOne({
      email: email
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  if (existingUser) {
    res.send({
      status: 409,
      message: 'A user with the same email already exists.'
    })
  }

  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 10),
    levels: [{
      lesson: 1,
      level: 'General'
    }, {
      lesson: 2,
      level: 'General'
    }, {
      lesson: 3,
      level: 'General'
    }, {
      lesson: 4,
      level: 'General'
    }],
    total: 0,
    results: []
  })

  try {
    await newUser.save()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 201,
    message: 'Congratulations! You have successfully registered as a student in iLearn. ' +
      'Now please login to iLearn and start your learning journey right now!'
  })
}

const addAdmin = async (req, res) => {
  let existingUser

  let {
    firstName,
    lastName,
    email,
    password
  } = req.body

  try {
    existingUser = await UserModel.findOne({
      email: email
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  if (existingUser) {
    res.send({
      status: 409,
      message: 'A user with the same email already exists.'
    })
  }

  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 10),
    userType: 'Admin'
  })

  try {
    await newUser.save()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 201,
    message: 'Administrator added successfully!'
  })
}

const updateUser = async (req, res) => {
  let user

  const {
    id
  } = req.params

  const {
    levels,
    total,
    results
  } = req.body

  try {
    user = await UserModel.findById(id)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  user.levels = levels
  user.total = total
  user.results = results

  try {
    await user.save()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    message: 'Results submitted successfully!',
    user: user
  })
}

const deleteUser = async (req, res) => {
  let user

  const {
    id
  } = req.params

  try {
    user = await UserModel.findById(id)
    await user.remove()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    message: 'User deleted successfully!'
  })
}

const getUser = async (req, res) => {
  let user

  const {
    id
  } = req.params

  try {
    user = await UserModel.findById(id)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    user: user
  })
}

const getUserList = async (req, res) => {
  let userList

  try {
    userList = await UserModel.find()
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  res.send({
    status: 200,
    userList: userList
  })
}

exports.addUser = addUser
exports.addAdmin = addAdmin
exports.updateUser = updateUser
exports.deleteUser = deleteUser
exports.getUser = getUser
exports.getUserList = getUserList
