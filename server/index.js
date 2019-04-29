const express = require('express')
const socketIO = require('socket.io')

const { createServer } = require('http')
const { resolve } = require('path')

const app = express()
const server = createServer(app)

const publicPath = resolve(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

module.exports.io = socketIO(server)
require('./sockets')

server.listen(port, (err) => {
  if (err) {
    throw new Error(err)
  }

  console.log(`server running in port ${port}`)
})
