class Users {
  constructor () {
    this.all = []
  }

  addUser (id, name, room) {
    let user = { id, name, room }
    this.all.push(user)

    return this.all
  }

  getUser (id) {
    let user = this.all.filter(user => user.id === id)[0]

    return user
  }

  getUserByRoom (room) {
    let usersInRoom = this.all.filter(user => user.room === room)

    return usersInRoom
  }

  deleteUser (id) {
    let deletedUser = this.getUser(id)
    this.all = this.all.filter(user => user.id !== id)

    return deletedUser
  }
}

module.exports = Users
