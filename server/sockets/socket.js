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

    client.broadcast.emit('userList', users.all)
    callback(userList)
  })

  client.on('disconnect', () => {
    let deleteUser = users.deleteUser(client.id)

    client.broadcast.emit('createMessage', {
      user: 'Administrador',
      message: `${deleteUser.name} abandonó el chat.`
    })
    client.broadcast.emit('userList', users.all)
  })
})
