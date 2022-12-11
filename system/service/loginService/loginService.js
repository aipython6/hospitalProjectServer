const loginImpl = require('../../impl/loginImpl/loginImpl')

class loginService {
  constructor() {
    this.loginImpl = new loginImpl()
  }

  saveImageCode(data) {
    return this.loginImpl.saveImageCode(data)
  }

  getImageCodeById(data) {
    return this.loginImpl.getImageCodeById(data)
  }

  getPasswordByUserid(data) {
    return this.loginImpl.getPasswordByUserid(data)
  }
}

module.exports = loginService