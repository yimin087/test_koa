const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllMovieInfo', async ctx => {
	fs.readFile('./data_json/movielist.json', 'utf8', (err, data) => {
		// console.log(data)
		data = JSON.parse(data)
		console.log(data)
		let saveCount = 0
		const MovieList = mongoose.model('MovieList')
		data.RECORDS.map((value, index) => {
			let newMovieList = new MovieList(value)
			newMovieList
				.save()
				.then(() => {
					saveCount++
					console.log('成功' + saveCount)
				})
				.catch(error => {
					console.log(MediaStreamErrorEvent)
				})
		})
	})
	ctx.body = '开始导入电影数据'
})

/**根据类别获取商品列表 */

router.get('/getMovieList', async ctx => {
	try {
		let {page, size = 10} = ctx.request.query
		// console.log(categorySubId, page, size)
		let start = (page - 1) * size //开始位置

		const MovieLists = mongoose.model('MovieList')
		let totalresult = await MovieLists.find().exec()
		let pageresult = await MovieLists.find()
			.skip(start)
			.limit(size)
			.exec()
		let total = totalresult.length
		// .skip(start).limit(size).exec()
		ctx.body = {code: 200, page, size, total, message: pageresult}
	} catch (error) {
		ctx.body = {code: 500, message: error}
	}
})

module.exports = router
