const mysqlConnect = require('../../../config/database/mysql/mysqlConfig')

class tokenImpl {
  constructor() { }
  add(data) {
    const sql = `insert into tokens set ?`
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
}

module.exports = tokenImpl