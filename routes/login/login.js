const express = require('express');
const router = express.Router();
const { getCaptcha } = require('../../utils/captcha/captcha')
const loginService = require('../../system/service/loginService/loginService')

// 进入登录页，生成验证码
router.get('/getImageCode', async (req, res) => {
  const { text, code_id } = getCaptcha()
  return res.json({ code: 200, img: text, code_id: code_id })
})

// 根据id获取验证码
router.post('/getImageCodeById', async (req, res) => {
  const { id } = req.body()
  const ls = new loginService()
  const data = await ls.getImageCodeById({ id: id })
  res.json({ code: 200, img: data.code })
})



module.exports = router;