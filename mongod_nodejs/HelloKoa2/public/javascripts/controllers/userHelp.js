'use strict';

let mongoose = require('mongoose');
console.log("------1.5-------")
let User = mongoose.model('yml_test');
console.log("------2-------")
/* 查找用户 */
exports.findAllUsers = async () => {
    console.log("------all-------")
    let query = User.find({});
    let res = [];
    res = await query.lean().exec()
    return res
};

/* 查找特定用户 */
exports.findFilterUsers = async (params) => {
    

    // let nameReg = new RegExp(params.位置, 'i');
    let nameReg =params.位置
    
    let query = User.find({
        '位置': nameReg
    });
    let res = [];
    res = await query.lean().exec()
    return res
};

// /* 查找单个用户 */
// exports.findUser = async (params) => {
//     let query = User.find({
//         id: params.id
//     });
//     let res = {};
//     await query.exec(function (err, tUser) {
//         if (err) {
//             res = '没有该用户';
//         } else {
//             res = tUser[0];
//         }
//     });
//     return res
// };

/* 新增用户 */
exports.addUser = async (user) => {
    user = await user.save();// user-->User
    return user
};

/* 编辑用户 */
exports.updateUser = async (user) => {
    let res = await User.update({位置: user.位置}, {
        $set: {
            '覆盖企业数': user.覆盖企业数,
            '园区年产值': user.园区年产值,
            '员工数': user.员工数,
            '办公空间面积': user.办公空间面积,
            '订单量': user.订单量,
            '已租赁': user.已租赁
        }
    });
    return res
};

/* 删除用户 */
exports.deleteUser = async ({id}) => {
    let flag = false;
    console.log('flag==========>' + flag);
    let res = []
    res = await User.remove({位置:id})
    flag = res.success
    console.log('flag=====await=====>' + flag);
    return flag
};