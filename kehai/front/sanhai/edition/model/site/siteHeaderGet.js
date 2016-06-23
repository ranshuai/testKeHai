/*
	*
	顶部导航的数据
	1.判断是否登录
	2.注册了级个身份
	3.点击切换身份
*/
define('SiteHeader',function(){
	function SiteHeader(){}

	SiteHeader.prototype.judgeLogin=function(callback){
		$.ajax({
			url:"/use/getLoginInfo.do",
			type:"get",
			dataType:"json",
			success:function(respons){
				 callback && callback(respons);
			},
			error:function(respons){
				console.log('失败');
			},
			complete:function(respons){
			}
		});
	}; 

	return new SiteHeader();
});


