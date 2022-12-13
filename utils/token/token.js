const jwt = require('jsonwebtoken')

class Token {
  constructor() {
    this.token = 'hospitalApp'
  }
  sign(user_code, rememberme, tokenCookieExpires) {
    let expiresIn = { expiresIn: 60 * 60 * 24 }
    if (rememberme && tokenCookieExpires) {
      expiresIn.expiresIn = tokenCookieExpires * 60 * 60 * 24
    }
    return jwt.sign({ user_code: user_code }, this.token, { expiresIn: expiresIn.expiresIn })
  }

  verify(token, { user_code }) {
    if (!token) return false
    else {
      return new Promise((resolve, reject) => {
        jwt.verify(token, this.token, (err, result) => {
          if (err) reject(err)
          else {
            if (result.user_code && user_code) {
              resolve(result.user_code.toString() === user_code.toString())
            }
          }
        })
      })
    }
  }
}

const t = new Token()
module.exports = t


