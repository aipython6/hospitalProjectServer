const loginImpl = require('../../impl/loginImpl/loginImpl')

class loginService {
  constructor() {
    this.loginImpl = new loginImpl()
  }

  saveImageCode(data) {
    this.loginImpl.saveImageCode(data)
  }

  getImageCode(data) {
    this.loginImpl.getImageCodeById(data)
  }
}

module.exports = loginService