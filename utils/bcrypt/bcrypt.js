const bcrypt = require('bcryptjs')

class BcryptUtil {
  constructor() {
    this.saltRounds = 10
    this.plainText = 'hospitalApp'
  }
  // 密码加密
  passEncoder(pass) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(this.saltRounds, this.plainText, (err, salt) => {
        bcrypt.hash(pass, salt, (err, hash) => {
          if (!err) {
            resolve(hash)
          } else {
            reject(err)
          }
        })
      })
    })
  }

  // 密码解密
  passDecoder(hash, pass) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(pass, hash, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

const bu = new BcryptUtil()

module.exports = bu