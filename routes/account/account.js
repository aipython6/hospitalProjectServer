// 账户相关的路由
const express = require('express');
const router = express.Router();
const { formatDate } = require('../../utils/dateHandle/dateHandle')
const accountService = require('../../system/service/accountService/accountService')
const bu = require('../../utils/bcrypt/bcrypt')
// 根据user_code获取用户信息
router.get('/get', async (req, res) => {

})

// 添加用户
router.post('/add', async (req, res) => {
  const { user_code, user_name, password, level, gender, age, dept_id, phone, avatar, status, comment } = req.body
  console.log(typeof req.body.password)
  const as = new accountService()
  const data = {
    user_code: user_code,
    user_name: user_name,
    password: await bu.passEncoder(password),
    level: level,
    gender: gender,
    age: parseInt(age),
    dept_id: parseInt(dept_id),
    phone: phone,
    avatar: avatar ?? 'http://localhost:3000/avatar/images/default.jfif',
    status: parseInt(status),
    create_time: formatDate(new Date()),
    update_time: formatDate(new Date()),
    comment: comment
  }
  const result = await as.addUser(data)
  if (result.affectedRows) {
    res.json({ code: 200, message: '用户添加成功' })
  } else {
    res.json({ code: 200, message: '用户添加失败' })
  }
})

// 更新用户信息
router.post('/update', async (req, res) => {

})

// 删除用户
router.delete('/delete', async (req, res) => {

})



module.exports = router