const { io } = require('../')
const { Users } = require('../classes')

const users = new Users()

io.on('connection', client => {
  client.on('joinChat', (data, callback) => {
    if (!data.name) {
      return callback({
        err: true,
        message: 'El nombre es necesario.'
      })
    }
    let userList = users.addUser(client.id, data.name)
    callback(userList)
  })
})
