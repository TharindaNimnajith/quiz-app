const bcrypt = require('bcrypt')
const UserModel = require('../models/users.model')

const login = async (req, res) => {
  let user

  const {
    email,
    password
  } = req.body

  try {
    user = await UserModel.findOne({
      email: email
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

  if (user && bcrypt.compareSync(password, user.password)) {
    res.send({
      status: 200,
      user: user
    })
  } else {
    res.send({
      status: 401,
      message: 'Incorrect email or password! Please double check and try again.'
    })
  }
}

module.exports = {
  login
}
