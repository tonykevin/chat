const socket = io()

const params = new URLSearchParams(window.location.search)

if (!params.has('name')) {
  window.location = 'index.html'
  throw new Error('El nombre es necesario')
}

let user = {
  name: params.get('name')
}

socket.on('connect', () => {
  console.log('Connected to the server')

  socket.emit('joinChat', user, (res) => {
    console.log(res)
  })
})

socket.on('disconnect', () => {
  console.log('we lost connection to the server')
})

socket.on('createMessage', message => {
  console.log('Servidor:', message)
})

socket.on('userList', userList => {
  console.log(userList)
})
