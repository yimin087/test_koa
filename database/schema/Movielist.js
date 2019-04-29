const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodsSchema = new Schema(
	{
		doubanId: Number,
		title: String,
		rate: Number,
		poster: String
	}
	// ,{
	//     collections:'Goods'
	// }
)

mongoose.model('MovieList', goodsSchema)
