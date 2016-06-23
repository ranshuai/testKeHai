define("schIbodyDo",['money','common','base'],function(money,common){
	var a=function(){
		/*只有学生身份显示购物车*/
		if(user.userIdentity==2){
			$('.shopping_car').removeClass('hide');
		}
		var evaluateReyresult=null;
		var terdayCour = schI_page.course.data.Coureses;//本机构所有课程
		var teachersInfor = schI_page.course.data.teacherInfos.data;//本机构所有老师
		var evaluate = schI_page.course.data.evaluate.data;//最新评论
		var evaluateRey = schI_page.course.data.evaluateRey;//最新回复
		var orginfo = schI_page.course.data.Orginfos;//本机构简介
		evaluateReyresult=evaluateRey;

		$('#navigation').children('li').eq(0).children('a').attr("href","/site/shool/"+orgidid+"/findCourseByorgId.htm");
		$('#navigation').children('li').eq(1).children('a').attr("href","/site/shool/"+orgidid+"/findCourse.htm");
		$('#navigation').children('li').eq(2).children('a').attr("href","/site/shool/"+orgidid+"/findTeacher.htm");
		$('#navigation').children('li').eq(3).children('a').attr("href","/site/shool/"+orgidid+"/findevaluateRecord.htm");
		$('#navigation').children('li').eq(4).children('a').attr("href","/site/shool/"+orgidid+"/profile.htm");
		$('#morecourse').attr("href","/site/shool/"+orgidid+"/findCourse.htm");
		$('#moreteacher').attr("href","/site/shool/"+orgidid+"/findTeacher.htm");
		$('#moreevaluate').attr("href","/site/shool/"+orgidid+"/findevaluateRecord.htm");

		if(terdayCour.length>0){
			showCoureses (terdayCour);
		}
		if(teachersInfor.length>0){
			showTeachers(teachersInfor);
		}
		if(evaluate.length>0){
			sercheEvaluate(evaluate,evaluateRey);
		}

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

		$('.all_comment').children('ul').eq(0).children('li').eq(0).children('label').text("全部评论（"+schI_pagebody.evaluateTotal+"）");
		$('.all_comment').children('ul').eq(0).children('li').eq(1).children('label').text("好评（"+schI_pagebody.goodEvaluateRecordTotal+"）");
		$('.all_comment').children('ul').eq(0).children('li').eq(2).children('label').text("中评（"+schI_pagebody.mediumEvaluateRecordTotal+"）");
		$('.all_comment').children('ul').eq(0).children('li').eq(3).children('label').text("差评（"+schI_pagebody.differenceEvaluateRecordTotal+"）");


		function showCoureses (value){
			var tab="";
			for(var i=0;i<value.length;i++){
				if(i<8){
					var val=value[i];

					var url="";
					var buyName="";
					if(val.userEntity!=null){
						if(val.userEntity.ppResId==""||val.userEntity.ppResId==0||val.userEntity.ppResId==undefined){
							url="/front/sanhai/images/person.png";
						}else{
							url="/file/loadImage/" + val.userEntity.ppResId + "/36/36.r";
						}
						buyName=val.userEntity.nickName;
					}else{
						url="/front/sanhai/images/person.png";
					}

					var courseurl="";
					if(val.advertiseResId==""||val.advertiseResId==0||val.advertiseResId==undefined){
						courseurl="/front/sanhai/images/course.png";
					}else{
						courseurl="/file/loadImage/" + val.advertiseResId + "/180/100.r";
					}

					//var price= parseFloat(val.price)/100;
					var price = money.fmoney(Number(val.price)/100,2);
					var duration=parseFloat(val.duration)/60;
					var byename="";
					if(val.buyCount==0){
						byename="暂无人购买该课程"
					}else{
						if(val.buyCount==1){
							byename=buyName +"购买了该课程";
						}else{
							byename=buyName +"等人购买了该课程";
						}
					}
					if(val.courseMode==0){//一对一
						tab+=" <li>"+
							"<div class='curriculum_main pr'>"+
							" <dl>"+
							"<dt class='fl'><a href='/site/course/" + val.courseId +"/courseContent.htm'><img STYLE='width:180px; height:110px;' src='"+courseurl+"'/></a></dt>"+
							"<dd class='fl'>"+
							"<p class='blue'>【" + val.grade +" " + val.subject +"】</p>"+
							"<h4><a href='/site/course/" + val.courseId +"/courseContent.htm'>" + val.courseTitle +"</a></h4>"+
							"<em class='orange'>" + price +"</em>"+
							"</dd>"+
							"</dl>"+
							" <hr />"+
							"<div class='bg_gray_l consultation'>"+
							"<span>学生：" + val.buyCount +"名</span>"+
								//"<button type='button' class='bg_orenge w110'>我要咨询</button>"+
							"<button type='button' class='bg_orenge w110' onclick=\"window.open('/consult/chat.htm?type=course&typeId="+val.courseId+"','','height=730,width=900');\">我要咨询</button>"+
							"</div>"+
							"<p class='buy_classes'>"+
							"<label class='fl'>"+
							"<img STYLE='width:36px; height:36px;' src='"+url+"'>"+
							"<span>" + byename+"</span>"+
							"</label>"+
							" <label class='fr'>"+
							/*"<em class='gray_999'>10分钟前</em>"+*/
							"<a href='/site/course/" + val.courseId +"/courseContent.htm' class='orange'>课程详情 </a>"+
							"</label>"+
							"</p>"+
							"<i class='oto pa'></i>"+
							"</div>"+
							"</li>"

					}
					if(val.courseMode==1){//班课
						tab+="<li>"+
							"<div class='curriculum_main pr'>"+
							"<dl>"+
							"<dt class='fl'><a href='/site/course/" + val.courseId +"/courseContent.htm'><img STYLE='width:180px; height:110px;' src='"+courseurl+"'/></a></dt>"+
							"<dd class='fl'>"+
							"<p class='blue'>【" + val.grade +" " + val.subject +"】</p>"+
							"<h4><a href='/site/course/" + val.courseId +"/courseContent.htm'>" + val.courseTitle +"</a></h4>"+
							"<em class='orange fl'>￥" + price +"</em><span class='fr'>限额：<a class='orange'>30人</a></span>"+
							"</dd>"+
							"</dl>"+
							"<hr />"+
							"<div class='bg_gray_l consultation'>"+
							"<span>授课老师：唐僧</span>"+
							"<span>学生：" + val.buyCount +"名</span>"+
								//"<button type='button' class='bg_orenge w110'>我要咨询</button>"+
							"<button type='button' class='bg_orenge w110' onclick=\"window.open('/consult/chat.htm?type=course&typeId="+val.courseId+"','','height=730,width=900');\">我要咨询</button>"+
							" </div>"+
							"<p class='buy_classes'>"+
							"<label class='fl'>"+
							"<img STYLE='width:36px; height:36px;' src='"+url+"'>"+
							"<span>" + buyName+"等人购买了该课程　余额：<em class='orange'>3人</em></span>"+
							"</label>"+
							"<label class='fr'>"+
							"<a href='/site/course/" + val.courseId +"/courseContent.htm' class='orange'>课程详情 </a>"+
							"</label>"+
							"</p>"+
							"<i class='classes pa'></i>"+
							"</div>"+
							"</li>"
					}

				}else{
					break
				}

			}
			$("#cous").html(tab);
		}


		function showTeachers (value){
			var tab="";
			for(var i=0;i<value.length;i++){
				if(i<8){
					var val=value[i];
					var coustitle="";
					var cous="";
					var courseCode=val.courseCode;
					var courseCodes=courseCode.split(",")
					for(var j=0;j<courseCodes.length;j++){

						if(j!=courseCodes.length-1){
							coustitle+=common.df.show_courseCode(courseCodes[j])+","
						}else{
							coustitle+=common.df.show_courseCode(courseCodes[j])
						}
						if(courseCodes.length>3&&j<=2){
							if(j!=2){
								cous+=common.df.show_courseCode(courseCodes[j])+","
							}else{
								cous+=common.df.show_courseCode(courseCodes[j])+" ..."
							}

						}
						if(courseCodes.length==1||courseCodes.length==2||courseCodes.length==3){
							if(j!=courseCodes.length-1){
								cous+=common.df.show_courseCode(courseCodes[j])+","
							}else{
								cous+=common.df.show_courseCode(courseCodes[j])
							}

						}



					}
					var src=""
					if(val.ppResId==""||val.ppResId==0||val.ppResId==undefined){
						src="/front/sanhai/images/person.png";
					}else{
						src="/file/loadImage/" + val.ppResId + "/147/147.r";
					}



					tab+="<dl>"+
						"<dt><a href='/site/theacher/" + val.userId +"/toTeacherIndex.htm'><img STYLE='width:147px; height:147px;' src='"+src+"'/></a></dt>"+
						"<dd>"+
						"<h5 class='gray_d'><a href='/site/theacher/" + val.userId +"/toTeacherIndex.htm'>" + val.name +"</a></h5>"+
						"<h3 title='" + coustitle +"'>" + cous +"</h3>"+
						"<p><a>" + (val.seniority?val.seniority:1) +"年教龄</a>"+
						"</p>"+
						"</dd>"+
						"</dl>"




				}else{
					break
				}



			}
			$("#tea").html(tab);
		}


		function sercheEvaluate(val,evaluateReys){
			var tab="";
			//debugger;
			if(val.length>0) {
				for (var k = 0; k < val.length; k++) {
					if(k<6){
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
								"<div class='view_reply hide'>";
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
								"<div class='view_reply hide'>";
							tab += str;
							evaluateReyLength=0;
						}


						tab += "</div>"+
							"</li>";
					}else{
						break;
					}

				}
			}


			$("#sereva").html(tab);
			$('#sereva li').each(function(){
				$(this).find('dl:last').addClass('last_dialogItem');
			});
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


		function evaluate1(parm){
			$.ajax({
				type:"post",
				url:"/site/shool/searchEvaluateBymodel.do",
				dataType:"json",
				data:{
					"parm":parm,
					"currentPage":1,
					"orgid":orgidid
				},
				success:function(result) {
					/* if (common.checkResponse(result) == false) {
					 return;
					 }
					 if (common.checkResponse(evaluateReyresult) == false) {
					 return;
					 }*/
					var val = result.data.rows;//评论记录
					sercheEvaluate(val,evaluateReyresult);

				}
				,
				error:function(xhr,status,error) {
					//alert("请求失败.");
				}
			});

		}


		/*根据类型查找课程*/
		function  getCous(par){
			var courseMode="";
			var courseType=par.text();
			if ("一对一" == courseType) courseMode="0";
			if ("班课" == courseType) courseMode="1";
			if ("全部课程" == courseType) courseMode="-1";
			par.addClass('ac');
			par.parent().siblings().children().removeClass('ac');

			$.ajax({
				type:"post",
				url:"/site/shool/findCourseNoPage.do",
				dataType:"json",
				data:{
					"orgId":orgidid,
					"courseMode":courseMode,
					"currentPage":"1"
				},
				success:function(result) {

					var Cour=result.data.Coureses;//一对一课程
					if(courseMode==0){
						var tab="";
						for(var i=0;i<Cour.length;i++){
							if(i<8){
								var val=Cour[i];

								//console.log(val);

//              var price= parseFloat(val.price)/100;
								var price = money.fmoney(Number(val.price)/100,2);
								var duration=parseFloat(val.duration)/60;
								var url="";
								var buyName="";
								if(val.userEntity!=null){
									if(val.userEntity.ppResId==""||val.userEntity.ppResId==0||val.userEntity.ppResId==undefined){
										url="/front/sanhai/images/person.png";
									}else{
										url="/file/loadImage/" + val.userEntity.ppResId + "/36/36.r";
									}
									buyName=val.userEntity.nickName;
								}else{
									url="/front/sanhai/images/person.png";
								}

								var courseurl="";
								if(val.advertiseResId==""||val.advertiseResId==0||val.advertiseResId==undefined){
									courseurl="/front/sanhai/images/course.png";
								}else{
									courseurl="/file/loadImage/" + val.advertiseResId + "/180/110.r";
								}
								var byename="";
								if(val.buyCount==0){
									byename="暂无人购买该课程"
								}else{
									if(val.buyCount==1){
										byename=buyName +"购买了该课程";
									}else{
										byename=buyName +"等人购买了该课程";
									}
								}

								tab+=" <li>"+
									"<div class='curriculum_main pr'>"+
									" <dl>"+
									"<dt class='fl'><a href='/site/course/" + val.courseId +"/courseContent.htm'><img STYLE='width:180px; height:110px;' src='"+courseurl+"'/></a></dt>"+
									"<dd class='fl'>"+
									"<p class='blue'>【" + val.grade +" " + val.subject +"】</p>"+
									"<h4><a href='/site/course/" + val.courseId +"/courseContent.htm'>" + val.courseTitle +"</a></h4>"+
									"<em class='orange'>" + price +"</em>"+
									"</dd>"+
									"</dl>"+
									" <hr />"+
									"<div class='bg_gray_l consultation'>"+
									"<span>学生：" + val.buyCount +"名</span>"+
//                        "<button type='button' class='bg_orenge w110'>我要咨询</button>"+
									"<button type='button' class='bg_orenge w110' onclick=\"window.open('/consult/chat.htm?type=course&typeId="+val.courseId+"','','height=730,width=900');\">我要咨询</button>"+
									"</div>"+
									"<p class='buy_classes'>"+
									"<label class='fl'>"+
									"<img STYLE='width:36px; height:36px;' src='"+url+"'>"+
									"<span>" + byename +"</span>"+
									"</label>"+
									" <label class='fr'>"+
									"<em class='gray_999'>10分钟前</em>"+
									"<a href='/site/course/" + val.courseId +"/courseContent.htm' class='orange'>课程详情 </a>"+
									"</label>"+
									"</p>"+
									"<i class='oto pa'></i>"+
									"</div>"+
									"</li>"

							}else{
								break
							}



						}
						$("#cous").html(tab);
					}else if(courseMode==1){
						var tab="";
						for(var i=0;i<Cour.length;i++){
							if(i<8){
								var val=Cour[i];

								var url="";
								var buyName="";
								if(val.userEntity!=null){
									if(val.userEntity.ppResId==""||val.userEntity.ppResId==0||val.userEntity.ppResId==undefined){
										url="/front/sanhai/images/person.png";
									}else{
										url="/file/loadImage/" + val.userEntity.ppResId + "/36/36.r";
									}
									buyName=val.userEntity.nickName;
								}else{
									url="/front/sanhai/images/person.png";
								}
								var courseurl="";
								if(val.advertiseResId==""||val.advertiseResId==0||val.advertiseResId==undefined){
									courseurl="/front/sanhai/images/course.png";
								}else{
									courseurl="/file/loadImage/" + val.advertiseResId + "/180/110.r";
								}
								var byename="";
								if(val.buyCount==0){
									byename="暂无人购买该课程"
								}else{
									if(val.buyCount==1){
										byename=buyName +"购买了该课程";
									}else{
										byename=buyName +"等人购买了该课程";
									}
								}
								var price= parseFloat(val.price)/100;
								var duration=parseFloat(val.duration)/60;
								tab+="<li>"+
									"<div class='curriculum_main pr'>"+
									"<dl>"+
									"<dt class='fl'><a href='/site/course/" + val.courseId +"/courseContent.htm'><img STYLE='width:180px; height:110px;' src='"+courseurl+"'/></a></dt>"+
									"<dd class='fl'>"+
									"<p class='blue'>【" + val.grade +" " + val.subject +"】</p>"+
									"<h4><a href='/site/course/" + val.courseId +"/courseContent.htm'>" + val.courseTitle +"</a></h4>"+
									"<em class='orange fl'>￥" + price +"</em><span class='fr'>限额：<a class='orange'>30人</a></span>"+
									"</dd>"+
									"</dl>"+
									"<hr />"+
									"<div class='bg_gray_l consultation'>"+
									"<span>授课老师：唐僧</span>"+
									"<span>学生：" + val.buyCount +"名</span>"+
//                        "<button type='button' class='bg_orenge w110'>我要咨询</button>"+
									"<button type='button' class='bg_orenge w110' onclick=\"window.open('/consult/chat.htm?type=course&typeId="+val.courseId+"','','height=730,width=900');\">我要咨询</button>"+
									" </div>"+
									"<p class='buy_classes'>"+
									"<label class='fl'>"+
									"<img STYLE='width:36px; height:36px;' src='"+url+"'>"+
									"<span>" + byename +"　余额：<em class='orange'>3人</em></span>"+
									"</label>"+
									"<label class='fr'>"+
									"<a href='/site/course/" + val.courseId +"/courseContent.htm' class='orange'>课程详情 </a>"+
									"</label>"+
									"</p>"+
									"<i class='classes pa'></i>"+
									"</div>"+
									"</li>"

							}else{
								break
							}
						}
						$("#cous").html(tab);

					}else{
						showCoureses(Cour);
					}
				},
				error:function(xhr,status,error) {
					//alert("请求失败.");
				}
			});
		}


		$('#schI_total1').click(function(){ evaluate1('total1') });
		$('#schI_good').click(function(){ evaluate1('good') });
		$('#schI_medium').click(function(){ evaluate1('medium') });
		$('#schI_difference').click(function(){ evaluate1('difference') });

		$('#getCous1').click(function(){ getCous($(this)) });
		$('#getCous2').click(function(){ getCous($(this)) });
		$('#getCous3').click(function(){ getCous($(this)) });
	}


	return{
		a:a
	}

})
