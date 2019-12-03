//1.引入express
const express = require ('express')
//4.1文件读取
const fs = require ('fs')
//2.创建服务器
const app = express()
//3.添加端口监听
app.listen(3000,() =>{
    console.log('http://127.0.0.1:3000');
    })
//4.添加路由配置
app.get('/',(req,res)=>{
    fs.readFile('./views/index.ejs', (err, data) => {
        if (err){
            res.end('404')
        }else{
            res.end('data')
        }
    })
})

