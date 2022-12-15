const { reject } = require('lodash');
const mysqlConnect = require('../../../config/database/mysql/mysqlConfig')

class accountImpl {
  constructor() { }

  // 获取所有用户
  async getUsers() {
    const sql = `select * from users`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if(!err) {
          resolve(result)
        } else {
          reject(err)          
        }
      })
    })
  }

  // 根据user_code获取用户信息
  async getInfoByUserCode({ user_code }) {
    const sql = `select user_id, user_code, user_name, level, gender, age, (select dept_name from depts b where a.dept_id=b.dept_id) dept_name, phone, avatar, status, comment from users a where user_code = '${user_code}'`
    return new Promise((resolve, reject) => {
      mysqlConnect.query(sql, (err, result) => {
        if(!err) {
          resolve(result[0])
        } else {
          reject(err)          
        }
      })
    })
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
    }).catch((err) => { console.log(err) });
  }

  // 更新用户
  async updateUser(data) {

  }

  // 删除用户
  async deleteUser({ user_code }) { }
}

module.exports = accountImpl;