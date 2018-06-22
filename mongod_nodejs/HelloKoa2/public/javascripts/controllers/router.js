const router = require('koa-router')();
const User = require('./users');
router.post('/test/users/update', User.updateUser);//与 html 的 action 对应
router.post('/test/users/add', User.addUser);
router.post('/test/users/delete', User.deleteUser);
router.post('/test/users/find', User.findUser);

module.exports = router