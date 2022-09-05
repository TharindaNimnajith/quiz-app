// noinspection JSUnresolvedFunction

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const cors = require('cors')
const compression = require('compression')
const HttpErrors = require('./config/errors.config')
const UsersRoutes = require('./routes/users.routes')
const AuthRoutes = require('./routes/auth.routes')
const QuizzesRoutes = require('./routes/quizzes.routes')
const SettingsRoutes = require('./routes/settings.routes')

require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.use(compression())
app.use(cors())
app.use(helmet())

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/users', UsersRoutes)
app.use('/auth', AuthRoutes)
app.use('/quizzes', QuizzesRoutes)
app.use('/settings', SettingsRoutes)

app.get('*', (req, res) => {
  res.status(200).send('Server is running');
})

app.use(() => {
  throw new HttpErrors('Could not find this route.', 404)
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1

const uri = process.env.ATLAS_URI
const port = process.env.PORT
const dbName = process.env.DATABASE

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: dbName
}

mongoose.connect(uri, options).then(() => {
  app.listen(port)
  console.log(`Server is running on port: ${port}`)
}).catch((error) => {
  console.error(error)
})

module.exports = app
