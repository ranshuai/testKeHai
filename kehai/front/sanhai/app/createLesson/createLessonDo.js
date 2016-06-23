/**
 * Created by slg on 2016/1/7.
 */

define('createLessonDo',['jquery','dialogs','common', "loadVersionAndMatch",'umeditor_config','umeditor','jquery_ui_min','ztree', 'jquery.datetimepicker', 'kpTree', 'qrcode', 'lib/jquery_validate/jquery.validate','jquery_fileupload'],function($, dialog, common,load){
	load.loadCourseTypeAndMatch($("#courseType"), null, null);
	load.loadGrandAndMatch($("#grade"), null, null);
	load.loadSubjectAndMatch($("#subject"), null, null);
	$("#ctMagage").trigger("click");

	var order = null;
	var ptcourse = null;
	var course = null;
	var dataJson = {};
	var topicList = null;
	var scheduleTime = null;
	var ptSeatNum = 0;
	var reg = new RegExp("^[0-9]*$");

	var subjectID="";
	var gradeID="";
	var courseType="";
	function loadData(url, data){
		$.ajax({
			url:url,
			data:data,
			success:function(resp){
				if (resp.resCode == "000"){
					if (type == "pk"){
						order = resp.data.order;
						course = resp.data.course;
						subjectID=order.subjectId;
						gradeID=order.gradeId;
						courseType=order.courseType;
					}else{
						ptcourse = resp.data.ptcourse;
						topicList = resp.data.topicList;
						subjectID=ptcourse.subjectId;
						gradeID=ptcourse.gradeId;
						courseType=ptcourse.courseType;
					}
					scheduleTime = parseInt(resp.data.scheduleTime);
					ptSeatNum = parseInt(resp.data.ptSeatNum);
					lesson();
				}
			}
		})
	}

	//grade 转换
	function treeGrade(grade){
		switch (grade){
			case "1001":
			case "1002":
			case "1003":
			case "1004":
			case "1005":
			case "1006": return "20201";
			case "1007":
			case "1008":
			case "1009":
			case "1010": return "20202";
			case "1011":
			case "1012":
			case "1013": return "20203";
		}
	}

	function binarySearch(arrs, index) {
		var value = {};
		var node_index = -1;
		var length= arrs.length;
		for(var i =0; i<length; i++){
			if(arrs[i]['id'] == index){
				node_index = i;
				break;
			}
		}
		return arrs[node_index];
	};

	/*
	 * result 存放的是一级菜单和内容
	 *
	 */
	var result = [];
	function getTree(id,result){
		var node_index = -1;
		var length = zNodes.length;
		for(var i = 0; i < length;i++){
			if(zNodes[i].id == id){
				node_index = i;
				break;
			}
		}
		if(node_index!=-1){
			result.push(zNodes[node_index]);
		}else{
			return;
		}
		for(var i = 0;i < length;i++){
			if(zNodes[i].pId==id){
				getTree(zNodes[i].id,result);
			}
		}
	}

	/*
	 * getTreeIdArrs 过滤第一级菜单
	 */
	var getTreeIdArrs = zNodesFilter(zNodes);
	function zNodesFilter(arr){
		var getTreeId = [];
		var length = arr.length;
		for(var i = 0; i < length; i++){
			if(arr[i]['pId'] === "0"){
				getTreeId.push(arr[i]);
			}
		}
		return getTreeId;
	}

	/*
	 *   过滤学段
	 */
	function getTreeId(json,arrs){
		var node_index = -1;
		var length = arrs.length;
		for(var i = 0; i<length; i++){
			if(arrs[i]['subject'] == json.subject && arrs[i]['grade'] == json.grade){
				node_index = i;
				break;
			}
		}
		if(node_index!=-1){
			return arrs[node_index]['id']
		}else{
			return;
		}
	}



	var init = function() {
		if (type == "pk"){
			loadData("/courses/"+orderId + "/pkInit.do");
		}else{
			loadData("/courses/"+classId + "/modifyInit.do");
		}
	};


	var lesson=function(){

		$("#courseType option").each(function(index,value) {
			if ($(value).val() === courseType) {
				var txt = $(value).text();
				//$(this).attr("selected", true);
				$(this).attr("selected","selected");
				$(this).parent().prev().text(txt);
			}

		});

		//$("#grade option").each(function(index,value) {
		//	if ($(value).val() === gradeID) {
		//		var txt = $(value).text();
		//		//$(this).attr("selected", true);
		//		$(this).attr("selected","selected");
		//		$(this).parent().prev().text(txt);
		//	}
		//
		//});

		$("#subject option").each(function(index,value) {
			if ($(value).val() === subjectID) {
				var txt = $(value).text();
				//$(this).attr("selected", true);
				$(this).attr("selected","selected");
				$(this).parent().prev().text(txt);
			}

		});
		function filterGrade(){
			function filterGradeDefault(Bok){
				$('#grade').empty();
				var arr = [
					'<option value="1001">一年级</option><option value="1002">二年级</option><option value="1003">三年级</option><option value="1004">四年级</option><option value="1005">五年级</option><option value="1006">六年级</option>',
					'<option value="1007">预初</option><option value="1008">初一</option><option value="1009">初二</option><option value="1010">初三</option>',
					'<option value="1011">高一</option><option value="1012">高二</option><option value="1013">高三</option>'
				];
				var num = $('#courseType option:selected') .val();
				if(num === '1' || num === '2'){
					$('#grade').append(arr[0]);
				}else if(num === '3' || num ==='4'){
					$('#grade').append(arr[1]);
				}else if(num === '5'|| num ==='6'){
					$('#grade').append(arr[2]);
				}
				$('#grade').val(gradeID);
				var text = $('#grade option:selected').text();
				$('#grade').prev().text(text);
				if(Bok){
					var text = $('#grade option:selected').text();
					$('#grade').prev().text(text);
				}

			}
			filterGradeDefault(0);
			$('#courseType').change(function(){
				filterGradeDefault(1);
			});
		}
		filterGrade();

		//课程介绍富文本
		var edit = UM.getEditor('myEditor');
		var resId = "";
		var grade = "";
		var gradeId = "";
		var subject = "";
		var subjectId = "";
		var ptPrice = "";
		var courseTitle = "";
		var courseWareResId = "0";
		var courseResId = "0";
		var seat = 0;

		//禁用时间选项
		//scheduleTime = 120;
		$.each($("input[name=time]"), function(index, value){
			if (type != "pk"){
				var myTime = parseInt(ptcourse.courseTime)/60;
				if (scheduleTime + myTime < parseInt($(value).val())/60){
					$(value).attr("checked", "");
					$(value).attr("disabled",'disabled');
				}
			}else{
				if (scheduleTime < parseInt($(value).val())/60){
					//$(value).attr("checked", "");
					$(value).attr("disabled",'disabled');
				}
			}

		});

		if (ptcourse != null){
			$("#theme").val(ptcourse.theme);
			if (type != "copy"){
				$("#date").val(new Date(parseFloat(ptcourse.classStartTime)).format("yyyy-MM-dd hh:mm"));
			}
			edit.ready(function(){
				edit.setContent(ptcourse.courseDespText);
			});
			$(".push").find("em").html($("#pushType option[value='" + ptcourse.pushType + "']").text());
			$(".push").find("option[value='" + ptcourse.pushType + "']").attr("selected", true);
			var kps = ptcourse.knowledgePoints;
			var akps = kps.split(",");
			//var topics = ptcourse.topics;
			//var atop = topics.split(",");
			var customText = ptcourse.customText;
			var aCustomText = customText.split(",");
			var courseTime = (ptcourse.courseTime);
			var ptSeat = ptcourse.ptSeat;
			seat = ptcourse.ptSeat;
			$("#ptSeatId").val(ptSeat);
			$.each($("input[name=time]"), function(index, value){
				if (parseInt($(value).val()) % courseTime  == 0){
					$(value).attr("checked",'checked');
					return false;
				}
			});
			$("#ptTime").text(courseTime/60 * ptSeat);
			var hideVal = "";
			var hideValstr = '';
			$.each(akps, function(index, value){
				if (value != ""){
					var json = binarySearch(zNodes, parseInt(value));
					if(!json)return ;
					$(".addKnow").append("<span class=\"problem\"><em>"+json.name+"</em><i class=\"deleteK delete\" data="+value+"></i></span>");
					hideVal += value + ",";
					hideValstr =  hideVal.substring(0,hideVal.length-1);

				}
			});
			$(".hidVal").val(hideValstr);

			$.each(aCustomText, function(index, value){
				if (value != "") {
					$(".customText").append("<span class=\"problem\"><em>"+value+"</em></i><i class=\"delete\"></i></span>");
				}
			});
			resId = ptcourse.courseResId;
			grade = common.df.grade(ptcourse.gradeId);
			gradeId = ptcourse.gradeId;
			subject = common.df.dataCode(ptcourse.subjectId);
			subjectId = ptcourse.subjectId;
			ptPrice = "￥" +parseInt(ptcourse.ptPrice)/100 + "/小时";
			courseTitle = $("#theme").val();
			courseWareResId = ptcourse.courseWareResId;
			courseResId =ptcourse.courseResId;
			if(courseResId!=""&&courseResId!=0){
				$("#courseImg_2").attr("src", "/file/loadImage/" + courseResId + "/240/135.r");
				$("#advertiseResId").val(courseResId);
			}
			if (topicList != null){
				$.each(topicList, function(index, topic){
					//if (topic.topicId == "" && topic.content == "") return true;
					var  topicContent = '<div class="outputResult pr" data="'+topic.topicId+'"><i class="delTopic pa hide"></i>';
					if (topic.topicId != "zero") {
						if (topic.source == "0"){
							topicContent += '<i class="delTopic pa hide"></i><div class="deleteKnow topics"><em class="originalTitle clearfix">讲解题目：</em>';
							topicContent += '<span class="problem or clearfix"><em>' + topic.topicId + '</em><input readonly="" class="preview preview_btn fr" data="' + topic.topicId + '"></span></div>';
						}else{
							topicContent += '<div class="deleteKnow topics origPicture clearfix" style="padding:0"><em class="originalTitle fl">讲解题目：</em>';
							topicContent += '<div class="proPicture pr fl problemContent">'+topic.content+'<span class="delPicture pa">删除</span></div><div class="fl w600"></div></div>';
						}
					}
					topicContent += '<div class="deleteKnow topics hide clearfix" style=""><em class="originalTitle fl">相似题目：</em><div class="fl w600">';
					$.each(topic.nearIds, function(index, nearId){
						topicContent +='<span class="problem same" id="'+nearId+'"><em>'+nearId+'</em><input readonly="" class="preview preview_btn" data="'+nearId+'"><i class="delete sameDel"></i></span>';
					});
					topicContent +='<button class="addPoint addSameBtn"><i class="add_knowledge"></i>添加相似题</button></div></div></div>';
					$(".topicJson").prepend(topicContent);

				});
			}
		}else{
			$("#theme").val(order.coursesName);
			edit.ready(function(){
				edit.setContent(course.des);
			});
			grade = order.grade;
			gradeId = order.gradeId;
			subjectId = order.subjectId;
			subject = order.subject;
			ptPrice = "￥" +parseInt(order.orderPtPrice)/100 + "/小时";
			courseTitle = $("#theme").val();
			if(course.advertiseResId!=""&&course.advertiseResId!=0){
				$("#courseImg_2").attr("src", "/file/loadImage/" + course.advertiseResId + "/240/135.r");
				$("#advertiseResId").val(course.advertiseResId);
			}
		}

		//点击删除
		$('.deleteKnow').on('click','.delete',function(){

			if($(this).attr('data')){
				var num = $(this).attr('data');
				var oHidVal =  $('.hidVal').val();
				var nHidVal =  oHidVal.replace(num,'');
				$('.hidVal').val(nHidVal);
			}else{

			}
			var $this=$(this);
			var orId=$(this).siblings('input').attr('data');
			var sameId=$(this).parent().attr('id');
			var topicTd=$(this).parents('.outputResult').attr('data');
			var orKnow=$(this).parents('.tabItem').children().hasClass('knowNum');//knowNum or unKnow
			var orSame=$(this).hasClass('sameDel');//sameDel or orDel
			var questionId=$(this).parents('.outputResult').find('.or').children('input').attr('data');
			var similaQuestionId=$this.parent('.problem').attr('id');

			//知道题号 原题
			if(orKnow){
				//删除到最后一选题时，盒子消失
				$this.parent().siblings('.search_same').hide();
				if($this.parents('.outputResult').find('span').length==1){
					$this.parents('.outputResultMain').siblings('h4').addClass('hide').siblings('.recommended').children().remove();
					$this.parents('.outputResult').remove();
				}
				if(orSame){
					$('.recommended').children('div[data='+topicTd+']').children('div[data='+sameId+']').children('span').addClass('selecDel').removeClass('ac').children('em').text('选用');
					$('.recommended').children('div[data='+topicTd+']').children('div[data='+sameId+']').children('span').hover(function(){
						$(this).children('em').show().siblings('b').addClass('hide')
					})

				}
			}else{

				if(orSame){
					$('.recommended').children('div[data=self]').children('div[data='+sameId+']').children('.original').addClass('originalDel');
					$('.recommended').children('div[data=self]').children('div[data='+sameId+']').children('.similarDel').removeClass('ac').hover(function(){
						$(this).children('em').removeClass('hide').siblings('b').addClass('hide');
					})
				}else{
					//不知道题号 原题
					if($this.parents('.outputResult').parent().hasClass('formR')){
						$this.parent().siblings('em').remove()
					}
					$('.toRecord').show().siblings('em').show();
					$('.recommended').children('div[data=self]').children('div[data='+orId+']').children('.originalDel').removeClass('ac').siblings('.similar').addClass('similarDel');
				}

			}
			//已经添加到formR
			if($this.parents('.outputResult').parent().hasClass('formR')){
				if($this.parents('.outputResult').find('span.problem').length<=1 && $this.parents('.outputResult').find('span.delPicture').length==0){
					$this.parents('.outputResult').remove();
				}
			}
			$(this).parent().remove();

			$.ajax({
				url: "/courses/unExplainSimilarQuestions.do",
				type: "post",
				dataType: "json",
				data: {
					classId: classId,
					questionId:questionId,
					similaQuestionId:similaQuestionId
				},
				success: function (response) {
					if ("000" == response.resCode){

					}
					if ("200" == response.resCode) {
						window.location.href = "/login.htm";
					}
				}
			});

		});

		$("i.add_knowledge").siblings('input').focus(function(){
			$("span.errorPrompt").hide();
		});

		$("i.add_knowledge").siblings('input').keydown(function(){
			$("p.red").addClass('hide');
		})

		//查询相似题按钮调用事件
		$(".formR").on('click','.search_same', function(){
			var $this=$(this);
			var topicId = $(this).siblings("span.or").children('em').text();
			var url = "/topic/find.do";
			var data = "topicId="+topicId;
			var showResultMain=$(this).parents('.showResultMain');
			$.post(url, data, function(resp){
				if (resp.resCode == "000"){
					//添加推荐相似题
					var addRecommended="<div data='"+topicId+"'>";
					$.each(resp.data.near.data.qs, function(index, value){
						//$.each(qs, function(index, value){
						addRecommended +='<div class="detailTitle pr" id="resultNum'+resultNum+'" data="'+value.questionId+'">'+
							'<span class="selec selecDel pa"><em>选用</em><b class="hide">取消</b></span>'+value.content +'</div>';
					});
					addRecommended += "</div>";
					showResultMain.removeClass('hide').children('h4').removeClass('hide');
					//添加一次新的讲解题目，推荐一次新的相似题
					showResultMain.children('.recommended').children().hide();
					showResultMain.children('.recommended').append(addRecommended).children('#resultNum'+resultNum).show();
					//按钮消失 其他的按钮显示
					$this.addClass('none').parents('.outputResult').siblings().find('.search_same').removeClass('none');

				}else if (resp.resCode == "200"){
					location.href="/login.htm";
				}else{
					showResultMain.siblings('p').removeClass('hide').html('未查找到相似题');
				}
			}, "json");



		});

		//点击添加题目
		var resultNum=0;
		$('.knowledge_point .add_knowledge').click(function(){
			resultNum++;
			var $this=$(this);
			var topicId = $(this).siblings('input').val();
			if (topicId == "") return false;
			var url = "/topic/find.do";
			var data = "topicId="+topicId;
			var showResultMain=$(this).parent().siblings('.showResultMain');
			$(this).siblings('input').val("");
			var dup = false;
			$.each($("span.or"), function(index, value){
				if (topicId == $(value).children('em').text()){
					dup = true;
					$("span.errorPrompt").show();
					return false;
				}else{
					$("span.errorPrompt").hide();
				}
			});
			if (dup) return false;
			//添加讲解题目
			var addSubject=$(
				'<div class="outputResult pr" data="'+topicId+'">'+
				'<i class="delTopic pa hide"></i>'+
				'<div class="deleteKnow topics clearfix">'+
				'<em class="originalTitle fl">讲解题目：</em>'+
				'<div class="fl">' +
				'<span class="problem or"><em class="problemContent">'+topicId+'</em><input readonly="" class="preview preview_btn" data='+topicId+'><i class="delete"></i></span>' +
				'<button type="button" class="btn w110 c_bg_color1 search_same none">查找相似题</button></div>'+
				'</div>'+
				'<div class="deleteKnow topics hide clearfix" style="display: none">'+
				'<em class="originalTitle fl">相似题目：</em><div class="fl w600"></div>'+
				'</div>'+
				'</div>'
			);


			//添加五道题目
			if($('.knowNum .outputResult').length<5){
				$.post(url, data, function(resp){
					if (resp.resCode == "000"){
						if (resp.data.near != undefined && resp.data.near.resCode == "000"){
							showResultMain.removeClass('hide').children('h4').removeClass('hide');
							showResultMain.children('.outputResultMain').append(addSubject);
							//添加推荐相似题
							var addRecommended="<div data='"+topicId+"'>";
							$.each(resp.data.near.data.qs, function(index, value){
								//$.each(qs, function(index, value){
								addRecommended +='<div class="detailTitle pr" id="resultNum'+resultNum+'" data="'+value.questionId+'">'+
									'<span class="selec selecDel pa"><em>选用</em><b class="hide">取消</b></span>'+value.content +'</div>';
							});
							addRecommended += "</div>";
							showResultMain.removeClass('hide').children('h4').removeClass('hide');
							//添加一次新的讲解题目，推荐一次新的相似题
							showResultMain.children('.recommended').children().hide();
							showResultMain.children('.recommended').append(addRecommended).children('#resultNum'+resultNum).show();
							showResultMain.siblings('p').addClass('hide').html('');

							//添加 相似题目按钮 最后的不添加
							if(showResultMain.children('.outputResultMain').children().length>1){
								showResultMain.children('.outputResultMain').children().find('.search_same').removeClass('none').last().addClass('none');
							}
						}else{
							showResultMain.siblings('p').removeClass('hide').html('未查找到该题');
						}
					}else if (resp.resCode == "200"){
						location.href="/login.htm";
					}else{
						showResultMain.siblings('p').removeClass('hide').html('未查找到该题');
					}
				}, "json");
			}else{
				$this.siblings('input').css('background','#dcdcdc').attr('disabled','disabled')
			}
		});

		//点击添加自定义标签

		$('.knowledge_point .add_text').click(function(){
			var txt=$(this).siblings('input').val();
			if (txt == "")return;
			var addKnow='<span class="problem"><em>'+txt+'</em><i class="delete"></i></span>';
			var append = $(this).parent().siblings().append(addKnow);
			$(this).siblings('input').val('');
		});

		//预览
		/*$('.outputResult .preview_btn').mouseenter(function(){
			var $this=$(this);
			var url = "/courses/" + $(this).attr("data") + "/preview.do";
			$.ajax({
				url: url,
				type: "POST",
				dataType: "json",
				success: function(resp){
					if (resp.resCode == "000"){
						$this.parent().addClass('preview_problem');
						$this.parent().append('<div class="content"><i class="sjpic"></i>'+resp.data.content[0].content+'</div>')
						//搜题样式
						$('.content').find('.A_cont').before($('<div class="subResolveBtn subResolveBtned">收起答案解析<i></i></div>'))

					}else{
						dialog._timer("未查到该题的内容", 2, 2, null);
					}
				}
			});

		}).mouseleave(function(){
			var $this=$(this);
			$this.parent().removeClass('preview_problem');
			$this.siblings('.content').remove()

		})*/

		// /*预览*/
		$('.deleteKnow .preview').live('click',function(){
			$(".content").empty();
			var url = "/courses/" + $(this).attr("data") + "/preview.do";
			$.ajax({
				url: url,
				type: "POST",
				dataType: "json",
				beforeSend:function(){
					//alert(12);
					$('.preview_btn').attr('disabled','true');
				},
				success: function(resp){
					if (resp.resCode == "000"){
						dialog._topic_preview();
						$(".content").append(resp.data.content);
						$('.preview_btn').removeAttr('disabled');
						$(".content").find('.pd25').last().css('border','none');
						$('.content').find('.A_cont').before($('<div class="subResolveBtn subResolveBtned">收起答案解析<i></i></div>'))
					}else{
						dialog._timer("未查到该题的内容", 2, 2, null);
						$('.preview_btn').removeAttr('disabled');
					}
				}

			});
		});
		//节次设置预览
		$('.determineJs').click(function(){
			var courseTheme = $("#theme").val();
			var dateTime = $("#date").val();
			var time = $("#time").val();
			var content = edit.getContent();
			var ptSeat = $("#ptSeatId").val() == "" ? "" : $("#ptSeatId").val();
			if ($.trim(courseTheme) == "" || $.trim(dateTime) == "" || $.trim(content) == "") return false;
			if ($.trim(courseTheme).length >100) return false;
			if ($.trim(content).length >60000) return false;
			if ($("#ptSeatId").val() == "") return false;
			if (seat > parseInt($("#ptSeatId").val())) return false;
			//$("#determineBox").dialog("open");
			dialog._ptCoursePreview();
			/*          if ($("#preIDs").data("flag") == 1) return false;
			 $("#preIDs").data("flag", 1);*/
			$("#grade").text(grade);
			$("#subject").text(subject);
			$("#classStartTime").text($("#date").val());
			$("#ptPrice").text(ptPrice);
			$("#courseTitle").text($("#theme").val());
			if (courseWareResId == "0"){
				$("#ware").hide();
				$(".blue, .loadFile").hide();
				$("#wareText").text("暂无课件");
			}else{
				var type = ptcourse.courseWareFileType;
				$("#wareText").text(ptcourse.courseWare);
				$("#ware").attr('src', JS_BASEURL + "/images/" + common.df.courseImageType(type) + ".png");
			}

			if (courseResId=="0"){
				$("#fileImg").attr('src', JS_BASEURL + "/images/class.png");
			}else{
				$("#fileImg").attr('src', "/file/loadImage/"+courseResId+".r");
			}

			if ($(".createKnow em").length == 0){
				$("#preIDs").append("<span>暂无知识点</span>");
			}else{
				$.each($(".createKnow em"), function(index, value){
					$("#preIDs").append("<span>"+$(value).text()+"</span>&nbsp;&nbsp;&nbsp;");
				});
			}

			if ($(".topics em").length == 0){
				$("#topics").append("<strong class='font18' style='padding-left:20px;'>暂无题目</strong>");
			}else{

				$.each($(".topicJson span.or"), function(index, value){
					var url = "/courses/" + $(value).children("em").text() + "/preview.do";

					$.post(url, function(resp){
						if (resp.resCode == "000"){
							$("#topics").append(resp.data.content[0].content);
						}else{
							$("#topics").append("<h3>无该题目的内容-->题"+$(value).text()+"</h3>");
						}
					}, 'json');
				});
			}
			$("#editor").append($(".courseIn").html());
			$("#planClass tr").append("<td class='tc'><div class=\"tl\" style='display: inline-block;'><strong >"+$("#theme").val()+"</strong></div></td>");
			$("#planClass tr").append("<td><div class=\"tc\"><strong >"+$("#date").val()+"</strong></div></td>");
			$("#planClass tr").append("<td></td>");
			if ($(".createKnow em").length == 0){
				$("#planClass tr td:last").append("<div class=\"tc\"><strong>暂无知识点</strong></div>");
				return false;
			}
			$.each($(".createKnow em"), function(index, value){
				$("#planClass tr td:last").append("<div class=\"tc\"><strong>"+$(value).text()+"</strong></div>");
			});
			return false;
		});

		//清除选项
		$('.cancelBtn').click(function() {
			$(".previewBox,.determineBox").dialog("close");
		});

		//时间点击
		//$("input.datetimepicker").live("click", function(){
		var times = ['00:00', '00:30', '01:00',  '01:30','02:00', '02:30', '03:00', '03:30', '04:00', '04:30','05:00','05:30','06:00', '06:30',
			'07:00','07:30', '08:00','08:30', '09:00','09:30', '10:00','10:30','11:00','11:30','12:00', '12:30','13:00', '13:30','14:00', '14:30',
			'15:00', '15:30','16:00', '16:30','17:00', '17:30','18:00', '18:30','19:00', '19:30','20:00', '20:30','21:00', '21:30','22:00', '22:30',
			'23:00', '23:30'];
		var index = new Date().getHours();
		$("input.datetimepicker").datetimepicker({
			lang:'ch',
			format:'Y-m-d H:i',
			minDate:'0',
			allowTimes:times
		});
		//});

		$('.determine').click(function(){
			var txt=$('#ptSeatId').val();
			//console.log(txt);
			if(txt==''){
				$('#ptSeatId').siblings('.insufficient').show();
			}else if (parseInt(txt) < seat){
				$('#ptSeatId').siblings('.insufficient').show().children('.errorTex').text("旁听座位数不能低于" + seat + "个");
			}
		});

		$(".c_bg_color5").on("click", function(){
			var courseType=$("#courseType").val();
			var subject=	$("#subject").val();
			var grade=	$("#grade").val();
			var courseTheme = $("#theme").val();
			var dateTime = $("#date").val();
			var time = $("input[name=time]:checked").val();
			var content = edit.getContent();
			var pushType = $("#pushType").val();
			var path = "/courses/pk.do";
			var kps = "";
			var topics = "";
			var topicJson = {};
			var topicArrs = [];
			var customText = "";
			var ptSeat = $("#ptSeatId").val() == "" ? "" : $("#ptSeatId").val();
			if ($.trim(courseTheme) == "" || $.trim(dateTime) == "" || $.trim(content) == "") return false;
			if ($.trim(courseTheme).length >100) return false;
			if (ptSeat == "") return false;
			if (seat > parseInt($("#ptSeatId").val())) return false;
			$.each($(".addKnow i.deleteK"), function(index, value){
				kps += $(value).attr("data") + ",";
			});
			if(kps.length > 0){
				kps = "," + kps;
			}

			$.each($(".customText span em"), function(index, value){
				customText += $(value).text() + ",";
			});

			//原题相似题
			$.each($(".topicJson").children('.outputResult'), function(index, value){
				var or = $(value).find("span.or").children("em").text();
				if (or!=''&&reg.test(or)){
					topics += or + ",";
				}
				var content = "";
				content = $(value).find(".proPicture").html();
				var arrs = new Array();
				$.each($(value).find("span.same"), function(ind, val){
					var same = $(val).children("em").text();
					arrs.push(same);
				});
				var source = "0";
				if (content != undefined) source = "1";
				var resIds = $(value).find("span.or").children('em').attr('data-resId') == undefined ? "0" : $(value).find("span.or").children('em').attr('data-resId');
				var ocr = $(value).find("span.or").children('em').attr('data-ocrText') == undefined ? "" : $(value).find("span.or").children('em').attr('data-ocrText');
				var json = {
					topicId:or,
					content:content,
					nearIds:arrs,
					resId:resIds,
					ocrText:ocr,
					subject:subjectId,
					grade:gradeId,
					source:source
				};
				topicArrs.push(json);
			});
			topicJson.list = topicArrs;
			if (topics.length > 0){
				topics = "," + topics;
			}
			if (type == "modify"){
				path = "/courses/modify.do";
				orderId=ptcourse.orderId;
			}else if (type == "copy"){
				orderId=ptcourse.orderId;
			}
			//return;
			$.post(path, {
					"classId"    :classId,
					"orderId"    :orderId,
					"dateTime"   :dateTime,
					"duration"   :time,
					"courseTheme":courseTheme,
					"courseText" :content,
					"pushType"   :pushType,
					"kpIds"      :kps,
					"ptSeat"     :ptSeat,
					"topics"     :topics,
					"topicJson"  :JSON.stringify(topicJson),
					"customText": encodeURIComponent(customText),
					"courseType": courseType,
					"gradeId": grade,
					"subjectId": subject,
				    "advertiseResId":$("#advertiseResId").val(),
					"courseMode":courseMode
				}, function(resp){
					if (resp.resCode == "000"){
						dialog._timer("保存成功", 1, 0.2, function(){
							location.href = "/courses/ctManage.htm";
						});
					}else{
						dialog._timer(resp.resMsg, 2, 2, null);
					}
				},
				"json");
		});
		$('.treeParent .addPoint').on('click',function(){
			var result = [];
			var subject =$('#subject').val() ;
			var grade = treeGrade($('#grade').val());
			var dataJson = {
				"subject":subject,
				"grade":grade
			};
			var zNodes = result;
			getTree(getTreeId(dataJson,getTreeIdArrs),result);
			if($('.createKnow').children().length == 0 ){
				$('.hidVal').val('');
			}
			pointTree(zNodes,$(this));
		});
		$(document).on('click','.labelListClose',function(){
			$(this).parents('li').remove();
			var liVal = $(this).parents('li').attr('val');
			var myTree = $.fn.zTree.getZTreeObj("treeList");
			var node = myTree.getNodeByParam("id", liVal, null);
			myTree.checkNode(node,false,true);
		});


		//校验节次名称
		$('.txt').keyup(function(){
			var $txt=$('.txt');
			var $this=$(this).val();
			if($this.length>100){
				$txt.siblings('.surplus').removeClass('hide').addClass('show');
			}else{
				//$txt.siblings('.surplus').addClass('hide');
			}
		});
		$('.determine').click(function(){
			var txt=$('.txt').val();
			if(txt==''){
				$('.txt').siblings('.insufficient').removeClass('hide').addClass('show');
			}
			else{
				if(txt.length>100){
					$('.txt').siblings('.surplus').removeClass('hide').addClass('show');
				}else{
					$('.txt').siblings('.surplus').addClass('hide');
					$('.txt').siblings('.insufficient').addClass('hide')
				}
			}
		});


		//上课时间
		$('.determine').click(function(){
			var time=$('.time').val();
			if(time==''){
				$('.time').siblings('.insufficient').removeClass('hide').addClass('show');
			}
			else{
				$('.time').siblings('.insufficient').addClass('hide');
			}
			return false;
		});

		//副文本校验
		$('.determine_1').click(function(){
			var CourseIn= edit.getContent();
			if( CourseIn== ''){
				dialog._timer('请将信息填写完整','2','2','');
			}else if (CourseIn.length > 60000){
				dialog._timer('您设置的内容太大了吧','2','2','');
			};
		});

		$(".cancle").click(function(){
			location.href="/courses/ctManage.htm";
		});
		$('#theme').blur(function(){
			if($(this).val()) $(this).siblings('.insufficient ').addClass('hide');
		});

		$('#date').blur(function(){
			if($(this).val()) $(this).siblings('.insufficient ').addClass('hide');
		});

		//tab切换
		$('.tab .tabList li').click(function() {
			var index = $(this).index();
			$(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
			$('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
			$('.tabCont .tabItem:eq(' + index + ')').find('h4').addClass('hide');

		});

		//鼠标经过原题出现删除图标
		$('.outputResult').mouseenter(function(){
			$(this).children('.delTopic').removeClass('hide');
		}).mouseleave(function(){
			$(this).children('.delTopic').addClass('hide');
		});
		//点击删除图标全部删除
		$('.formR').on('click','.delTopic',function(){
			var $this=$(this);
			var questionId=$this.parent('.outputResult').attr('data');
			dialog._problem_remove(function(){
				$.ajax({
					url: "/courses/unExplainQuestions.do",
					type: "post",
					dataType: "json",
					data: {
						classId: classId,
						questionId:questionId
					},
					success: function (response) {
						if ("000" == response.resCode){

						}
						if ("200" == response.resCode) {
							window.location.href = "/login.htm";
						}
					}
				});
				$this.parent('.outputResult').remove();


			}, null);


		});

		//选用
		$('.recommended').on('click','.detailTitle .selec',function(){
			var $this=$(this);
			$(this).toggleClass('ac');
			//如果选中，hover事后为取消
			var resultId=$(this).parent().parent().attr('data');
			var sameData=$(this).parent().attr('data');
			//添加到对应相似题目标签后
			var outputResultMain=$(this).parents('.recommended').siblings('.outputResultMain').children('div[data='+resultId+']');
			var sameResult=outputResultMain.children().last();
			var addOriginalTitle='<span class="problem same" id='+sameData+'><em class="problemContent">'+sameData+'</em><input readonly="" class="preview preview_btn" data='+sameData+'><i class="delete sameDel"></i></span>';
			if($this.hasClass('ac')){
				//已选用,点击为取消
				$this.removeClass('selecDel').children('em').text('已选用');
				$this.hover(function(){
					$this.children('em').hide().siblings('b').removeClass('hide');
				},function(){
					$this.children('em').show().siblings('b').addClass('hide')
				})
				sameResult.show().children('div').append(addOriginalTitle).siblings('em').show();

			}else{
				//取消选用
				$this.addClass('selecDel').children('em').text('选用');
				$this.hover(function(){
					$this.children('em').show().siblings('b').addClass('hide')
				})

				$('#'+sameData).remove();
				if(sameResult.children().children('span.problem').length==0){
					sameResult.children('em').hide();
				}
				if(outputResultMain.find('span.problem').length==0){
					outputResultMain.parent().siblings('h4').hide().siblings('.recommended').children().remove();
					outputResultMain.remove();
				}
			}
		});

		//原/相似题目删除
		$('.formR').on('click','.deleteKnow .delete',function(){
			var $this=$(this);
			var orId=$(this).siblings('input').attr('data');
			var sameId=$(this).parent().attr('id');
			var topicTd=$(this).parents('.outputResult').attr('data');
			var orKnow=$(this).parents('.tabItem').children().hasClass('knowNum');//knowNum or unKnow
			var orSame=$(this).hasClass('sameDel');//sameDel or orDel

			//判断是否显示 讲解题目/相似题目 标头
			if($this.parent().siblings('span.problem').length==0){
				$this.parent().parent().siblings('em').hide();
			}

			//知道题号 原题
			if(orKnow){
				//删除到最后一选题时，盒子消失
				$this.parent().siblings('.search_same').hide();
				if($this.parents('.outputResult').find('span').length==1){
					$this.parents('.outputResultMain').siblings('h4').addClass('hide').siblings('.recommended').children().remove();
					$this.parents('.outputResult').remove();
				}
				if(orSame){
					$('.recommended').children('div[data='+topicTd+']').children('div[data='+sameId+']').children('span').addClass('selecDel').removeClass('ac').children('em').text('选用');
					$('.recommended').children('div[data='+topicTd+']').children('div[data='+sameId+']').children('span').hover(function(){
						$(this).children('em').show().siblings('b').addClass('hide')
					})
				}
			}else{
				if(orSame){
					$('.recommended').children('div[data=self]').children('div[data='+sameId+']').children('.original').addClass('originalDel');
					$('.recommended').children('div[data=self]').children('div[data='+sameId+']').children('.similarDel').removeClass('ac').hover(function(){
						$(this).children('em').removeClass('hide').siblings('b').addClass('hide');
					})
				}else{
					//不知道题号 原题
					if($this.parents('.outputResult').parent().hasClass('formR')){
						$this.parent().siblings('em').remove()
					}
					$('.toRecord').show().siblings('em').show();
					$('.recommended').children('div[data=self]').children('div[data='+orId+']').children('.originalDel').removeClass('ac').siblings('.similar').addClass('similarDel');
				}
			}
			//已经添加到formR
			if($this.parents('.outputResult').parent().hasClass('formR')){
				if($this.parents('.outputResult').find('span.problem').length<=1 && $this.parents('.outputResult').find('span.delPicture').length==0){
					$this.parents('.outputResult').remove();
				}
			}
			$(this).parent().remove();
		});

		//不知道题号 找原题、查看原图按钮点击事件
		$('.unKnowsearch button').click(function(){
			var $this=$(this);
			var showResultMain=$(this).parents('.searchProblem').siblings('.showResultMain');
			var content = $(this).siblings("textarea").val();
			$('p.red').addClass('hide').hide().html('');
			if (content == "" || content == undefined) return;
			$.post("/topic/search.do", "subjectId="+subjectId+"&content="+encodeURIComponent(content), function(resp){
				if (resp.resCode == "000"){
					//console.log(resp);
					var data = resp.data.topics;
					if (data.resCode == "000"){
						var qs = data.data.qs;
						/* qs = [
						 {content: "<p>清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年？</p>",kid: "2001787,2001872",questionId: "20161899",subjectId: "10017"},
						 {content: "<h1>清朝清朝有多少年清朝有多少年清朝有多少年有多少年？</h1>",kid: "2001787,2001872",questionId: "201000615",subjectId: "10017"},
						 {content: "清朝清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年有多少年？",kid: "2001787,2001872",questionId: "2016322515",subjectId: "10017"},
						 {content: "清朝有清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年多少年？",kid: "2001787,2001872",questionId: "2016189965",subjectId: "10017"},
						 {content: "清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年？",kid: "2001787,2001872",questionId: "201645615",subjectId: "10017"},
						 {content: "清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年？",kid: "2001787,2001872",questionId: "201645615",subjectId: "10017"},
						 {content: "清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年？",kid: "2001787,2001872",questionId: "201645615",subjectId: "10017"},
						 {content: "清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年？",kid: "2001787,2001872",questionId: "201645615",subjectId: "10017"},
						 {content: "清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年？",kid: "2001787,2001872",questionId: "201645615",subjectId: "10017"},
						 {content: "清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年清朝有多少年？",kid: "2001787,2001872",questionId: "201645615",subjectId: "10017"}
						 ];*/
						var addRecommended="<div data='self'>";
						$.each(qs, function(index, value){
							addRecommended +='<div class="detailTitle pr" id="resultNum'+resultNum+'" data="'+value.questionId+'">'+
								'<span class="original pa originalDel">原题</span>'+
								'<span class="similar pa similarDel"><em>相似题</em><b class="hide">取消</b></span>'+value.content +'</div>';
						});
						addRecommended += "</div>";
						showResultMain.removeClass('hide').children('.recommended').removeClass('hide').html(addRecommended).siblings('h4').removeClass('hide');
						showResultMain.children('.recommended').next().children().removeClass('hide');
						$this.parents('.searchProblem').siblings('p').hide();

					}else{
						$this.parents('.searchProblem').siblings('p').show().html(data.resMsg);
						showResultMain.children('.recommended').addClass('hide').html('').siblings('h4').addClass('hide');
					}
				}else if (resp.resCode == "200"){
					location.href="/login.htm";
				}else{
					$this.parents('.searchProblem').siblings('p').show().html('未查找到对应内容的题目');
					showResultMain.children('.recommended').addClass('hide').html('').siblings('h4').addClass('hide');
				}
			}, "json");

			var addOriginal=$(
				'<div class="hide outputResult search pr">'+
				'<i class="delTopic pa hide"></i>'+
				'<div class="deleteKnow topics origPicture clearfix" style="padding:0">'+
				'<em class="originalTitle fl">讲解题目：</em>'+
				'<button type="button" class="w100 c_bg_color2 toRecord">我要录题</button><div class="fl w600"></div>'+
				'</div>'+
				'<div class="deleteKnow topics hide clearfix" style="display:none">'+
				'<em class="originalTitle fl">相似题目：</em><div class="fl w600"></div>'+
				'</div>'+
				'</div>');
			showResultMain.removeClass('hide').children('.outputResultMain').html(addOriginal).children().removeClass('hide');
		});

		//扫码上传图片
		var qId = 0;
		$('.scanCode .scanUpload').click(function(){
			$(this).parents('.searchProblem').siblings('p.red').addClass('hide');
			$this = $(this);
			$.post("/topic/createId.do", function(resp){
				if (resp.resCode == "000"){
					qId = resp.data.qId;
					if (qId > 0){
						$this.hide().siblings('dl').show();
						$("#qrcode").empty();
						var txt = "http://kehai.com/site/app/dow.r?appId=school_release&t=1&qId="+qId;
						/*判断浏览器类型 IE8*/
						if(navigator.userAgent.indexOf("MSIE 8.0")>0) {
							$("#qrcode").qrcode({render: "table",width:64, height: 64, text:txt});
						}else{
							$("#qrcode").qrcode({width:64, height: 64, text:txt});
						}
					}
				}else if (resp.resCode == "200"){
					location.href="/login.htm";
				}
			}, "json");

			$('.scanCode dt').mouseenter(function(){
				$(this).siblings('.qrcodeWrap').show().html('<div id="qrcode"></div>');
				var txt = "http://kehai.com/site/app/dow.r?appId=school_release&t=1&qId="+qId;
				/*判断浏览器类型 IE8*/
				if(navigator.userAgent.indexOf("MSIE 8.0")>0) {
					$("#qrcode").qrcode({render: "table",width:147, height: 147, text:txt});
				}else{
					$("#qrcode").qrcode({width:147, height: 147, text:txt});
				}
			}).mouseleave(function(){
				$(this).siblings('.qrcodeWrap').hide().html('');
			})
		});
		//点击查看原图
		$('.scanCode dd button').click(function(){
			$this = $(this);
			$('p.red').hide().html('');
			var showResultMain=$(this).parents('.searchProblem').siblings('.showResultMain');
			//qId = "123584692158714365";
			if (qId != "0"){
				$.post("/topic/image/see.do", "qId="+qId, function(resp){
					if (resp.resCode == "000"){
						//console.log(resp.data);
						var resId = resp.data.resId;
						if (resp.data.resId != "0" && resp.data.resId != undefined){
							$this.parents('dl').hide().siblings('.scanUpload').show();
							$('.unknowNum .showResultMain').removeClass('hide').children('.ocrImage').html(
								'<div class="viewPicture"><p>题目图片</p>'+
								'<div class="proPicture pr proPictures"><img src="/file/loadImage/'+resp.data.resId+'.r" alt=""><span class="delPicture pa">删除</span></div>'+
								'</div>'
							);
							var addOriginal=$(
								'<div class="outputResult search pr">'+
								'<i class="delTopic pa hide"></i>'+
								'<div class="deleteKnow topics origPicture clearfix" style="padding:0">'+
								'<em class="originalTitle fl">讲解题目：</em>'+
								'<button type="button" class="w100 c_bg_color2 toRecord">我要录题</button><div class="fl w600"></div>'+
								'</div>'+
								'<div class="deleteKnow topics hide clearfix" style="display:none">'+
								'<em class="originalTitle fl">相似题目：</em><div class="fl w600"></div>'+
								'</div>'+
								'</div>');

							showResultMain.children('.outputResultMain').html(addOriginal);
							$(".recommended").empty();
							showResultMain.children('.load_wrap').removeClass('hide');
							$.post("/topic/image/ocr.do", "qId="+qId, function(resp){
								if (resp.resCode == "000"){
									//console.log(resp.data);
									showResultMain.children('.load_wrap').addClass('hide');
									var ocrText = resp.data.ocrText;
									if (resp.data.topics != undefined){
										if (resp.data.topics.resCode == "000"){
											var qs = resp.data.topics.data.qs;
											var addRecommended="<div data='self'>";
											$.each(qs, function(index, value){
												//console.log(value.content);
												addRecommended +='<div class="detailTitle pr" id="resultNum'+resultNum+'" data-resId="'+resId+'" data-ocr="'+ocrText+'" data="'+value.questionId+'">'+
													'<span class="original pa originalDel">原题</span>'+
													'<span class="similar pa similarDel"><em>相似题</em><b class="hide">取消</b></span>'+value.content +'</div>';
											});
											addRecommended += "</div>";
											//console.log(showResultMain);
											showResultMain.removeClass('hide').children('.recommended').removeClass('hide').append(addRecommended);
											showResultMain.children('.recommended').next().children().removeClass('hide');
											showResultMain.children('h4').removeClass('hide');
										}else{
											//dialog._wait(resp.data.topic.resMsg, 2, null);
											$this.parents('.searchProblem').siblings('.showResultMain').children('p').removeClass('hide').html('未查找到图片对应内容的题目');
											$(".recommended").empty();
										}
									}else{
										$this.parents('.searchProblem').siblings('.showResultMain').children('p').removeClass('hide').html('未查找到图片对应内容的题目');
									}
								}else{
									showResultMain.children('.load_wrap').addClass('hide');
									$this.parents('.searchProblem').siblings('.showResultMain').children('p').removeClass('hide').html('未查找到图片对应内容的题目');
								}
							});
						}
					}else if (resp.resCode == "200"){
						location.href="/login.htm";
					}
				}, "json");
			}
		});

		//原题
		$('.recommended').on('click','.originalDel',function(){
			var $this=$(this);
			var topicId=$this.parent().attr('data');
			var resId = $this.parent().attr('data-resId') == undefined ? "0" : $this.parent().attr('data-resId');
			var ocrText = $this.parent().attr('data-ocrText') == undefined ? "" : $this.parent().attr('data-ocrText');
			var originalElse=$this.parents('.recommended').find('.original');

			//判断原题被选中
			if($('.search .endRecord').size()==0){
				if($('.search .proPicture').size()!=0){
					$('.search .proPicture').remove();
				}
				//添加讲解题目
				if(originalElse.hasClass('ac')){
					originalElse.removeClass('ac').siblings('.pa').addClass('similarDel');
				}
				$this.addClass('ac').siblings('.pa').removeClass('similarDel');
				if($('.search span').hasClass("or")){
					$('.search').find('span.or').replaceWith('<span class="problem or"><em class="problemContent" data-resId="'+resId+'" data-ocrText="'+ocrText+'">'+topicId+'</em><input readonly="" class="preview preview_btn" data='+topicId+'><i class="delete orDel"></i></span>')
				}else{
					$('.search').find('button').after('<span class="problem or"><em class="problemContent">'+topicId+'</em><input readonly="" class="preview preview_btn" data='+topicId+'><i class="delete orDel"></i></span>').hide().addClass('hide');
				}
			}//else 正在录题ing

		});
		//相似题
		$('.recommended').on('click','.similarDel',function(){
			var $this=$(this);
			var topicId=$this.parent().attr('data');
			$this.toggleClass('ac');
			if($this.hasClass("ac")){
				$this.siblings('.pa').removeClass('originalDel');
				$this.hover(function(){
					$this.children('em').addClass('hide').siblings('b').removeClass('hide');
				},function(){
					$this.children('em').removeClass('hide').siblings('b').addClass('hide');
				});
				$('.search').children().last().show().children('div').append('<span class="problem same" id="'+topicId+'"><em class="problemContent">'+topicId+'</em><input readonly="" class="preview preview_btn" data='+topicId+'><i class="delete sameDel"></i></span>').siblings('em').show();
			}else{
				$this.siblings('.pa').addClass('originalDel');
				$this.hover(function(){
					$this.children('em').removeClass('hide').siblings('b').addClass('hide');

				});
				$('#'+topicId).remove();
				if($('.search').children().last().children('div').children('span').length==0){
					$('.search').children().last().children('em').hide();
				}
			}
		});

		//取消录题
		$('.unknowNum').on('click','.canceled',function(){
			$(this).parents('.recordText').siblings('.toRecord').show().removeClass('hide');
			$(this).parents('.recordText').remove()
		})
		//点击我要录题出现副文本
		var richNum = 0;
		$('.outputResultMain').on('click','.toRecord',function(){
			var record=$(
				'<div class="recordText">'+
				'<div id="richText'+(++richNum)+'" style="width: 595px;height: 170px"></div>'+
				'<div class="">'+
				'<button type="button" class="w110 c_bg_color2 endRecord">录题完毕</button>'+
				'<button type="button" class="w110 c_bg_color8 canceled">取消</button>'+
				'</div>'+
				'</div>');
			$(this).addClass('hide').after(record).hide();
			UM.getEditor('richText'+richNum);
			$('.recordText .edui-toolbar .edui-btn-image').hide();
			$('.recordText .edui-toolbar .edui-btn-image').next().hide();
		});

		//录题完毕
		$('.outputResultMain').on('click','.endRecord',function(){
			var content = $('#richText'+richNum).html();
			var showResultMain=$(this).parents('.showResultMain');
			if (content != "<p><br></p>"){
				$.post("/topic/search.do", "subjectId="+subjectId+"&content="+encodeURIComponent(content), function(resp){
					if (resp.resCode == "000"){
						console.log(resp);
						var data = resp.data.topics;
						if (data.resCode == "000"){
							var qs = data.data.qs;
							var addRecommended="<div data='self'>";
							$.each(qs, function(index, value){
								addRecommended +='<div class="detailTitle pr" id="resultNum'+resultNum+'" data="'+value.questionId+'">'+
									'<span class="original pa originalDel">原题</span>'+
									'<span class="similar pa similarDel"><em>相似题</em><b class="hide">取消</b></span>'+value.content +'</div>';
							});
							addRecommended += "</div>";
							showResultMain.removeClass('hide').children('.recommended').removeClass('hide').html(addRecommended).children('h4').removeClass('hide');
							showResultMain.children('.recommended').next().children().removeClass('hide');
						}
					}
				}, "json");
			}else{
				return false;
			}
			$(this).parent().parent().replaceWith('<div class="proPicture pr fl problemContent">'+ $('#richText'+richNum).html()+'<span class="delPicture pa">删除</span></div>');
			$('.proPicture').find('img').css('max-width','518px');
		});
		//删除录题 or 上传的图片
		$('.formR').on('click','.delPicture',function(){
			var $this=$(this);
			if($(this).parent().hasClass('problemContent') || $(this).parent().hasClass('proPictures')){
				if(!$(this).parents('.showResultMain').parent().hasClass('unknowNum')){
					//录题删除按钮 添加到formR 并且 相似题目没有选用
					if($this.parents('.outputResult').parent().hasClass('formR') && $this.parents('.outputResult').find('span.problem').length==0){
						$this.parents('.outputResult').remove()
					}
					$this.parents('.origPicture').remove();
				}else{
					$(this).parents('.proPicture').siblings('.toRecord').show();
					$(this).parents('.viewPicture').remove();
					$(this).parents('.proPicture').remove();
				}
			}else{

				$(this).parents('.showResultMain').children('p').hide().addClass('hide');
				$(this).parents('.viewPicture').remove();
				$(this).parents('.proPicture').remove();
				$(this).parent().remove();

			}
		});
		//确定、取消按钮
		$('.queDetermine').on('click','button',function(){
			var $this=$(this);
			var $pic=$this.parents('.unknowNum').find('div').hasClass('proPictures');
			$('.add_knowledge').siblings('input').css('background','#fff').removeAttr('disabled');

			//知道题号 确定按钮
			if($this.hasClass('problemOk')){
				$this.parents('.formR').prepend($('.outputResultMain').html()).find(".search_same").hide();
			}else if($this.hasClass('problemOk1')){
				//不知道题号 确定按钮
				$this.parent().siblings('.searchProblem').find('textarea').val('');
				if($('.search').find('span.problem').length>0 || $('.search').find('span.delPicture').length>0){
					$this.parents('.formR').prepend("<div class='outputResult pr'>"+$('.search').html()+"</div>");
					//没有录题 并 没有选择讲解题目 点击确定讲解题目不显示
					if(!$('.formR').children('.outputResult').find('.toRecord').hasClass('hide') && !$pic){
						$this.parents('.formR').children('.outputResult').find('button.toRecord').parent().remove()
					}
					if($('.formR').children('.outputResult').children('.origPicture').find('span.problem').length==0 && $('.search').find('span.delPicture').length==0){
						if(!$pic){
							$('.formR').children('.outputResult').children('.origPicture').remove();
						}else{
							$('.formR').children('.outputResult').find('.toRecord').replaceWith($('.ocrImage').html());
							$('.viewPicture').addClass('fl').children('p').remove();
						}
					}
					$this.parents('.formR').children('.outputResult').find('.toRecord').remove();
				}

			}
			$(this).parents('.tabItem').find('.showResultMain').children('div').children().remove();
			$(this).parents('.tabItem').hide();
			$('.tab .tabList li a').removeClass('ac');
		});

		$('.sitSeat').on('keyup','#ptSeatId',function(){
			var time = $("input[name=time]:checked").val();
			var txt = $(this).val();
			if (txt == ""){
				$("#ptTime").text(0);
				return;
			};
			if (reg.test(txt)){
				var num = parseInt(txt);
				var needPtSeat = 0;
				if (type == 'modify'){
					needPtSeat = (num - ptSeat)*time/60;
				}else{
					needPtSeat = num*time/60;
				}
				if (needPtSeat > ptSeatNum){
					dialog._buy_ptcourse(function() {
						dialog._attendSeat();
						$("#btnSubmit").click(function () {
							$("#PTSeatForm").validate({
								submitHandler: function (form) {
									var ptSeatTime = $("#ptSeatTime").val();
									reg = /^[0-9]*[1-9][0-9]*$/;
									if (!reg.test(ptSeatTime)) {
										dialog._timer("旁听坐席位必须由正整数构成", 2, 2, null);
									} else {
										form.action = "/alipayweb/alipayWebPTSeatSubmit.do";
										form.submit();
									}
								}
							});
						});
						$("#btnClose").click(function () {
							$(".popBox").dialog("close");
							$("#ptSeatId").val("");
							$("#ptTime").text("0");
						});
						$('.seatvalue').blur().placeholder({value: '请输入您要购买的旁听时长'});
					}, function(){
						$("#ptSeatId").val("");
						$("#ptTime").text("0");
					});

					return false;
				}
				$("#ptTime").text(parseInt(time)/60*num);
			}else{
				$(this).val("");
				$("#ptTime").text(0);
			}
		});

		$("body").on('keyup', '#ptSeatTime', function(){
			var reg = /^[0-9]*[1-9][0-9]*$/;
			console.log($(this).val());
			if (reg.test($(this).val())){
				$("#PTSeatForm em").text($(this).val());
			}else{
				$(this).val("");
				$("#PTSeatForm em").text(0);
			}
		});

		$("input[name=time]").on('click',function(){
			var time = $(this).val();
			var txt = $("#ptSeatId").val();
			if (txt == "") return;
			if (reg.test(txt)){
				var num = parseInt(txt);
				var needPtSeat = 0;
				if (type == 'modify'){
					needPtSeat = (num - ptSeat)*time/60;
				}else{
					needPtSeat = num*time/60;
				}
				if (needPtSeat > ptSeatNum){
					dialog._buy_ptcourse(function() {
						dialog._attendSeat();
						$("#btnSubmit").click(function () {
							$("#PTSeatForm").validate({
								submitHandler: function (form) {
									var ptSeatTime = $("#ptSeatTime").val();
									reg = /^[0-9]*[1-9][0-9]*$/;
									if (!reg.test(ptSeatTime)) {
										dialog._timer("旁听坐席位必须由正整数构成", 2, 2, null);
									} else {
										form.action = "/alipayweb/alipayWebPTSeatSubmit.do";
										form.submit();
									}
								}
							});
						});
						$('.seatvalue').blur().placeholder({value: '请输入您要购买的旁听时长'});
					}, function(){
						$("#ptSeatId").val("");
						$("#ptTime").text("0");
					});

					return false;
				}
				$("#ptTime").text(parseInt(time)/60*parseInt(txt));
			}
		});
		//找原题兼容火狐样式
		if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
			$('.unKnowsearch').children('.originalProblem').css('margin-top','1px');
			$('.scanCode').css('margin-top','1px');
		};

		//添加讲解题目
		$('.addExplainBtn').click(function(){
			var courseType=$("#courseType").val();
			var subject=	$("#subject").val();
			var grade=	$("#grade").val();
			var courseTheme = $("#theme").val();
			var dateTime = $("#date").val();
			var time = $("input[name=time]:checked").val();
			var content = edit.getContent();
			var pushType = $("#pushType").val();
			var path = "/courses/pk.do";
			var kps = "";
			var topics = "";
			var topicJson = {};
			var topicArrs = [];
			var customText = "";
			var ptSeat = $("#ptSeatId").val() == "" ? "" : $("#ptSeatId").val();
			if ($.trim(courseTheme) == "" || $.trim(dateTime) == "") return false;
			if ($.trim(courseTheme).length >100) return false;
			if (ptSeat == "") return false;
			if (seat > parseInt($("#ptSeatId").val())) return false;
			$.each($(".addKnow i.deleteK"), function(index, value){
				kps += $(value).attr("data") + ",";
			});
			if(kps.length > 0){
				kps = "," + kps;
			}

			$.each($(".customText span em"), function(index, value){
				customText += $(value).text() + ",";
			});

			//原题相似题
			$.each($(".topicJson").children('.outputResult'), function(index, value){
				var or = $(value).find("span.or").children("em").text();
				if (or!=''&&reg.test(or)){
					topics += or + ",";
				}
				var content = "";
				content = $(value).find(".proPicture").html();
				var arrs = new Array();
				$.each($(value).find("span.same"), function(ind, val){
					var same = $(val).children("em").text();
					arrs.push(same);
				});
				var source = "0";
				if (content != undefined) source = "1";
				var resIds = $(value).find("span.or").children('em').attr('data-resId') == undefined ? "0" : $(value).find("span.or").children('em').attr('data-resId');
				var ocr = $(value).find("span.or").children('em').attr('data-ocrText') == undefined ? "" : $(value).find("span.or").children('em').attr('data-ocrText');
				var json = {
					topicId:or,
					content:content,
					nearIds:arrs,
					resId:resIds,
					ocrText:ocr,
					subject:subjectId,
					grade:gradeId,
					source:source
				};
				topicArrs.push(json);
			});
			topicJson.list = topicArrs;
			if (topics.length > 0){
				topics = "," + topics;
			}
			if (type == "modify"){
				path = "/courses/modify.do";
				orderId=ptcourse.orderId;
			}else if (type == "copy"){
				orderId=ptcourse.orderId;
			}
			//return;
			$.post(path, {
					"classId"    :classId,
					"orderId"    :orderId,
					"dateTime"   :dateTime,
					"duration"   :time,
					"courseTheme":courseTheme,
					"courseText" :content,
					"pushType"   :pushType,
					"kpIds"      :kps,
					"ptSeat"     :ptSeat,
					"topics"     :topics,
					"topicJson"  :JSON.stringify(topicJson),
					"customText": encodeURIComponent(customText),
					"courseType": courseType,
					"gradeId": grade,
					"subjectId": subject,
				    "advertiseResId":$("#advertiseResId").val(),
					"courseMode":courseMode
				}, function(resp){
					if (resp.resCode == "000"){
							location.href="/courses/addExplainSubject.htm?classId="+resp.data.classId+"&courseMode="+resp.data.courseMode+"&subjectId="+resp.data.subjectId+"&questionId=0";
						    type = "modify";
					}else{
						dialog._timer(resp.resMsg, 2, 2, null);
					}
				},
				"json");
			/*location.href="/courses/addExplainSubject.htm?classId=0";*/
		})



		$('.addSameBtn').click(function(){
			var questionId=$(this).parents('.outputResult').attr('data');
			location.href="/courses/addExplainSubject.htm?classId="+classId+"&courseMode=0&subjectId=0&questionId="+questionId;

			})

	};
	return{
		init:init
	}
});