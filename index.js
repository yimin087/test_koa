const Koa = require('koa')
const mongoose = require('mongoose')

const app = new Koa()
const {connect, initSchemas} = require('./database/init.js')

;(async () => {
	await connect()
	initSchemas()
	let User = mongoose.model('User')
	let oneuser = new User({userName: 'yangyimin', password: '123456'})
	oneuser.save().then(() => {
		console.log('保存成功')
	})
	let oneSS = await User.findOne({}).exec()
	console.log(`********* ${oneSS} ************`)
})()

app.use(async ctx => {
	ctx.body = 'hahaha'
})

app.listen(2345, () => {
	console.log('server is runing at port :2345')
})
