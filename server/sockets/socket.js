const { io } = require('../')
const { Users } = require('../classes')
const { createMessage } = require('../utils')

const users = new Users()

io.on('connection', client => {
  client.on('joinChat', (data, callback) => {
    console.log(data)
    if (!data.name || !data.room) {
      return callback({
        err: true,
        message: 'El nombre/sala es necesario.'
      })
    }

    client.join(data.room)

    let userList = users.addUser(client.id, data.name, data.room)

    client.broadcast.emit('userList', users.all)
    callback(userList)
  })

  client.on('createMessage', (data) => {
    let user = users.getUser(client.id)
    let message = createMessage(user.name, data.message)

    client.broadcast.emit('createMessage', message)
  })

  client.on('disconnect', () => {
    let deleteUser = users.deleteUser(client.id)

    client.broadcast.emit('createMessage', createMessage(
      'Administrador',
      `${deleteUser.name} salió`
    ))
    client.broadcast.emit('userList', users.all)
  })

  client.on('privateMessage', data => {
    let user = users.getUser(client.id)
    client.broadcast.to(data.to).emit('privateMessage', createMessage(
      user.name,
      data.message
    ))
  })
})
