define("schIprofileDo",['common','base'],function(common){

	var a=function(){
		/*只有学生身份显示购物车*/
		if(user.userIdentity==2){
			$('.shopping_car').removeClass('hide');
		}
		var orginfo = schI_pagep.course.data.Orginfos;//本机构简介

		$('#navigation').children('li').eq(0).children('a').attr("href","/site/shool/"+orgidid+"/findCourseByorgId.htm");
		$('#navigation').children('li').eq(1).children('a').attr("href","/site/shool/"+orgidid+"/findCourse.htm");
		$('#navigation').children('li').eq(2).children('a').attr("href","/site/shool/"+orgidid+"/findTeacher.htm");
		$('#navigation').children('li').eq(3).children('a').attr("href","/site/shool/"+orgidid+"/findevaluateRecord.htm");
		$('#navigation').children('li').eq(4).children('a').attr("href","/site/shool/"+orgidid+"/profile.htm");


		if(orginfo.length>0){

			$('#orginfos').html(common.textAreaEscape(orginfo[0].des));
			$('#org').text(orginfo[0].orgName);
			var Imgarray = document.getElementById('orginfos').getElementsByTagName('img');
			var realWidth;//真实的宽度
			var realHeight;//真实的高度
			for(var i =0;i<Imgarray.length;i++) {
				var imgtemp = new Image();//创建一个image对象
				imgtemp.src = Imgarray[i].src;
				imgtemp.index = i;//指定一个检索值，用于确定是哪张图
				imgtemp.onload = function () {//图片加载完成后执行
					var _stemp = this;//将当前指针复制给新的变量，不然会导致变量共用
					realWidth = this.width;
					realHeight = this.height;
					if (realWidth >=600) {
						Imgarray[_stemp.index].style.width = 600 + 'px';
						Imgarray[_stemp.index].style.height = 'auto';
					}
				}

			}



		}

	}
	return{
		a:a
	}
})