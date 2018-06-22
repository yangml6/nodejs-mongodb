/**
 * 连接数据库
 */
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test');

/**
 * 测试数据库是否连接成功
 */
// const con = mongoose.connection;
// con.on('error', console.error.bind(console, '连接数据库失败'));
// con.once('open',()=>{
//     console.log("成功连接");
// })

/**
 * 定义模式(Schema)
 */
var TestSchema = new mongoose.Schema({
    _id:{type:Number},
    '位置': { type:String },
    '覆盖企业数': { type:Number, default:0 },
    '园区年产值': { type:String },
    '员工数': { type:Number, default:0 },
    '办公空间面积': { type:Number, default:0 },
    '订单量': { type:Number, default:0 },
    '已租赁': { type:Number, default:0 }
});

// 创建Model
var TestModel = mongoose.model("yml_test", TestSchema);


/**
 * 查询
 */
// var query = TestModel.find({},{'位置':0}); //1_只显示位置,0_显示除了位置
var query = TestModel.find({'位置':"北京园区"}); //前面是 where，查询位置，后面是 select 的**，from model


query.exec(function (err, docs) {
  // called when the `query.complete` or `query.error` are called
  // internally
    console.log(docs)
});












// //第二种方案
// TestModel.find({}, function(err, docs){
//     if(err) console.log(err);
//     console.log( docs);
// })

/**
 * 更新
 */
// TestModel.update({name: 'jack'}, {$set: {sex: "h"}}, {multi: true}, function(err){
//     if(err){
//         console.error(err);
//     }else{
//         console.log("updated");
//     }
// })

/** 
 * 增
 */

// var doc = ({
//     _id:6,
//     age : 10   
// });

// TestModel.create(doc, function(err, docs){
//     if(err) console.log(err);
//     console.log('保存成功：' + docs);
// });

/** 
 * 删
 */
// TestModel.remove({age:10}, function(err, docs){
//     if(err) console.log(err);
//     console.log('删除成功：' + docs);
// })