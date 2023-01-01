const accountImpl = require('../../impl/accountImpl/accountImpl')

class accountService {
  constructor() {
    this.accountImpl = new accountImpl()
  }

  permmenu() {
    return this.accountImpl.permmenu()
  }

  getUsers() {
    return this.accountImpl.getUsers()
  }

  getInfoByUserCode(data) {
    return this.accountImpl.getInfoByUserCode(data)
  }

  addUser(data) {
    return this.accountImpl.addUser(data)
  }

  updateUser(data) {
    return this.accountImpl.updateUser(data)
  }

  deleteUser(data) {
    return this.accountImpl.deleteUser(data)
  }

}

module.exports = accountService;