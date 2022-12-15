const express = require('express')
const router = express.Router()

const roleService = require('../../../system/service/systemService/roleService/roleService')

// 添加一个对应关系
router.post('/add', async (req, res) => {
  const {role_id, user_code} = req.body
  const rs = new roleService()
  const result = await rs.addRolesToUser({role_id: role_id, user_code: user_code})
  if (result.affectedRows > 0) {
    res.json({ code: 200, message: '添加成功' })
  } else {
    res.json({ code: 200, message: '添加失败' })
  }
})

// 删除一条记录
router.post('/delete', async (req, res) => {
  const {role_id, user_code} = req.body
  const rs = new roleService()
  const result = await rs.deleteRolesToUser({role_id: role_id, user_code: user_code})
  if (result.affectedRows > 0) {
    res.json({ code: 200, message: '删除成功' })
  } else {
    res.json({ code: 200, message: '删除失败' })
  }
})

module.exports = router