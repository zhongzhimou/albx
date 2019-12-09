//1.引入 express
const express = require ('express')
//4.1文件读取
const fs = require ('fs')
//2.创建服务器
const app = express()
//3.添加端口监听
app.listen(3000,() =>{
    console.log('http://127.0.0.1:3000');
    })

//5.托管静态资源    app.use('/static',express.static('public')) static
app.use('/assets', express.static('assets'))
//5.1图片资源托管
app.use('/uploads', express.static('uploads'))

//6.配置ejs模板引擎：设置当前node服务器使用ejs模板引擎
app.set('view engine','ejs')
//7.下面这句代码是进行ejs模板文件查询的默认目录配置、下面这句代码写完之后，以后所有的ejs资源都会指定__dirname+"views"
app.set('views',__dirname+'/views')

//4.添加路由配置
app.get('/',(req,res)=>{
 // fs.readFile('./views/index.ejs', (err, data) => {
 //     if (err){
 //         res.end('404')
 //     }else{
 //         res.end(data)
 //     }
 // }) 由于使用6-7直接简写为以下代码
    //render一共做了3件事情
    //1.读取文件（读取了默认目录配置下的文件）
    //2.实现渲染，现在暂无数据参与，不使用ejs渲染，使用前后端分离的做法
    //3.返回渲染结果
    res.render('index.ejs')
})
app.get('/admin',(req,res)=>{
    // fs.readFile('./views/admin/index.ejs', (err, data) => {
    //     if (err){
    //         res.end('404')
    //     }else{
    //         res.end(data)
    //     }
    // }) 由于使用6-7直接简写为以下代码
    res.render('admin/index.ejs')
})

app.get('/admin/comments.ejs',(req,res)=>{
    res.render('admin/comments.ejs')
})

