class Users {
  constructor () {
    this.all = new Map()
  }

  addUser (id, name) {
    this.all.set(id, name)

    return this.all
  }

  getUser (id) {
    let user = this.all.get(id)

    return user
  }

  getUserByThread () {
    throw new Error('You must implement the getUserByThread() method')
  }

  deleteUser (id) {
    let deletedUser = this.getUser(id)
    this.users = this.all.delete(id)

    return deletedUser
  }
}

module.exports = Users
