const { io } = require('../')

io.on('connection', client => {
  console.log('Usuario conectado')

  client.emit('sendMessage', {
    user: 'Admin',
    message: 'Bienvenido!'
  })

  client.on('disconnect', () => {
    console.log('Usuario desconectado')
  })

  client.on('sendMessage', (data) => {
    client.broadcast.emit('sendMessage', data)
  })
})
