/**
 * 连接数据库
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema

/**
 * 定义模式(Schema)
 */
var TestSchema = new Schema({
    '位置': {type: String},
    '覆盖企业数': { type:Number, default:0 },
    '园区年产值': { type:String },
    '员工数': { type:Number, default:0 },
    '办公空间面积': { type:Number, default:0 },
    '订单量': { type:Number, default:0 },
    '已租赁': { type:Number, default:0 }
}, { versionKey: false});
console.log("------3-------")
// 创建Model
module.exports =  mongoose.model("yml_test", TestSchema,'yml_tests');