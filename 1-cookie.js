// 引入
const express = require('express');
const querystring = require('querystring')
// APP
const app = express();
// 绑定
app.listen(6600, () => {
  console.log('http://127.0.0.1:6600');

})
// 请求
app.get('/', (req, res) => {
  //1.2.1判断是否有登录状态
  //1.2.2获取之前有可能存储的登录状态: (req.headers.cookie)
  //let obj = req.header.cookie; (要把这个字符串值转为对象 换其他变量名存储)
  let mycook = req.header.cookie;  //(换成mycook)
  let obj = querystring.parse(mycook);  //转成对象(mycook,true).true为空可以不要
  // console.log(obj);
  if (obj.islogin && obj.islogin == 'true') {  //如果有登录
    res.end('welcome back');
  } else {
    //1要获取登录状态,首先要先要存登录成功的值
      //如果第一次访问,显示:first come
      //如果有登录状态,那么就显示:welcome back
      //1.1存储cookie数据:通过  响应头的方式写入cookie
    res.writeHead(200,{
      'Content-Type': 'text/html;charset=utf-8',
      'Set-Cookie': 'islogin=true'
    })
    res.end('first come')
  }

})