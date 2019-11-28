$(function(){
  $('.btnLogin').on('click',function(){
    $.ajax({
      type : 'post',
      url : '/login',
      dataType:'json',
      //通过serialize来获取所需数据: 可以获取指定表单中所有拥有name属性的表单元素的value值
      //元素一定要name属性和value值,
      data : $('form').serialize(),
      success:function(res){
        console.log(res);
         //请求失败
        if(res.code == 400){
          $('.alert-danger > span').text(res.msg)
          // fadeIn:淡入  delay:显示   fadeOut:淡出
          $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
          }else{
            //请求登录成功后跳转  (进行页面跳转)
            location.href='/admin'

        }
      }

    })
  })
}) 