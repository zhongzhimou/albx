// 1找到路由(router.js)
  //加路由
  post('/')
  .get('/getAllPost',postController.getAllPost)


// 2找控制器(controller/postController.js)
  //获取所有文章列表数据
    exports.getAllPost = (req,res) =>{
      // 调用数据
      postsModel.getAllPost((err,data) =>{
        if(err){
          res.json({code:400,msg:'数据查询失败'})
        }else{
          // 添加日期
            //转换
          for(var i=0; i<data.length;i++){
            //如果没哟传递参数,就获取当前日期值进行转换,如果需要转换指定的日期,则需要传递参数
              // format:进行格式化,里面进行自定义的 格式设置
                data[i].created = moment(data[i].created).format('YYYY-MM-DD HH-mm-ss')
          }
          res.json({
            code:200,
            msg:'数据查询成功',
            data:data
          })
        }
      })
    }

//这个文件处理所有文章数据的操作(models/postModel)
    封装获取连接对象: utils/myconn.js
    var mysql = requier('mysql') 
      //创建连接
      var connection = mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'root',
        database:'albx'
      })
      module.exports=connection
//获取数据
    //引入连接对象
    const conn = require('../utils/myconn.js');
    //获取所有文章数据
    exports.getAllPost = (callback) => {
      //1.创建sql语句 --多表连接
      // var sql = select posts.*,users.nickname,categories.name
      // from posts
      // join users on posts.user_id = uest.id
      // join categories on posts.category_id = categories.id'
      
      var sql = `select posts.*,user.nikname,categories.name
        from posts
        join users on posts .user_id = users.id
        join categories on posts.category_id = categories`
        //调用方法
        conn.query(sql,(err,results) => {
          if(err){
              callback(err);
          }else{
            callback(null,results)
          }
        })
    }

//前台页面交互实现
// 添加$(function(){})
// 发起ajax,根据后天路由配置进行ajax的配置
// 创建模板:views/admin/posts.ejs
// 调用模板引擎生成动态结构
<script type ="text/template" id='postListTemp'>

</script>

//展示
$(function(){
  $.ajax({
    url:'/getAllPost',
    type:'get',
    success:function(result){
      console.log(result)
      var html = template('postListTemp',result)
        $('tbody').thml(html)
    }
  })
})


// 分页
  重点:limit 关键字实现分页
      --limit 一个参数: 从开始查询指定数量的记录
      --limit 二个参数: 从指定索引开始,查询指定的数量的记录,索引从0开始
  分析分页需要我们前台和后台做什么--传递什么参数
      --1.我们知道你想每页展示几条记录:pageSize = 2
      --2.我得知道你想要第几页的数据:pageNum = 1

//写出分页查询语句
//查询语法: 关键字有严格的顺序
//select from join where [group by] having [order by]limit
select posts.*,users.nickname,categories.name
from posts
join users on posts .category_id = categories.id
order dy id desc
limit (pageNum-1)*pageSize,pageSize


//后台业务处理器
  //在控制器:接收参数,进行传递
/*   
    exports.getAllPost = (req,res) => {
      //获取用户参数
      var obj = req.query;
      //调用数据模块
      postsModel.getAllpost(obj,(err,data) => {
        if(err){
          res.json({code:400,msg:'查询数据失败'})
        }else{
          //转换
          for(var i=0;i<data.length;i++){}
          //moment():如果没有传递参数,就获取当前日期值 进行转换,如果需要转换指定的日期,则需要传递参数
          //format:进行格式化,里面进行自定义的格式设置
          data[i].created = moment(data[i].created).format('YYYY-MM-DD HH-mm-ss')
        }        
        })
 */
    exports.getAllPost = (req,res) => {
      // 获取用户参数
      var obj = req.query;
      // 调用数据模块
      postsModel.getAllPost(obj,(err,data) => {
          if(err){
              res.json({code:400,msg:'数据查询失败'})
          }else{
              // 转换
              for(var i=0;i<data.length;i++){
                  // moment():如果没有传递参数，就获取当前日期值进行转换，如果需要转换指定的日期，则需要传递参数
                  // format：进行格式化，里面进行自定义的格式设置
                  data[i].created = moment(data[i].created).format('YYYY-MM-DD HH-mm-ss')
              }
              res.json({
                  code:200,
                  msg:'数据查询成功',
                  data:data
              })
          }
      })
  }
    
  //在数据模块中:使用接收到的参数生成sql语句
  //obj是分页查询参数对象
  //里面必须包含这两个成员
  //obj.pageNum:当前页码
  //obj.pageSize:每页显示的记录数
  exports.getAllPost = (obj,callback) => {
    //1.创建sql 语句--多表连接
    var sql = 'select posts.*,users.nickname,categories.name
    from posts
    join users on posts.user_id = users.id
    join categories on posts.category_id = categories.id
    order by desc
    limit ${(obj.pageNum-1)*obj.pageSize},${obj.pageSize}'
    //2.调用方法获取数据
    conn.query(sql,(err,results)=>{
      if(err){
        callback(err)
      }else{
        callback(null,results)
      }
    })
  }

  //前台页面处理:传递后台必需的参数
  $(function(){
    $.ajax({
      url:'/getAllPost',
      type:'get',
      //分页查询需要参数
      data:{
        pageNum:1,
        pageSize:3
      },
      success:function(result){
        console.log(result)
        var html = template('postList',result)
        $('tbody').html(html)
      }
    })
  })
