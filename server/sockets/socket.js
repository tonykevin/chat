const { io } = require('../')
const { Users } = require('../classes')
const { createMessage } = require('../utils')

const users = new Users()

io.on('connection', client => {
  client.on('joinChat', (data, callback) => {
    if (!data.name || !data.room) {
      return callback({
        err: true,
        message: 'El nombre/sala es necesario.'
      })
    }

    client.join(data.room)

    users.addUser(client.id, data.name, data.room)

    client.broadcast.to(data.room).emit(
      'userList',
      users.getUserByRoom(data.room)
    )

    callback(users.getUserByRoom(data.room))
  })

  client.on('createMessage', (data, callback) => {
    let user = users.getUser(client.id)
    let message = createMessage(user.name, data.message)

    client.broadcast.to(user.room).emit('createMessage', message)
    callback(message)
  })

  client.on('disconnect', () => {
    let deleteUser = users.deleteUser(client.id)

    client.broadcast.to(deleteUser.room).emit('createMessage', createMessage(
      'Administrador',
      `${deleteUser.name} salió`
    ))
    client.broadcast.to(deleteUser.room).emit('userList', users.getUserByRoom(deleteUser.room))
  })

  client.on('privateMessage', data => {
    let user = users.getUser(client.id)
    client.broadcast.to(data.to).emit('privateMessage', createMessage(
      user.name,
      data.message
    ))
  })
})
