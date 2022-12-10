// 生成验证码
const svgCaptcha = require('svg-captcha')
const loginService = require('../../system/service/loginService/loginService')
const { formatDate } = require('../dateHandle/dateHandle')

const getCaptcha = async () => {
  const captcha = svgCaptcha.create({
		size: 4,
		ignoreChars: '0Oo1liI',
		noise: 2,
		background: '#f0f0f4',
		width: 110,
		height: 38,
		fontSize: 38
	})

	// 生成验证码的同时，保存验证码到数据库
	const ls = new loginService()
	const result = await ls.saveImageCode({ code_id: insertid, code_num: captcha.data, create_time: formatDate(new Date()) })
	if (result) {
		return { text: captcha.text, code_id: result.insertid }
	} else {
		return { text: '', code_id: '' }
	}
}

module.exports = { getCaptcha: getCaptcha() }