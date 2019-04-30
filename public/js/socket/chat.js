const socket = io()

var params = new URLSearchParams(window.location.search)

if (!params.has('name') || !params.has('room')) {
  window.location = 'index.html'
  throw new Error('El nombre y sala son necesarios')
}

let user = {
  name: params.get('name'),
  room: params.get('room')
}

socket.on('connect', () => {
  console.log('Connected to the server')

  socket.emit('joinChat', user, (res) => {
    renderUsers(res)
  })
})

socket.on('disconnect', () => {
  console.log('we lost connection to the server')
})

socket.on('createMessage', message => {
  console.log('Servidor:', message)
})

socket.on('userList', userList => {
  renderUsers(userList)
})

socket.on('privateMessage', (message) => {
  console.log('Mensaje privado:', message)
})
