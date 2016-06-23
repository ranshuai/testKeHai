define(['pageBar','common'], function (pagebar,common) {

	function sercheEvaluate(val, evaluateReys) {
		var tab = "";
		if (val.length > 0) {
			for (var k = 0; k < val.length; k++) {
				var time = new Date(parseFloat(val[k].time)).format("yyyy-MM-dd hh:mm:ss");
				/*var time = val[k].time;*/
				var evaurl = "";
				if (val[k].ppResId == "" || val[k].ppResId == 0 || val[k].ppResId == undefined) {
					evaurl = "/front/sanhai/images/person.png";
				} else {
					evaurl = "/file/loadImage/" + val[k].ppResId + ".r?dim=60";
				}
				tab += "<li class='dialogItem '>" +
					"<div class='head_img'>" +
					"<a href='#'><img STYLE='width:60px; height:60px;' src='" + evaurl + "'>" + val[k].userName + "</a>" +
					" </div>" +
					"<i class='arrow'></i>" +
						/*  "<div class='title'>" +*/
						/*"<em>"+val[k].des+"</em>"+*/
					"<div class='title_r fr'>" +
					"<span>课程：" + val[k].sourceScore + "分</span>" +
					"<span>老师：" + val[k].teaScore + "分</span>" +
					"<span>服务：" + val[k].orgScore + "分</span>" +
					"</div>" +
						/* "</div>" +*/
					"<div class='dialogCont'>" +
					val[k].des +
					" </div>" +
					"<div class='bottom_tools'>" +
					"<span>" + time + "</span>&nbsp;&nbsp;&nbsp;<span><a href='/site/course/" + val[k].courseId + "/courseContent.htm'>《" + val[k].courseName + "》</a></span>";
				var evaluateReyLength = 0;
				var str = "";
				var evaluateId = val[k].evaid;
				if (evaluateReys.length > 0) {
					for (var j = 0; j < evaluateReys.length; j++) {
						var evakeyurl = "";
						if (evaluateReys[j].ppResId == "" || evaluateReys[j].ppResId == 0 || evaluateReys[j].ppResId == undefined) {
							evakeyurl = "/front/sanhai/images/person.png";
						} else {
							evakeyurl = "/file/loadImage/" + evaluateReys[j].ppResId + ".r?dim=40";
						}
						if (evaluateReys[j].evaid == evaluateId) {
							evaluateReyLength++;
							var ti = new Date(parseFloat(evaluateReys[j].reTime)).format("yyyy-MM-dd hh:mm:ss");
							/*var ti = evaluateReys[j].reTime;*/
							str += "<dl class='clearfix'>" +
								"<dt><img STYLE='width:40px; height:40px;' src='" + evakeyurl + "'></dt>" +
								"<dd><em>" + evaluateReys[j].reUserName + "：</em>" + evaluateReys[j].content + "</dd>" +
								"<dd><span>" + ti + "</span></dd>" +
								"</dl>";
						}
					}
					tab += "<div class='bottom_r'>" +
						"<a>" +
						"<em>查看回复</em>" +
						"(<span class='bot_span'>" + evaluateReyLength + "</span>)" +
						"</a>" +
						"</div>" +
						"</div>" +
						"<div class='view_reply  hide'>";
					tab += str;
					evaluateReyLength = 0;
				} else {
					tab += "<div class='bottom_r'>" +
						"<a>" +
						"<em>查看回复</em>" +
						"(<span class='bot_span'>" + evaluateReyLength + "</span>)" +
						"</a>" +
						"</div>" +
						"</div>" +
						"<div class='view_reply  hide'>";
					tab += str;
					evaluateReyLength = 0;
				}
				tab += "<div class=\"pr evaluateResult\"><textarea name='' id=''></textarea><span class=\"pa red\" style=\"bottom:-20px;left:0\">内容不能为空</span></div>" +
					"<button class='btn c_btn_size6 c_bg_color4 fr clickReply'>回 复</button>" +
					"<input type='hidden' value='" + evaluateId + "'/>" +
					"</div>" +
					"</li>";
			}
		}


		$("#sereva").html(tab);
		$('#sereva li').each(function () {
			$(this).find('dl:last').addClass('last_dialogItem');
		});
		/*
		*	学生的评论
		 */
		 _remarks($('.evaluateResult'));
		function _remarks (obj){
			var strongN =300; //数字
			var textN = '';
			var timer = null;
			if(window.navigator.userAgent.indexOf('MSIE 9.0')!=-1){
				obj.find('textarea').focus(function(){
					var $this = $(this);
					timer = setInterval(function(){
					var textN = Number(obj.find('textarea').val().length);
					showNum(strongN,textN,$this);
					},100);
				}); 
				obj.find('textarea').blur(function(){
					clearInterval(timer)
				})           
			}
			obj.find('textarea').on('input propertychange',function(){
				var $this = $(this);
				var textN = Number($this.val().length);
				showNum(strongN,textN,$this);
			});
			function showNum(strongN,textN,$this){
				if((strongN-textN)>=0){
					$this.next('span').html('还可以输入<strong>'+(strongN-textN)+'</strong>字');
					$this.parents('.view_reply').find('button').removeAttr('disabled');
					if($this.parents('.view_reply').find('textarea').val() == ""){
						//$('.ui-dialog-buttonpane').find('button').eq(0).attr('disabled','disabled');
						$this.parents('.view_reply').find('button').attr('disabled','disabled');
						$this.parents('.evaluateResult').find('span').html('内容不能为空');
					}
				}else{
					$this.parents('.evaluateResult').find('span').html('您已超出<strong>'+Math.abs(strongN-textN)+'</strong>字');
					$this.parents('.view_reply').find('button').attr('disabled','disabled');
					return
				}
			}
		}
		/*最新评论*/
		//回调函数
		$('.dialogList').rViewReply('', function () {
			$('.view_reply').mouseenter(function () {
				$(document).off();
			});
			$('.view_reply').mouseleave(function () {
				$(document).on('click', function () {
					$('.view_reply').addClass('hide');
					$('.bottom_r').find('em').text('查看回复');
					$('.bottom_r').children('a').removeClass('ac');
					$('#sereva textarea').val('');
					$('#sereva .evaluateResult span').html('内容不能为空');
				});
			});
		});

		function trim(str) {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		}

		$('.clickReply').click(function () {
			var $this = $(this);
			var replyCont = $this.prev('div').find('textarea').val();
			var oDate = new Date();
			var myYear = oDate.getFullYear();
			var myMonth = oDate.getMonth() + 1;
			var myDate = oDate.getDate();
			var myHours = oDate.getHours();
			var myMinutes = oDate.getMinutes();
			var mySeconds = oDate.getSeconds();

			if (replyCont) {
				var evaid = $this.next().val();
				var content = replyCont;
				// if(trim(content).length>300){
				// 	$('#wrong').removeClass('hide');
				// 	return;
				// }
				var url = "";
				if (ppid == "false" || ppid == 0 || ppid == undefined) {
					url = "/front/sanhai/images/person.png";
				} else {
					url = "/file/loadImage/" + ppid + ".r?dim=40";
				}
				$('<dl class="clearfix">' +
					'<dt><img STYLE=width:40px; height:40px; src=' + url + '></dt>' +
					'<dd><em>' + nickname + '：</em><string>' + replyCont + '</string></dd>' +
					'<dd><span>' + myYear + '-' + supplementO(myMonth) + '-' + supplementO(myDate) + '&nbsp' + supplementO(myHours) + ':' + supplementO(myMinutes) + ':' + supplementO(mySeconds) + '</span></dd>' +
					'</dl>').insertBefore($(this).parent('.view_reply').find('.evaluateResult'));

				$this.prev('div').find('textarea').val('');
				$this.prev('div').find('span').html('还可以输入<strong>300</strong>字');
				var counts = parseInt($this.parent('div').prev('div').children('div').children('a').children('span').text()) + 1;
				$this.parent('div').prev('div').children('div').children('a').children('span').text(counts);

				$.ajax({
					type: "post",
					url: "/evaluate/insertEvaluateRey.do",
					dataType: "json",
					data: {
						"evaid": evaid,
						"content": content
					},
					success: function (result) {

						//$('#wrong').addClass('hide');
					},
					error: function (xhr, status, error) {
						//alert("请求失败.");
					}
				});
			} else {
				return false;
			}

			function supplementO(num) {
				if (num < 10) {
					return '0' + num;
				} else {
					return '' + num;
				}
			}
		});

	}


	function loadevaluate1(url, data, currPage) {

		var a = data;
		data += "currentPage=" + currPage;
		$.ajax({
			url: url,
			data: data,
			type: "post",
			success: function (result) {
				var val = result.data.rows;//评论记录
				sercheEvaluate(val, evaluateReyresult);
				var params = new Array();
				params.push("/evaluate/searchEvaluateByStatus.do");
				params.push(a);

				pagebar.setBasePageBar(result.data.totalPages, result.data.currPage, loadevaluate1, params);

			}
			,
			error: function (xhr, status, error) {
				//alert("请求失败.");
			}
		});

	}


	function loadstuevaluate1(url, data, currPage) {

		var a = data;
		data += "currentPage=" + currPage;
		$.ajax({
			url: url,
			data: data,
			type: "post",
			success: function (result) {
				if (common.checkResponse(result) == false) {
					return;
				}
				var val = result.data.rows;//评论记录
				$("#count").text("全部评论（" + result.data.countSize + "）");
				var tab = "";

				if (val.length > 0) {
					for (var i = 0; i < val.length; i++) {
						var time = new Date(parseFloat(val[i].time)).format("yyyy-MM-dd hh:mm:ss");
						var evaurl = "";
						if (val[i].ppResId == "" || val[i].ppResId == 0) {
							evaurl = "/front/sanhai/images/person.png";
						} else {
							evaurl = "/file/loadImage/" + val[i].ppResId + ".r?dim=60";
						}
						tab += " <li class='dialogItem '>" +
							"<div class='head_img'>" +
							"<a href='/site/theacher/" + val[i].userId + "/toTeacherIndex.htm'><img STYLE='width:60px; height:60px;' src='" + evaurl + "'>" + val[i].userName + "</a>" +
							"</div>" +
							"<i class='arrow'></i>" +
							"<div class='dialogCont dialogCont100'>" + val[i].des +
							"</div>" +
							"<div class='bottom_tools'>" +
							"<span>" + time + "</span><a href='/site/course/" + val[i].courseId + "/courseContent.htm'>《" + val[i].courseName + "》</a>" +
							"</div>" +
							"</li>";

					}
				}
				$("#stuevaluates").html(tab);
				var val = result.data.rows;//评论记录
				console.log(val);
				sercheEvaluate(val, evaluateReyresult);
				var params = new Array();
				params.push("/evaluate/searchEvaluateStu.do");
				params.push(a);

				pagebar.setBasePageBar(result.data.totalPages, result.data.currPage, loadstuevaluate1, params);

			},
			error: function (xhr, status, error) {
				//alert("请求失败.");
			}
		});

	}


	function loadShoolevaluate1(url, data, currPage) {
		var a = data;
		data += "currentPage=" + currPage;
		$.ajax({
			url: url,
			data: data,
			type: "post",
			success: function (result) {


				var val = result.data.rows;//评论记录
				sercheEvaluate(val, evaluateReyresult);
				var params = new Array();
				params.push("/site/shool/searchEvaluateBymodel.do");
				params.push(a);

				pagebar.setBasePageBar(result.data.totalPages, result.data.currPage, loadShoolevaluate1, params);

			}
			,
			error: function (xhr, status, error) {
				//alert("请求失败.");
			}
		});

	}

	function loadTeacherevaluate1(url, data, currPage) {
		var a = data;
		data += "currentPage=" + currPage;
		$.ajax({
			url: url,
			data: data,
			type: "post",
			success: function (result) {

				var val = result.data.rows;//评论记录
				sercheEvaluate(val, evaluateReyresult);
				var params = new Array();
				params.push("/site/theacher/searchTeacherEvaluateBymodel.do");
				params.push(a);

				pagebar.setBasePageBar(result.data.totalPages, result.data.currPage, loadTeacherevaluate1, params);

			}
			,
			error: function (xhr, status, error) {
			}
		});

	}

	function loadonetooneevaluate1(url, data, currPage) {
		var a = data;
		data += "currentPage=" + currPage;
		$.ajax({
			url: url,
			data: data,
			type: "post",
			success: function (result) {

				var val = result.data.rows;//评论记录
				sercheEvaluate(val, evaluateReyresult);
				var params = new Array();
				params.push("/site/course/searchEvaluateBymodel.do");
				params.push(a);

				pagebar.setBasePageBar(result.data.totalPages, result.data.currPage, loadonetooneevaluate1, params);

			}
			,
			error: function (xhr, status, error) {
			}
		});

	}

	return {
		loadevaluate1:loadevaluate1,
		loadstuevaluate1:loadstuevaluate1

	}

});