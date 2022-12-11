const mysqlConnect = require('../../../config/database/mysql/mysqlConfig')

class accountImpl {
  constructor() { }

  // 获取用户信息
  async getInfo({ user_code }) {

  }

  // 添加用户
  async addUser(data) {
    const sql = 'INSERT INTO users SET ?'
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    }).catch((err) => { reject(err) });
  }

  // 更新用户
  async updateUser(data) {

  }

  // 删除用户
  async deleteUser({ user_code }) { }
}

module.exports = accountImpl;