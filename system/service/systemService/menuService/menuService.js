const menuImpl = require('../../../impl/systemImpl/menuImpl/menuImpl')

class menuService {
  constructor() {
    this.menuImpl = new menuImpl()
  }

  getAll() {
    return this.menuImpl.getAll()
  }

  getMenuByRoleid(data) {
    return this.menuImpl.getMenuByRoleid(data)
  }

  delete(data) {
    return this.menuImpl.delete(data)
  }

  add(data) {
    return this.menuImpl.add(data)
  }

  update(data) {
    return this.menuImpl.update(data)
  }

  addMenuToRole(data) {
    return this.menuImpl.addMenuToRole(data)
  }

  deleteMenuToRole(data) {
    return this.menuImpl.deleteMenuToRole(data)
  }
}

module.exports = menuService