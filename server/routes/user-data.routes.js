const controller = require('../controllers/user-data.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })
  // create project
  app.post('/api/user_data', controller.createUserData)

  // get all projects
  app.get('/api/user_data', controller.getUserData)

  // get a todo
  app.get('/api/user_data/:id', controller.getUserDataById)

  // update a project
  // app.put('/api/user_data/:id', controller.updateCertificate)

  // delete a project
  app.delete('/api/user_data/:id', controller.deleteUserData)
}
