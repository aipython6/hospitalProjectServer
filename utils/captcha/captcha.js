// 生成验证码
const svgCaptcha = require('svg-captcha')
const loginService = require('../../system/service/loginService/loginService')
const { formatDate } = require('../dateHandle/dateHandle')

const getCaptcha = async () => {
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0Oo1liI',
    noise: 2,
    background: '#E9E4F0',
    width: 110,
    height: 38,
    fontSize: 38
  })

  // 生成验证码的同时，保存验证码到数据库
  const ls = new loginService()
  const result = await ls.saveImageCode({ code_num: captcha.text, create_time: formatDate(new Date()) })
  if (result.affectedRows > 0) {
    const img = `data:image/svg+xml;base64,${Buffer.from(captcha.data).toString('base64')}`
    return { text: captcha.text, img: img, code_id: result.insertId }
  } else {
    console.error('获取验证码出错')
  }
}

module.exports = { getCaptcha: getCaptcha }