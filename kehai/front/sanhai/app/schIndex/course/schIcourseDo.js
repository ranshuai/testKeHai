define("schIcourseDo",['money','pageBar','dialogs','base','jquery_ui_min'],function(money,pageBar,dialogs){

	var a=function(){
		/*只有学生身份显示购物车*/
		if(user.userIdentity==2){
			$('.shopping_car').removeClass('hide');
		}
		 var url="/site/shool/findCourseBymode.do";
		 var orginfo = schI_page.course.data.Orginfos;//本机构简介
		 var data="orgId="+orgidid+"&courseMode=0&";

		loadonotoone(url, orgidid,0,1);

		$('#navigation').children('li').eq(0).children('a').attr("href","/site/shool/"+orgidid+"/findCourseByorgId.htm");
		 $('#navigation').children('li').eq(1).children('a').attr("href","/site/shool/"+orgidid+"/findCourse.htm");
		 $('#navigation').children('li').eq(2).children('a').attr("href","/site/shool/"+orgidid+"/findTeacher.htm");
		 $('#navigation').children('li').eq(3).children('a').attr("href","/site/shool/"+orgidid+"/findevaluateRecord.htm");
		 $('#navigation').children('li').eq(4).children('a').attr("href","/site/shool/"+orgidid+"/profile.htm");
		 if(orginfo.length>0){
			$('#org').text(orginfo[0].orgName);
		 }


		/*根据类型查找课程*/
		function getCous(par){
			var courseMode="";
			var courseType=par.text();
			if ("一对一" == courseType) courseMode="0";
			if ("班课" == courseType) courseMode="1";
			if(courseMode==0){
				var data="orgId="+orgidid+"&courseMode="+courseMode+"&";
				loadonotoone(url, orgidid,courseMode,1) ;
			}else{
				var data="orgId="+orgidid+"&courseMode="+courseMode+"&";
				loadpublice(url, orgidid,courseMode,1);
			}
            par.addClass('ac');
            par.parent().siblings().children().removeClass('ac');

		}

		function continueCourse(){ //继续选课
			var courseMode = $('#courseMode').val();
			var courseId =$('#courseId').val();
			var auditFlag = 0;
			var remark = $('#notice_textarea').val();
			var count= parseInt($("#shoppingcount").text())+1;
			$("#shoppingcount").text(count);
			$.ajax({
				url:"/orderDeal/add.do",
				type:"post",
				dataType:"json",
				data:{
					courseMode: courseMode,
					courseId: courseId,
					auditFlag: auditFlag,
					remark: remark
				},
				success:function(response){

					//console.log(response.resCode);

					if("000" == response.resCode ) {
						$('#notice_textarea').val("");
						$(".pushNotice").dialog("close");
					}
					if("200" == response.resCode ) {
						$('#notice_textarea').val("");
						window.location.href = "/login.htm";
						$(".pushNotice").dialog("close");
					}
				}
			});
		}
		function payCourse(){//去购物车结算
			var courseMode = $('#courseMode').val();
			var courseId =$('#courseId').val();
			var auditFlag = 0;
			var remark = $('#notice_textarea').val();
			var count= parseInt($("#shoppingcount").text())+1;
			$("#shoppingcount").text(count);
			$.ajax({
				url:"/orderDeal/add.do",
				type:"post",
				dataType:"json",
				data:{
					courseMode: courseMode,
					courseId: courseId,
					auditFlag: auditFlag,
					remark: remark
				},
				success:function(response){

					//console.log(response.resCode);

					if("000" == response.resCode ) {
						$('#notice_textarea').val("");
						window.location.href="/shopping/shoppingCoureses.htm";

						$(".pushNotice").dialog("close");
					}
					if("200" == response.resCode ){
						$('#notice_textarea').val("");
						window.location.href = "/login.htm";
						$(".pushNotice").dialog("close");
					}
				}
			});
		}
		function addShoppingCart(obj) {
			var courseMode = obj.parent('div').children('input').eq(0).val();
			var courseId = obj.parent('div').children('input').eq(1).val();
			var auditFlag = 0;
			$.ajax({
				url: "/site/shopping/add.do",
				type: "post",
				dataType: "json",
				data: {
					courseMode: courseMode,
					courseId: courseId,
					auditFlag: auditFlag,
					remark: ""
				},
				success: function (response) {
					if ("000" == response.resCode) {
						var count = parseInt($("#shoppingcount").text()) + 1;
						$("#shoppingcount").text(count);
						dialogs._shoppingcar(function(){
						},function(){
							window.location.href = "/shopping/shoppingCoureses.htm";
						})

					}
					if ("200" == response.resCode) {
						window.location.href = "/login.htm";
						$('#notice_textarea').val("");
						$(".pushNotice").dialog("close");
					}
					// 2015-10-16 蒋淼修改中在add.do中校验只有学生用户可以加入购物车
					if("300" == response.resCode){
						dialogs._timer(response.resMsg,2,2,null);
					}
				}
			});
		}

		function loadonotoone(url, orgid,courseMode,currPage){
			$.ajax({
				url:url,
				data: {
					orgId: orgid,
					courseMode: courseMode,
					currentPage: currPage
				},
				dataType: "json",
				type:"post",
				success:function(result) {
					//console.log(result);
					var Cour=result.data.Coureses.data;
					showOnetoOnoCoureses(Cour);
					pageBar.showPageBar(result.data.Coureses.currPage, result.data.Coureses.totalPages, function (currPage) {
						//console.log("显示分页加载条: "+currPage);
						loadonotoone(url, orgid,courseMode,currPage)
					})
				}
				,
				error:function(xhr,status,error) {
					//alert("请求失败.");
				}
			});

		}

		function loadpublice(url, orgid,courseMode,currPage){
			//console.log(a);
			//console.log(data)
			$.ajax({
				url:url,
				data: {
					orgId: orgid,
					courseMode: courseMode,
					currentPage: currPage
				},
				dataType: "json",
				type:"post",
				success:function(result) {

					var Cour=result.data.Coureses.data;
					showpublicCoureses (Cour);
					pageBar.showPageBar(result.data.Coureses.currPage, result.data.Coureses.totalPages, function (currPage) {
						//console.log("显示分页加载条: "+currPage);
						loadpublice(url, orgid,courseMode,currPage)
					})

				}
				,
				error:function(xhr,status,error) {
					//alert("请求失败.");
				}
			});

		}

		function showOnetoOnoCoureses (value){
			var tab="";
			for(var i=0;i<value.length;i++){

				var val=value[i];

				var price=money.fmoney(Number(val.price) / 100, 2)
				var duration=parseFloat(val.duration)/60;
				var courseurl="";
				if(val.advertiseResId==""||val.advertiseResId==0||val.advertiseResId==undefined){
					courseurl="/front/sanhai/images/course.png";
				}else{
					courseurl="/file/loadImage/" + val.advertiseResId + "/270/155.r";
				}

				tab+="<div class='class_item'>"+
					"<div class='class_img_warp'>"+
					"<a href='/site/course/" + val.courseId +"/courseContent.htm'><img STYLE='width:270px; height:155px;' src='"+courseurl+"'/></a>"+
					"</div>"+
					"<div class='class_item_cont'>"+
					"<h2>"+
					"<a href='/site/course/" + val.courseId +"/courseContent.htm'>" + val.courseTitle +"</a>"+
					"<span>火热报名中</span>"+
					"</h2>"+
					"<table>"+
					"<colgrounp>"+
					" <col width='80px'/>"+
					"<col width='125px'/>"+
					"</colgrounp>"+
					"<tr>"+
					"<td class='tr'>总课时数：</td>"+
					"<td>" + duration +"小时</td>"+
					"</tr>"+
					"<tr>"+
					"<td class='tr'>年级：</td>"+
					"<td>" + val.grade +"</td>"+
					"</tr>"+
						/* "<tr>"+
						 "<td class='tr'>教材版本：</td>"+
						 "<td>" + val.teaVersion +"</td>"+
						 "</tr>"+*/
					"<tr>"+
					"<td class='tr'>科目：</td>"+
					"<td>" + val.subject +"</td>"+
					"</tr>"+
					"<tr>"+
					"<td class='tr'>价格：</td>"+
					"<td class='course_price'>" + price +"</td>"+
					"</tr>"+
					"</table>"+
					"</div>"+
					"<div class='add_shopping_car' id='add_shopping_car'>"+
					"<input type='hidden' value='0'/>"+
					"<input type='hidden' value='" + val.courseId +"'/>"+
					"<button type='button' class='btn ' onclick=\"window.open('/consult/chat.htm?type=course&typeId="+val.courseId+"','','height=730,width=900');\">去咨询</button>"+
					"<button type='button' class='btn schI_shopcar'>加入购物车</button>"+
					"</div>"+
					"</div>";


			}
			$("#cousdatas").html(tab);
			$('.popBox').dialog({
				autoOpen: false,
				width: 600,
				modal: true,
				resizable: false,
				close: function() {
					$(this).dialog("close")
				}
			});



			$('.pushBtnJs').click(function() {
				var courseMode=$(this).parent('div').children('input').eq(0).val();
				var courseId=$(this).parent('div').children('input').eq(1).val();
				$("#pushNotice").dialog("open");

				$('#courseMode').val(courseMode);
				$('#courseId').val(courseId);
				return false;
			});
			$('.cancelBtn').click(function() {

				$(".pushNotice").dialog("close");
			})


			$('.schI_shopcar').click(function(){ addShoppingCart($(this)) });

		}

		function showpublicCoureses (value){//班课
			var tab="";
			for(var i=0;i<value.length;i++){

				var val=value[i];

//        var price= parseFloat(val.price)/100;
				var price=money.fmoney(Number(val.price) / 100, 2)
				var duration=parseFloat(val.duration)/60;

				var courseurl="";
				if(val.advertiseResId==""||val.advertiseResId==0||val.advertiseResId==undefined){
					courseurl="/front/sanhai/images/course.png";
				}else{
					courseurl="/file/loadImage/" + val.advertiseResId + "/270/155.r";
				}
				tab+="<div class='class_item'>"+
					"<div class='class_img_warp'>"+
					"<a href='/site/course/" + val.courseId +"/courseContent.htm'><img STYLE='width:270px; height:155px;' src='"+courseurl+"'/></a>"+
					"</div>"+
					"<div class='class_item_cont'>"+
					"<h2>"+
					"<a href='/site/course/" + val.courseId +"/courseContent.htm'>" + val.courseTitle +"</a>"+
					"<span>火热报名中</span>"+
					"</h2>"+
					"<table class='one_to_one'>"+
					" <colgrounp>"+
					"<col width='85px'/>"+
					"<col width='125px'/>"+
					"<col width='85px'/>"+
					"<col width='125px'/>"+
					"</colgrounp>"+
					"<tr>"+
					"<td class='tr'>节次总数：</td>"+
					"<td>10节</td>"+
					"<td class='tr'>单节时长：</td>"+
					"<td>40分钟</td>"+
					"</tr>"+
					"<tr>"+
					"<td class='tr'> 年级：</td>"+
					"<td>" + val.grade +"</td>"+
					"<td class='tr'>招生人数：</td>"+
					"<td>20人</td>"+
					"</tr>"+
						/*"<tr>"+
						 "<td class='tr'>教材版本：</td>"+
						 "<td>" + val.teaVersion +"</td>"+
						 "<td class='tr'></td>"+
						 "<td></td>"+
						 "</tr>"+*/
					"<tr>"+
					"<td class='tr'>课程类型：</td>"+
					" <td colspan='3'>班课</td>"+
					"</tr>"+
					"<tr>"+
					"<td class='tr'>课程安排：</td>"+
					"<td colspan='3'>开课日期2015-06-06 每周一、三 18:00</td>"+
					"</tr>"+
					"</table>"+
					"</div>"+
					"<div class='add_shopping_car'>"+
					" <p>" + price +"</p>"+
					"<input type='hidden' value='0'/>"+
					"<input type='hidden' value='" + val.courseId +"'/>"+
					"<button type='button' class='btn pushBtnJs'>加入购物车</button>"+
					" </div>"+
					" </div>";





			}
			$("#cousdatas").html(tab);
			$('.popBox').dialog({
				autoOpen: false,
				width: 600,
				modal: true,
				resizable: false,
				close: function() {
					$(this).dialog("close")
				}
			});
			$('.pushBtnJs').click(function() {
				var courseMode=$(this).parent('div').children('input').eq(0).val()
				var courseId=$(this).parent('div').children('input').eq(1).val()
				$("#pushNotice").dialog("open");

				$('#courseMode').val(courseMode);
				$('#courseId').val(courseId);
				return false;
			});
			$('.cancelBtn').click(function() {

				$(".pushNotice").dialog("close");
			})
		}

		/**
		 * 加入购物车请求
		 * @param courseId
		 * @param courseMode
		 * @param auditFlag
		 * @param remark
		 */
		function toShopping(courseId, courseMode, auditFlag, remark){
			$.ajax({
				url:"/orderDeal/add.do",
				type:"post",
				dataType:"json",
				data:{
					courseMode: courseMode,
					courseId: courseId,
					auditFlag: auditFlag,
					remark: remark
				},
				success:function(response){

					//console.log(response.resCode);

					if("000" == response.resCode ) alert("加入购物车");
					if("200" == response.resCode ) window.location.href = "/login.htm";
				}
			});
		}


		$('#schI_oto').click(function(){ getCous($(this)) });
		$('#schI_banh').click(function(){ getCous($(this)) });

		$('#schI_continueCourse').click(function(){ continueCourse() });
		$('#schI_payCourse').click(function(){ payCourse() });


	}
	return{
		a:a
	}
})