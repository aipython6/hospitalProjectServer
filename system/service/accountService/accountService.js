const accountImpl = require('../../impl/accountImpl/accountImpl')

class accountService {
  constructor() {
    this.accountImpl = new accountImpl()
  }
  getInfo(data) {
    return this.accountImpl.getInfo(data)
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