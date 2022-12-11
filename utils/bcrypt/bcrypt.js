const bcrypt = require('bcryptjs')

class BcryptUtil {
  constructor() {
    this.saltRounds = 10
    this.plaintextPass = 'hospitalApp'
  }
  // 密码加密
  passEncoder(pass) {
    return new Promise((resolve, reject) => {
      bcrypt.getSalt(this.saltRounds, this.plaintextPass, (err, salt) => {
        bcrypt.hash(pass, salt, (err, hash) => {
          if (!err) {
            return resolve(hash)
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
          return resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

const bu = new BcryptUtil()

module.exports = bu