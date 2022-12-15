const mysqlConnect = require('../../../../config/database/mysql/mysqlConfig')

class deptImpl {
  constructor() {}

  getAll() {
    const sql = `select * from depts`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  }

  add(data) {
    const sql = `insert into depts set ?`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

  delete({ dept_id }) {
    const sql = `delete from depts where menu_id = ${dept_id}`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

  update(data) {
    
  }

  // 给添加role一条对应关系
  addDeptToRole(data) {
    const sql = `insert into roles_depts set ?`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

  // {dept_id, role_id}
  deleteDeptToRole({dept_id, role_id}) {
    const sql = `delete from roles_depts where role_id=${role_id} and dept_id=${dept_id}`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = deptImpl