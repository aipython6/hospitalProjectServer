const mysqlConnect = require('../../../config/database/mysql/mysqlConfig')

class loginImpl {
  constructor() { }

  // 保存验证码
  async saveImageCode(data) {
    const sql = `insert into codes set ?`
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

  // 根据id获取验证码
  async getImageCodeById({ id }) {
    // 验证码有效期为5分钟
    const sql = `select code_num from codes where code_id = ${id} and create_time>=DATE_SUB(NOW(),INTERVAL 5 MINUTE)`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, res) => {
        if (!err) {
          const code = res[0].code_num
          resolve({ code: code })
        } else {
          reject(err)
        }
      })
    }).catch((err) => { reject(err) });
  }

  // 根据user_id获取密码
  async getPasswordByUserid({ user_id }) {
    const sql = `select password from users where user_id = '${user_id}'`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, res) => {
        if (!err) {
          resolve({ hash_password: res[0].password })
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = loginImpl