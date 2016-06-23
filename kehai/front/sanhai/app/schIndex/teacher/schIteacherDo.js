define("schIteacherDo",['money','pageBar','common','dialogs','base'],function(money,pageBar,common,dialogs){

	var a=function(){
		/*只有学生身份显示购物车*/
		if(user.userIdentity==2){
			$('.shopping_car').removeClass('hide');
		}
		var evaluateReyresult=null;
		var url="/site/shool/findTeacher.do";
		var avgteaScoremap=null;//记录所有老师的评分
		/*var teachersInfor = course.data.teacherInfos.data;//本机构所有老师*/
		/*showAllTeachers(teachersInfor);*/

		var orginfo = schI_page.course.data.Orginfos;//本机构简介
		avgteaScoremap=schI_page.course.data.avgteaScoremap+"";
		var data1 = "orgId="+orgidid+"&";
		loadTeacher(url,data1,1);
		$('#navigation').children('li').eq(0).children('a').attr("href","/site/shool/"+orgidid+"/findCourseByorgId.htm");
		$('#navigation').children('li').eq(1).children('a').attr("href","/site/shool/"+orgidid+"/findCourse.htm");
		$('#navigation').children('li').eq(2).children('a').attr("href","/site/shool/"+orgidid+"/findTeacher.htm");
		$('#navigation').children('li').eq(3).children('a').attr("href","/site/shool/"+orgidid+"/findevaluateRecord.htm");
		$('#navigation').children('li').eq(4).children('a').attr("href","/site/shool/"+orgidid+"/profile.htm");

		if(orginfo.length>0){
			$('#org').text(orginfo[0].orgName);
		}

		function loadTeacher(url, data,currPage){
			var a = data;
			data += "currentPage=" + currPage;
			$.ajax({
				url:url,
				data: data,
				type:"post",
				success:function(result) {

					var val = result.data.teacherInfos.data;//评论记录
					showAllTeachers(val);
					var params = new Array();
					params.push("/site/shool/findTeacher.do");
					params.push(a);

					pageBar.setBasePageBar(result.data.teacherInfos.totalPages, result.data.teacherInfos.currPage, loadTeacher, params);
				}
				,
				error:function(xhr,status,error) {
					//alert("请求失败.");
				}
			});
		}

		function showAllTeachers (value){
			var tab="";
			var avgteaScores=avgteaScoremap.split(",");
			var arraObj = new Array();
			var arrayscore = new Array();
			for(var i=0;i<value.length;i++){
				var val=value[i];
				var coustitle="";
				var courseCode=val.courseCode;
				var courseCodes=courseCode.split(",");
				for(var j=0;j<courseCodes.length;j++){
					if(j!=courseCodes.length-1){
						coustitle+=common.df.show_courseCode(courseCodes[j])+","
					}else{
						coustitle+=common.df.show_courseCode(courseCodes[j])
					}


				}

				var teaorg=" <ul class='score_ul p_right fl'>"+
					"<li>"+
					"<span class='score'>"+
					"<div class='gray_js'>"+
					"</div>"+
					"<div class='red_js4 red_js' >"+
					"</div>"+
					"</span><em>3.6 分</em>"+
					"</li>"+
					"</ul>";

				for(var j=0;j<avgteaScores.length;j++){
					var data=avgteaScores[j];
					var userid=   data.split("/")[0];
					if (userid==val.userId){

						teaorg=" <ul class='score_ul p_right fl'>"+
							"<li>"+
							"<span class='score'>"+
							"<div class='gray_js'>"+
							"</div>"+
							"<div class='red_js"+j+" red_js' >"+
							"</div>"+
							"</span><em>"+data.split("/")[1]+"分</em>"+
							"</li>"+
							"</ul>";
						arraObj.push("red_js"+j);
						var store=data.split("/")[1];
						arrayscore.push(store);
					}
				}

				var src=""
				if(val.ppResId==""||val.ppResId==0||val.ppResId==undefined){
					src="/front/sanhai/images/person.png";
				}else{
					src="/file/loadImage/" + val.ppResId + "/147/147.r";
				}
				var shoppingCourse= "";
				$.each(val.courseList, function (c_index, c_item) {
					shoppingCourse += "<a href='/site/course/" + c_item.courseId + "/courseContent.htm' >《" + c_item.courseTitle + "》</a>";
				});
				if(val.courseList.length>0){
					shoppingCourse += "                        ... &nbsp;<a href='/site/theacher/" + val.userId + "/toCourse.htm' class='orange'>查看更多></a>";
				}else{
					shoppingCourse += "暂无";
				}
				tab+=" <dl class='clearfix'>"+
					"<dt>"+
					"<a href='/site/theacher/" + val.userId +"/toTeacherIndex.htm'><img STYLE='width:147px; height:147px;' src='"+src+"'/><br /></a>"+
					teaorg+
					"</dt>"+
					"<dd class='tch_main'>"+
					"<div class='tch_name'>"+
					"<a href='/site/theacher/" + val.userId +"/toTeacherIndex.htm'>" + val.name +"</a>"+
					"<span>" + val.school +"</span>"+
					"</div>"+
					"<div class='tch_authentication'>"+
					"<span><i></i>身份认证</span>"+
					" <span><b></b>学历认证</span>"+
					"<span><s></s>教师认证</span>"+
					"</div>"+
					" <div class='tch_information'>"+
					"<span><i></i>"+ ((val.seniority) ? val.seniority : 1) + "年教龄</span>"+
					"<span><b></b>"+coustitle+"</span>"+
					"<span><s></s>在线授课</span>"+
					"</div>"+
					"<p>在售课程：" + shoppingCourse +"</p>"+
					" </dd>"+
					"<dd>"+
					"<input type='hidden' value='" + val.userId + "'/>"+
					"<button type='button' class='btn w110 attention schIt_attention' >+关注</button><br />"+
//                "<button type='button' class='btn w130'>去咨询</button>"+
					"<button type='button' class='btn w110' onclick=\"window.open('/consult/chat.htm?type=teacher&typeId="+val.userId+"','','height=730,width=900');\">去咨询</button>"+
					"</dd>"+
					"</dl>";
			}
			$("#teachers").html(tab);
			for(var m=0;m<arraObj.length;m++){
				score(arrayscore[m],arraObj[m]);
			}
			$('.schIt_attention').click(function(){
				attention($(this),val.userId,1)
			})
		}

		function attention(val,orgid,attentiontype){
			var userid= val.parent('dd').children('input').val();
			$.ajax({
				url: "/attention/intoAttention.do",
				type: "post",
				dataType: "json",
				data: {
					attentionObjId: userid,
					attentionType: attentiontype
				},
				success: function (response) {

					if ("000" == response.resCode){
						Kh.addAttention(val);
					}
					if ("200" == response.resCode) {
						window.location.href = "/login.htm";
					}
					if("300" == response.resCode){
						dialogs._timer(response.resMsg,2,2,null);
					}
				}
			});
		}


	}
	return{
		a:a
	}
})