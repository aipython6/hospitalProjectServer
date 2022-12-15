const deptImpl = require('../../../impl/systemImpl/deptImpl/deptImpl')

class deptService {
  constructor() {
    this.deptImpl = new deptImpl()
  }

  add(data) {
    return this.deptImpl.add(data)
  }

  getAll() {
    return this.deptImpl.getAll()
  }

  delete(data) {
    return this.deptImpl.delete(data)
  }

  addDeptToRole(data) {
    return this.deptImpl.addDeptToRole(data)
  }

  deleteDeptToRole(data) {
    return this.deptImpl.deleteDeptToRole(data)
  }
}

module.exports = deptService