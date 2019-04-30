class Users {
  constructor () {
    this.all = []
  }

  addUser (id, name) {
    let user = { id, name }
    this.all.push(user)

    return this.all
  }

  getUser (id) {
    let user = this.all.filter(person => person.id === id)[0]

    return user
  }

  getUserByThread () {
    throw new Error('You must implement the getUserByThread() method')
  }

  deleteUser (id) {
    let deletedUser = this.getUser(id)
    this.all = this.all.filter(user => user.id !== id)

    return deletedUser
  }
}

module.exports = Users
