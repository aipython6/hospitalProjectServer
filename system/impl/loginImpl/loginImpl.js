const mysqlConnect = require('../../../config/database/mssql/mssqlConfig')

class loginImpl {
  constructor() {}

  // 保存验证码
  saveImageCode(data) {
    const sql = `insert into codes set ?`
    return new Promise((resolve, reject)  => {
      mysqlConnect.query(sql, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })	
    })
  }

  // 根据id获取验证码
  getImageCodeById({ id }) {
    const sql = `select code_num from codes where code_is = ${id}`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, res) => {
        if (!err) {
          const code = res.code_num
          resolve({ code: code })
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = loginImpl