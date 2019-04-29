class Users {
  constructor () {
    this.people = []
  }

  addUser (id, name) {
    let user = { id, name }
    this.people.push(user)

    return this.people
  }

  getUser (id) {
    let user = this.people.filter(person => person.id === id)[0]

    return user
  }

  getUserByThread () {
    throw new Error('You must implement the getUserByThread() method')
  }

  deleteUser (id) {
    let deletedUser = this.getUser(id)
    this.people = this.people.filter(user => user.id !== id)

    return deletedUser
  }

  get people () {
    return this.people
  }
}

module.exports = Users
