// 登录相关的路由
const express = require('express');
const router = express.Router();
const { getCaptcha } = require('../../utils/captcha/captcha')
const { formatDate } = require('../../utils/dateHandle/dateHandle')
const loginService = require('../../system/service/loginService/loginService')
const tokenService = require('../../system/service/tokenService/tokenService')
const bu = require('../../utils/bcrypt/bcrypt')
const token = require('../../utils/token/token')

// 进入登录页，生成验证码
router.get('/getImageCode', async (req, res, next) => {
  const { text, img, code_id } = await getCaptcha()
  res.json({ code: 200, img: img, text: text, code_id: code_id })
})

// 用户登录
router.post('/userLogin', async (req, res, next) => {
  // user_code是唯一的,相当于职工号
  const { username, verifyCode, password, captchaId, rememberme, expire } = req.body
  const ls = new loginService()
  const ts = new tokenService()

  const { code } = await ls.getImageCodeById({ id: parseInt(captchaId) })
  const { hash_password } = await ls.getPasswordByUserid({ user_code: username })
  if (!code) {
    res.json({ code: 200, message: '验证码已过期', data: {} })
  } else {
    if (code.toLowerCase() === verifyCode.toLowerCase()) {
      if (hash_password) {
        if (await bu.passDecoder(hash_password, password)) {
          const t = token.sign(username, parseInt(rememberme), parseInt(expire))
          // 保存token
          await ts.add({ token: t, login_time: formatDate(new Date()), user_code: username, status: 1 })
          res.json({ code: 200, message: '登录成功', data: { token: t, user_code: username } })
        } else {
          res.json({ code: 200, message: '密码错误', data: {} })
        }
      } else {
        res.json({ code: 200, message: '该用户不存在', data: {} })
      }
    } else {
      res.json({ code: 200, message: '验证码错误,请重新输入', data: {} })
    }
  }
})




module.exports = router;