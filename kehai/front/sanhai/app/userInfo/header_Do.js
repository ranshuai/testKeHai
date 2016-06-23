/*头部中间的模块*/
define(["jquery"],function(){

	return{
		init:function(){
			if("/profile.htm" == window.location.pathname){
				$.ajax({
					type: 'post',
					dataType:'json',
					url:'/perfectInfo/header.do',
					data:{},
					success:function(data){
						var userIdentity =data.data.userIdentity;
						$(".font18 em").text((userIdentity=='2'?(data.data.nickName==''?data.data.accont:data.data.nickName):(data.data.name==''?data.data.accont:data.data.name)));
						if(data.data.ppResId!=undefined&&data.data.ppResId!='0'&&data.data.ppResId != ""){
							var loadImg = '<img src="/file/loadImage/' + data.data.ppResId + '/100/100.r?' + new Date().getTime() +'">';
							$(".pic").html("").append(loadImg);
						}
						if( data.data.rate != "100%" ){
							$('.progress_bar_rate').removeClass('hide'); 
							$('.isinfo').removeClass('hide');      
						}

						$("#orgName").text(data.data.orgName);
						//进度条
						$('.progress_bar_rate').children('strong').text(data.data.rate);
						$('.progress_bar_o').css('width',data.data.rate);
						$('.progress_bar_rate').css('left',data.data.rate);
						$("#avgsourceScore1").text(data.data.score+" 分");
						$("#teacherNum").text(data.data.teacherNum);
						$("#courseNum").text(data.data.courseNum);
						$("#studentNum").text(data.data.studentNum);

						$('.data_text_o').siblings().children().attr("href", data.data.perfectInfoUrl) ;
						$('.data_text_ol').siblings().attr("href", data.data.indexUrl) ;

						score_small = function(str,obj){
							var average = 88/5;//平均数

							var num1,num2
							if(str){
								num1 =  Number(str.charAt(0));
								num2 = Number(str.charAt(2)/10);
							}

							var oRed_js_W =average*num1+average*num2;
							var obj = $('.'+obj).eq(0);
							if(num1<=0){
								obj.css('width',oRed_js_W-2+'px');
							}else{
								obj.css('width',oRed_js_W+num1+'px');
							}
						};

						score_small(data.data.orgScore,'red_js');
					},
					error:function(data){}
				});

			}else{
				$.ajax({
					type: 'post',
					dataType:'json',
					url:'/perfectInfo/header.do',
					data:{},
					success:function(data){
						if(data.data.ppResId!=undefined&&data.data.ppResId!='0'&&data.data.ppResId != ""){
							var loadImg = '<img src="/file/loadImage/' + data.data.ppResId + '/60/60.r?' + new Date().getTime() +'">';
							$(".header_mid_center_logo").html("").append(loadImg);
						}
					},
					error:function(data){}
				});
			}
		}
	}
});

