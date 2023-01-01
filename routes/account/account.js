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

router.get('/permmenu', async (req, res) => {
  const as = new accountService()
  const result = await as.permmenu()
  const menus = result.map(r => {
    return {
      createTime: r.create_at, updateTime: r.update_at,
      id: r.id, parentId: r.parent_id, name: r.name,
      router: r.router, perms: r.perms, type: r.type,
      icon: r.icon,orderNum: r.order_num,viewPath: r.view_path,
      keepalive: r.keepalive, isShow: r.is_show
    }
  })
  const perms = result.map(r => r.perms).filter(r => r!==null)
  res.json({ code: 200, menus: menus, perms: perms })
})


// 根据user_code获取用户信息
router.get('/info', async (req, res) => {
  const user_code = req.headers.user_code
  const as = new accountService()
  const rs = new roleService()
  const result = await as.getInfoByUserCode({ user_code: user_code })
  const user = {
    createTime: result.create_time,updateTime: result.update_time,
    id: result.user_id, departmentId: result.dept_id,
    departmentName: result.dept_name,
    user_code: result.user_code, username: result.user_name,
    headImg: result.avatar, level: result.level, gender: result.gender,
    age: result.age, phone: result.phone, remark: result.comment,status: result.status,
  }
  // 获取user_code下所有的roles
  const roles_t = await rs.getRoleByUsercode({ user_code: user_code })
  const roles = roles_t.map(e => {
    return { role_id: e.role_id, name: e.name }
  })
  const data = Object.assign(user, { roles: roles })
  res.json({ code: 200, userInfo: data })
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