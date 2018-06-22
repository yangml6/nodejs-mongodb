
let xss = require('xss');
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
const userHelp = require('./userHelp');
const TestModel = require('../models/TestModel'); //已经引用过

let User = mongoose.model('yml_test');

/* 多用户 */
exports.findUser = async (ctx, next) => {
    let data;
    // console.log(ctx.request.body.位置)
    if (ctx.request.body.位置!='') {
        data = await userHelp.findFilterUsers(ctx.request.body)
        // console.log("data")
        // console.log(data)
        
    } else {
        data = await userHelp.findAllUsers()
    }

    ctx.body = {  //返回值，返回界面
        success: true,
        data
    }
};
// /* 单用户 */
// exports.user = async (ctx, next) => {
//     let data = await userHelper.findUser(ctx.request.body)

//     ctx.body = {
//         success: true,
//         data
//     }
// };

/* 添加用户 */
exports.addUser = async (ctx, next) => {
    
    let newObj = ctx.request.body,
        user2;
    /**
     * newObj={ '位置': 'eeee',
                '覆盖企业数': '333',
                '园区年产值': '',
                '员工数': '',
                '办公空间面积': '',
                '订单量': '',
                '已租赁': '' } 
    console.log(newObj.位置)-------‘eee’
                
  */
    let id = newObj.位置 ;
    let user = new TestModel({
        '位置' : newObj.位置,        
        '覆盖企业数': newObj.覆盖企业数 ? parseInt(newObj.覆盖企业数) : 0,
        '园区年产值': newObj.园区年产值,
        '员工数': newObj.员工数 ? parseInt(newObj.员工数) : 0,
        '办公空间面积': newObj.办公空间面积?parseInt(newObj.办公空间面积) : 0,
        '订单量': newObj.订单量 ? parseInt(newObj.订单量) : 0,
        '已租赁': newObj.已租赁 ? parseInt(newObj.已租赁) : 0
    });
        user2 = await userHelp.addUser(user);

    if (user2) {
        ctx.body = {
            success: true,
            data: user2
            // data:user2
        }
    }
};

/* 更新用户 */
exports.updateUser = async (ctx, next) => {
    
    let newObj = ctx.request.body,
        user2;
    /**
     * newObj={ '位置': 'eeee',
                '覆盖企业数': '333',
                '园区年产值': '',
                '员工数': '',
                '办公空间面积': '',
                '订单量': '',
                '已租赁': '' } 
    console.log(newObj.位置)-------‘eee’
                
  */
    let id = newObj.位置 ;
    let user = new TestModel({
        '位置' : newObj.位置,        
        '覆盖企业数': newObj.覆盖企业数 ? parseInt(newObj.覆盖企业数) : 0,
        '园区年产值': newObj.园区年产值,
        '员工数': newObj.员工数 ? parseInt(newObj.员工数) : 0,
        '办公空间面积': newObj.办公空间面积?parseInt(newObj.办公空间面积) : 0,
        '订单量': newObj.订单量 ? parseInt(newObj.订单量) : 0,
        '已租赁': newObj.已租赁 ? parseInt(newObj.已租赁) : 0
    });
        user2 = await userHelp.updateUser(user);
    if (user2) {
        ctx.body = {
            success: true,
            data: user2.nModified ? `已修改 ${parseInt(user2.nModified)} 条` : "未修改" //修改了几个
        }
    }
};


/* 删除用户 */
exports.deleteUser = async (ctx, next) => {
    let id = xss(ctx.request.body.位置);
    let data = await userHelp.deleteUser({id});
    ctx.body = {
        success: true,
        data
    }
};