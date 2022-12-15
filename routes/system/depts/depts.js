const express = require('express');
const router = express.Router();
const deptService = require('../../../system/service/systemService/deptService/deptService')


router.post('/addDeptToRole', async (req, res) => {
  const {role_id, dept_id} = req.body
  const ds = new deptService()
  const result = await ds.addDeptToRole({role_id: role_id, dept_id: dept_id})
  if (result.affectedRows > 0) {
    res.json({ code:200 , message: '添加成功' })
  } else {
    res.json({ code:200 , message: '添加失败' })
  }
})

router.post('/deleteDeptToRole', async (req, res) => {
  const { role_id, dept_id } = req.body
  const ds = new deptService()
  const result = await ds.addDeptToRole({role_id: role_id, dept_id: dept_id})
  if (result.affectedRows > 0) {
    res.json({ code:200 , message: '添加成功' })
  } else {
    res.json({ code:200 , message: '添加失败' })
  } 
})

module.exports = router