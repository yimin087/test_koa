const Koa = require('koa')
// const mongoose = require('mongoose')
const Router = require('koa-router')

const app = new Koa()
//装载所有子路由
let router = new Router()

let user = require('./appApi/user.js')
router.use('/user', user.routes())
//egg.js

//加载路由中间件

app.use(router.routes())
app.use(router.allowedMethods())
// const {connect, initSchemas} = require('./database/init.js')

// ;(async () => {
// 	await connect()
// 	initSchemas()
// 	let User = mongoose.model('User')
// 	let oneuser = new User({userName: 'yangyimin3', password: '123456'})
// 	oneuser.save().then(() => {
// 		console.log('保存成功')
// 	})
// 	let oneSS = await User.findOne({}).exec()
// 	console.log(`********* ${oneSS} ************`)
// })()

app.use(async ctx => {
	ctx.body = 'hahaha'
})

app.listen(2345, () => {
	console.log('server is runing at port :2345')
})
