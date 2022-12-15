const mysqlConnect = require('../../../../config/database/mysql/mysqlConfig')

class roleImpl {
  constructor() { }
  // 添加role
  add(data) {
    const sql = `insert into roles set ?`
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

  // 根据user_code获取roles
  getRoleByUsercode({ user_code }) {
    const sql = `select c.name, c.role_id from users a left join users_roles b on a.user_code=b.user_code left join roles c on b.role_id=c.role_id where a.user_code='${user_code}'`
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

  // 获取所有roles
  getAllRoles() {
    const sql = `select * from roles`
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

  // 更新role
  update(data) {
    const { role_id, name, status, comment, update_by, update_time } = data
    const sql = `update roles set name='${name}', status=${status}, update_time='${update_time}', update_by='${update_time}', comment='${comment}' where role_id=${role_id}`
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

  // 删除role
  delete({ role_id }) {
    const sql = `delete from roles where role_id = ${role_id}`
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

  // 给用户添加角色
  addRolesToUser(data) {
    const sql = `insert into users_roles set ?`
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

  // 删除用户的一个角色
  deleteRolesToUser({role_id, user_code}) {
    const sql = `delete from users_roles where role_id=${role_id} and user_code=${user_code}`
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

module.exports = roleImpl