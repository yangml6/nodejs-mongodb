const Koa = require('koa')
const app = new Koa()


app.use( async ( ctx ) => {

  if ( ctx.url === '/' && ctx.method === 'GET' ) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>位置</p>
        <input name="位置" /><br/>
        <p>覆盖企业数</p>
        <input name="覆盖企业数" /><br/>
        <p>园区年产值</p>
        <input name="园区年产值" /><br/>
        <p>员工数</p>
        <input name="员工数" /><br/>
        <p>办公空间面积</p>
        <input name="办公空间面积" /><br/>
        <p>订单量</p>
        <input name="订单量" /><br/>
        <p>已租赁</p>
        <input name="已租赁" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
    // 当POST请求的时候，解析POST表单里的数据，并显示出来
    let postData = await parsePostData( ctx )
    ctx.state = {
        title: 'Koa2',
        name: postData
     }
    // 发送到页面
     return  await ctx.render('index', ctx.state)
    
    // ctx.body = postData
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})

// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
     var promise  = new Promise(function (resolve , reject){
        const mongoose = require('mongoose');
        mongoose.connect('mongodb://127.0.0.1:27017/test');
        const TestSchema = new mongoose.Schema({
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
        const TestModel = mongoose.model("yml_test", TestSchema);
    })
            var query = TestModel.find({}); 
                query.exec(function (err, docs) {
                resolve(docs);
                console.log(docs)
            });
    promise.then(function (value){
        return value;
    }, function(value){

    });
    return promise;
}

// 将POST请求参数字符串解析成JSON
// function parseQueryStr( queryStr ) {
//   let queryData = {}
//   let queryStrList = queryStr.split('&')
//   console.log( queryStrList )
//   for (  let [ index, queryStr ] of queryStrList.entries()  ) {
//     let itemList = queryStr.split('=')
//     queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
//   }
//   return queryData
// }

app.listen(3000, () => {
  console.log('[demo] request post is starting at port 3000')
})