const roleImpl = require('../../../impl/systemImpl/roleImpl/roleImpl')

class roleService {
  constructor() {
    this.roleImpl = new roleImpl()
  }
  getRoleByUsercode(data) {
    return this.roleImpl.getRoleByUsercode(data)
  }
  getAllRoles() {
    return this.roleImpl.getAllRoles()
  }
  add(data) {
    return this.roleImpl.add(data)
  }
  update(data) {
    return this.roleImpl.update(data)
  }
  delete(data) {
    return this.roleImpl.delete(data)
  }
}
module.exports = roleService