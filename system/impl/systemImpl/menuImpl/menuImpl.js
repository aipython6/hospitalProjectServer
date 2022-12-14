const mysqlConnect = require('../../../../config/database/mysql/mysqlConfig')

class menuImpl {
  constructor() {}
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
  getMenuByroleid({ role_id }) {}

  // 根据menu_id删除
  delete({menu_id}) {

  }
  // 添加一个menu
  add(data) {

  }

  // 根据menu_id更新
  update({menu_id}) {

  }
}

module.exports = menuImpl