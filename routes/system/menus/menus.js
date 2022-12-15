const express = require('express');
const router = express.Router();
const menuService = require('../../../system/service/systemService/menuService/menuService')
const {formatDate} = require('../../../utils/dateHandle/dateHandle')

router.post('/getMenuByRoleid', async (req, res) => {
  const {arr} = req.body
  const role_ids = JSON.parse(arr)
  const ms = new menuService()
  const result = await ms.getMenuByRoleid(role_ids)
  const menus = result.map(e => {
    return  {
      menu_id: e.menu_id, pid: e.pid, type: e.type,title: e.title,
      name: e.name, component: e.component, icon: e.icon, path: e.path,
      redirect: e.redirect, i_frame: e.i_frame, cache: e.cache,hidden: e.hidden,
      permission: e.permission
    }
  })
  res.json({code:200, data: menus})
})

router.post('/add', async (req, res) => {
  const data = req.body
  const menu = {
    pid: data.pid ?? null,
    sub_count: data.sub_count, type: data.type, title: data.title,
    name: data.name ?? null, component: data.component, menu_sort: data.menu_sort,
    icon: data.icon, path: data.path, redirect: data.redirect ?? null, i_frame: data.i_frame, 
    cache: data.cache, hidden: data.hidden, permission: data.permission ?? null,
    create_time: formatDate(new Date()), update_time: formatDate(new Date()),
    create_by: data.create_by ?? 'admin', update_by: data.update_by ?? 'admin',
    status: data.status
  }
  const ms = new menuService()
  const result = await ms.add(menu)
  if (result.affectedRows > 0) {
    res.json({ code: 200, message: '添加成功' })
  } else {
    res.json({ code: 200, message: '添加失败' })
  }
})

// 给roles_menu添加一条记录
router.post('/addMenuToRole', async (req, res) => {
  const {role_id,menu_id} = req.body
  const ms = new menuService()
  const result = await ms.addMenuToRole({role_id: parseInt(role_id), menu_id: parseInt(menu_id)})
  if (result.affectedRows > 0) {
    res.json({ code: 200, message: '添加成功' })
  } else {
    res.json({ code: 200, message: '添加失败' })
  }
})

// 删除roles_menu的一条记录
router.post('/deleteMenuToRole', async (req, res) => {
  const {role_id,menu_id} = req.body
  const ms = new menuService()
  const result = await ms.deleteMenuToRole({role_id: parseInt(role_id), menu_id: parseInt(menu_id)})
  if (result.affectedRows > 0) {
    res.json({ code: 200, message: '删除成功' })
  } else {
    res.json({ code: 200, message: '删除失败' })
  }
})

module.exports = router