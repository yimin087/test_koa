const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./data_json/newGoods.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount=0
        const Goods = mongoose.model('Good')
        data.map((value,index)=>{
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch(error=>{
                console.log(MediaStreamErrorEvent)
            })
        })
    })
    ctx.body="开始导入数据"
})

router.get('/insertAllCategory',async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount=0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(()=>{
                saveCount++
                console.log('插入成功:'+saveCount)
            }).catch(error=>{
                console.log('插入失败:'+error)
            })
        })

    })
    ctx.body="开始导入数据....."
})

router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount=0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('插入成功:'+saveCount)
            }).catch(error=>{
                console.log('插入失败:'+error)
            })
        })

    })
    ctx.body="开始导入数据....."
})

//**获取商品详情信息的接口
router.get('/getDetailGoodsInfo',async(ctx)=>{
    try{
        let {goodsId} = ctx.request.query
        const Goods = mongoose.model('Good')
        // console.log(goodsId)
        let result= await Goods.findOne({ID:goodsId}).exec()
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})

//**读取大类数据的接口 */

router.get('/getCategoryList',async(ctx)=>{
    try{
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
    
})

/**读取小类的数据 */


router.post('/getCategorySubList',async(ctx)=>{
    // console.log(ctx.request.body)
    try{
        let {cateoryId} = ctx.request.body
        // console.log(cateoryId)
        //let cateoryId=1
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID:cateoryId}).exec()
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
    
})

/**根据类别获取商品列表 */

router.post('/getGoodsListByCategorySubID',async(ctx)=>{
    try{
        let {categorySubId, page, size=10} = ctx.request.body
        // console.log(categorySubId, page, size)
        let start = (page-1)*size  //开始位置

        const Goods = mongoose.model('Good')
        let totalresult = await Goods.find({SUB_ID:categorySubId}).exec()
        let pageresult = await Goods.find({SUB_ID:categorySubId}).skip(start).limit(size).exec()
        let total = totalresult.length
        // .skip(start).limit(size).exec()
        ctx.body={code:200,page,size,total,message:pageresult}
    }catch(error){
        ctx.body={code:500,message:error}
    }
    
})



module.exports = router