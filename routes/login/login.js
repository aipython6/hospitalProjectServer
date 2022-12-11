// 登录相关的路由
const express = require('express');
const router = express.Router();
const { getCaptcha } = require('../../utils/captcha/captcha')
const loginService = require('../../system/service/loginService/loginService')
const bu = require('../../utils/bcrypt/bcrypt')
// 进入登录页，生成验证码
router.get('/getImageCode', async (req, res, next) => {
  const { text, img, code_id } = await getCaptcha()
  return res.json({ code: 200, img: img, text: text, code_id: code_id })
})

// 用户登录
router.post('/userLogin', async (req, res, next) => {
  // user_code是唯一的,相当于职工号
  const { user_code, img_code, password, id } = req.body
  const ls = new loginService()
  const { code } = await ls.getImageCodeById({ id: id })
  const { hash_password } = await ls.getPasswordByUserid({ user_id: user_code })
  const temp_password = await bu.passDecoder(hash_password, password)
  if (code === img_code) {
    if (temp_password) {
      if (temp_password === password) {
        res.json({ code: 200, message: '登录成功' })
      } else {
        res.json({ code: 200, message: '密码错误' })
      }
    } else {
      res.json({ code: 200, message: '该用户不存在' })
    }
  } else {
    res.json({ code: 200, message: '验证码错误或验证码过期,请重新输入' })
  }
})




module.exports = router;