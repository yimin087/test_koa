const Koa = require('koa')
const Router = require('koa-router')
const Bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const {connect, initSchemas} = require('./database/init.js')

const app = new Koa()
//装载所有子路由
let router = new Router()
let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')

router.use('/user', user.routes())
router.use('/goods', goods.routes())

//加载路由中间件
app.use(Bodyparser())
app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())
// 链接mongoose
;(async () => {
	await connect()
	initSchemas()
})()
app.use(async ctx => {
	ctx.body = 'hahaha'
})

app.listen(2345, () => {
	console.log('server is runing at port :2345')
})
