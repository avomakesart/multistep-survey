const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// const corsOptions = {
//   origin: 'http://localhost:5001',
// }

// Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes

const db = require('./models')
const Role = db.role

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db')
  initial()
})

function initial() {
  Role.create({
    id: 1,
    name: 'user',
  })

  Role.create({
    id: 2,
    name: 'moderator',
  })

  Role.create({
    id: 3,
    name: 'admin',
  })
}

// Projects routes
require('./routes/user-data.routes')(app)

// Auth routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
