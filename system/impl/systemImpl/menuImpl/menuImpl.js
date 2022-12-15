const mysqlConnect = require('../../../../config/database/mysql/mysqlConfig')

class menuImpl {
  constructor() { }
  // 获取所有的menu
  getAll() {
    const sql = `select * from menus`
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

  // 根据roleid获取menu
  getMenuByRoleid(role_ids) {
    const sql = `select distinct c.* from roles a left join roles_menus b on a.role_id=b.role_id left join menus c on b.menu_id=c.menu_id where a.role_id in (?)  order by menu_sort`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, [role_ids], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

  // 根据menu_id删除
  delete({ menu_id }) {
    const sql = `delete from menus where menu_id = ${menu_id}`
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

  // 添加一个menu
  add(data) {
    const sql = `insert into menus set ?`
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

  // 根据menu_id更新
  update(data) {
    
  }

  // 给role添加一个menu
  addMenuToRole(data) {
    const sql = `insert into roles_menus set ?`
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

  // 删除role的一个menu
  deleteMenuToRole({role_id, menu_id}) {
    const sql = `delete from roles_menus where role_id=${role_id} and menu_id=${menu_id}`
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

module.exports = menuImpl