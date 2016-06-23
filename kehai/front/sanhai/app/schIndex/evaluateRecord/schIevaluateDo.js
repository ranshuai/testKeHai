define("schIevaluateDo",['evaluate','money','pageBar','common','base_dialog_standard','base'],function(evaluate,money,pageBar,common,base_dialog_standard){

	var a=function()
	{
		/*只有学生身份显示购物车*/
		if(user.userIdentity==2){
			$('.shopping_car').removeClass('hide');
		}
		var url = "/site/shool/searchEvaluateBymodel.do";
		var evaluateReyresult=null;
		var evaluate = schI_page.course.data.evaluate.data;//最新评论
		var evaluateRey = schI_page.course.data.evaluateRey;//最新回复
		var orginfo = schI_page.course.data.Orginfos;//本机构简介
		$('#navigation').children('li').eq(0).children('a').attr("href","/site/shool/"+orgidid+"/findCourseByorgId.htm");
		$('#navigation').children('li').eq(1).children('a').attr("href","/site/shool/"+orgidid+"/findCourse.htm");
		$('#navigation').children('li').eq(2).children('a').attr("href","/site/shool/"+orgidid+"/findTeacher.htm");
		$('#navigation').children('li').eq(3).children('a').attr("href","/site/shool/"+orgidid+"/findevaluateRecord.htm");
		$('#navigation').children('li').eq(4).children('a').attr("href","/site/shool/"+orgidid+"/profile.htm");

		if(orginfo.length>0){
			$('#org').text(orginfo[0].orgName);
		}
		evaluateReyresult=evaluateRey;
		var data1 = "orgid="+orgidid+"&parm=total1&";
		loadShoolevaluate1(url, data1,1);
		var goodrate=(schI_pagebody.goodEvaluateRecordTotal/schI_pagebody.evaluateTotal).toFixed(2)*1000/10;

		if(!isNaN(goodrate)){
			$("#goodrate").text(goodrate+"%");
		}else{
			$("#goodrate").text("0"+"%");
		}
		score(schI_pagebody.orgScore,'red_js3');
		score(schI_pagebody.teaScore,'red_js2');
		score(schI_pagebody.sourceScore,'red_js1');
		$("#avgsourceScore").text(schI_pagebody.sourceScore+"分");
		$("#avgteaScore").text(schI_pagebody.teaScore+"分");
		$("#avgorgScore").text(schI_pagebody.orgScore+"分");
		/* score(orgScore,'red_js4');
		 $("#avgsourceScore1").text(orgScore+"分");*/

		$('.all_comment').children('ul').eq(0).children('li').eq(0).children('label').text("全部评论（"+schI_pagebody.evaluateTotal+"）");
		$('.all_comment').children('ul').eq(0).children('li').eq(1).children('label').text("好评（"+schI_pagebody.goodEvaluateRecordTotal+"）");
		$('.all_comment').children('ul').eq(0).children('li').eq(2).children('label').text("中评（"+schI_pagebody.mediumEvaluateRecordTotal+"）");
		$('.all_comment').children('ul').eq(0).children('li').eq(3).children('label').text("差评（"+schI_pagebody.differenceEvaluateRecordTotal+"）");


		function sercheEvaluate(val,evaluateReys){

			//console.log(evaluateReys.length);


			var tab="";
			//debugger;
			if(val.length>0) {
				for (var k = 0; k < val.length; k++) {

					var time = new Date(parseFloat(val[k].time)).format("yyyy-MM-dd hh:mm:ss");
					/*var time = val[k].time;*/
					var evaurl="";
					if(val[k].ppResId==""||val[k].ppResId==0||val[k].ppResId==undefined){
						evaurl="/front/sanhai/images/person.png";
					}else{
						evaurl="/file/loadImage/" + val[k].ppResId + "/60/60.r";
					}
					tab += "<li class='dialogItem '>"+
						"<div class='head_img'>"+
						"<a href='/site/student/" + val[k].userId + "/toStudentIndex.htm'><img STYLE='width:60px; height:60px;' src='"+evaurl+"'>"+val[k].userName+"</a>"+
						" </div>"+
						"<i class='arrow'></i>"+
							/*"<div class='title'>"+
							 "<em>"+val[k].des+"</em>"+*/
						"<div class='title_r fr'>"+
						"<span>课程："+val[k].sourceScore+"分</span>"+
						"<span>老师："+val[k].teaScore+"分</span>"+
						"<span>服务："+val[k].orgScore+"分</span>"+
						"</div>"+
							/*"</div>"+*/
						"<div class='dialogCont'>"+
						val[k].des +
						" </div>"+
						"<div class='bottom_tools'>"+
						"<span>"+time+"</span>&nbsp;&nbsp;&nbsp;<span><a href='/site/course/" + val[k].courseId +"/courseContent.htm'>《"+val[k].courseName+"》</a></span>";
					var evaluateId = val[k].evaid;
					var str = "";
					var evaluateReyLength=0;
					if (evaluateReys.length > 0) {

						for (var j = 0; j < evaluateReys.length; j++) {
							var evakeyurl="";
							if(evaluateReys[j].ppResId==""||evaluateReys[j].ppResId==0||evaluateReys[j].ppResId==undefined){
								evakeyurl="/front/sanhai/images/person.png";
							}else{
								evakeyurl="/file/loadImage/" + evaluateReys[j].ppResId + "/60/60.r";
							}
							if (evaluateReys[j].evaid == evaluateId) {
								evaluateReyLength++;
								var ti = new Date(parseFloat(evaluateReys[j].reTime)).format("yyyy-MM-dd hh:mm:ss");
								/*var ti = evaluateReys[j].reTime;*/
								str += "<dl class='clearfix'>"+
									"<dt><img STYLE='width:60px; height:60px;' src='"+evakeyurl+"'></dt>"+
									"<dd><em>"+evaluateReys[j].reUserName+"：</em>"+evaluateReys[j].content+"</dd>"+
									"<dd><span>"+ti+"</span></dd>"+
									"</dl>";
							}

						}
						tab +="<div class='bottom_r'>"+
							"<a>"+
							"<em>查看回复</em>"+
							"<span class='bot_span'>("+evaluateReyLength+")</span>"+
							"</a>"+
							"</div>"+
							"</div>"+
							"<div class='view_reply  hide'>";
						tab += str;
						evaluateReyLength=0;
					}else{
						tab +="<div class='bottom_r'>"+
							"<a>"+
							"<em>查看回复</em>"+
							"(<span class='bot_span'>"+evaluateReyLength+"</span>)"+
							"</a>"+
							"</div>"+
							"</div>"+
							"<div class='view_reply  hide'>";
						tab += str;
						evaluateReyLength=0;
					}


					tab += "</div>"+
						"</li>";


				}
			}


			$("#sereva").html(tab);
			$('#sereva li').each(function(){
				$(this).find('dl:last').addClass('last_dialogItem');
			})
			/*最新评论*/
			$('.dialogList li').each(function(i){
				var $this = $(this);
				$(this).find('.bottom_r a').click(function() {
					var  num = $this.find('.bot_span').text().substring(1,$this.find('.bot_span').text().length-1);
					if(num == 0) return false;
					if($this.find('.view_reply').css('display') == 'block'){
						$this.find('.view_reply').addClass('hide');
						$this.find('.bottom_r').children('a').removeClass('ac');
						$this.find('.bottom_r').find('em').text('查看回复');
						$this.siblings().find('.view_reply').addClass('hide');
						$this.siblings().find('.bottom_r').children('a').removeClass('ac');
					}else{
						$this.find('.view_reply').removeClass('hide');
						$this.find('.bottom_r').children('a').addClass('ac');
						$this.find('.bottom_r').find('em').text('收起回复');
						$this.siblings().find('.view_reply').addClass('hide');
						$this.siblings().find('.bottom_r').children('a').removeClass('ac');
					}
					$(document).click(function(){
						$('.view_reply').addClass('hide');;
						$('.bottom_r').find('em').text('查看回复');
						$('.bottom_r').children('a').removeClass('ac');
					});
					return false;
				});
			});
		}

		function allevaluate1(parm){

			var data = "orgid="+orgidid+"&parm="+parm+"&";
			loadShoolevaluate1(url, data,1);
		}

		function loadShoolevaluate1(url, data,currPage){
			var a = data;
			data += "currentPage=" + currPage;
			$.ajax({
				url:url,
				data: data,
				type:"post",
				success:function(result) {
					var val = result.data.rows;//评论记录
					sercheEvaluate(val,evaluateReyresult);
					var params = new Array();
					params.push("/site/shool/searchEvaluateBymodel.do");
					params.push(a);
					pageBar.setBasePageBar(result.data.totalPages, result.data.currPage, loadShoolevaluate1, params);
				}
				,
				error:function(xhr,status,error) {
					//alert("请求失败.");
				}
			});

		}

		$('#schI_total1').click(function(){ allevaluate1('total1') });
		$('#schI_good').click(function(){ allevaluate1('good') });
		$('#schI_medium').click(function(){ allevaluate1('medium') });
		$('#schI_difference').click(function(){ allevaluate1('difference') });


	}
	return{
		a:a
	}
})