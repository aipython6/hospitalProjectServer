// 账户相关的路由
const express = require('express');
const router = express.Router();
const { formatDate } = require('../../utils/dateHandle/dateHandle')
const accountService = require('../../system/service/accountService/accountService')
const roleService = require('../../system/service/systemService/roleService/roleService')
const bu = require('../../utils/bcrypt/bcrypt')
const { URL } = require('../../utils/constant/constant')

router.get('/all', async (req, res) => {

})

// 根据user_code获取用户信息
router.get('/info', async (req, res) => {
  const user_code = req.headers.user_code
  const as = new accountService()
  const rs = new roleService()
  const result = await as.getInfoByUserCode({ user_code: user_code })
  const user = {
    user_id: result.user_id, user_code: result.user_code, user_name: result.user_name,
    level: result.level, gender: result.gender, age: result.age, avatar: result.avatar, dept_name: result.dept_name,
    phone: result.phone, status: result.status, comment: result.comment
  }
  // 获取user_code下所有的roles
  const roles_t = await rs.getRoleByUsercode({ user_code: user_code })
  const roles = roles_t.map(e => {
    return { role_id: e.role_id, name: e.name }
  })
  const data = Object.assign(user, { roles: roles })
  res.json({ code: 200, data: data })
})

// 添加用户
router.post('/add', async (req, res) => {
  const { user_code, user_name, password, level, gender, age, dept_id, phone, avatar, status, comment } = req.body
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
    avatar: avatar ?? URL.defaultAvatarUrl,
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