const tokenImpl = require('../../impl/tokenImpl/tokenImpl')

class tokenService {
  constructor() {
    this.tokenImpl = new tokenImpl()
  }
  add(data) {
    return this.tokenImpl.add(data)
  }
}

module.exports = tokenService
