// JavaScript Document

define(['jquery'], function ($) {
//父级 span class=“select_plus” 两个子级 一个是 em 一个是 select class=“sel_body”
	var oSelect_body = $('body');
	var oSelect_plus = $('.select_plus');
	oSelect_body.on('change','.sel_body',function () {
		var $this = $(this);
		var oEm = $this.parent('.select_plus').children('em');
		oEm.text($this.find("option:selected").text());
	});
//左侧列表导航
	$('.left_menu').delegate('.li_1', {
		'click': function () {
			var $this = $(this);
			$this.parents('.left_menu').find('.li_2 a').removeClass('cur');
			$this.parent('li').find('.li_2 a:first').addClass('cur');
		}
	});
	$('.left_menu').delegate('.li_2 a', {
		'click': function () {
			var $this = $(this);
			$this.parents('.left_menu').find('.li_2 a').removeClass('cur');
			$this.addClass('cur');
		}
	});
	//页面轮播图
	$(function () {
		$('.jsCarousel');
		var aCarouselLi = $('.jsCarousel ul').children();
		$('.jsCarousel ul').css({'width': aCarouselLi.outerWidth(true) * aCarouselLi.length});
		$('.jsCarousel ul');
		var W = aCarouselLi.outerWidth(true) * 4;
		var num = 0;
		var num2 = aCarouselLi.length / 4 - 1;
		$('.jsCarousel').find('.next').click(function () {
			num++;
			if (num > num2) {
				num = num2;
				return false;
			} else {
				$('.jsCarousel ul').stop().animate({'left': -num * W}, {'duration': 1500});
			}
		});
		$('.jsCarousel').find('.prev').click(function () {
			num--;
			if (num <= 0) {
				num = 0;
			}
			$('.jsCarousel ul').animate({'left': -num * W}, {'duration': 1000});
		});
	});
	//选择标签 sele_label
	//用的时候给父级 ul 加 sele_label className;
	$('.sele_label li').click(function () {
		var $this = $(this);
		$this.toggleClass('ac');
		$this.children('i').toggleClass('ac');
	});
	//点击编辑展开内容 click_open
	$('.main_border ').undelegate();
	$('.main_border ').delegate('.click_open_edit','click',function(){
		var $this = $(this);
		var index = $('.click_open_edit').index($(this));
		$('.open_editor_cont').eq(index).toggleClass('hide');
		$('.click_open_cont').eq(index).toggleClass('hide');
		$('.click_open_edit').eq(index).toggleClass('hide');
		if($('.datetimepicker').val()=='0--'){
			$('.datetimepicker').val('');
		}
	});
  
	$('.click_open_cont .click_open_cancelBtn').click(function () {
		var $this = $(this);
		var index = $('.click_open_cont .click_open_cancelBtn').index($(this));
		$this.parents('.edit_cont_warpper').find('.open_editor_cont').removeClass('hide');
		$('.click_open_edit').eq(index).toggleClass('hide');
	});

//点击标题展开内容 click_open
	$('.click_open_title').click(function () {
		var $this = $(this);
		var index = $('.click_open_title').index($(this));
		$this.next('.click_open_cont').removeClass('hide').addClass('show').siblings('.click_open_cont').addClass('hide').siblings('.click_open_title').removeClass('hide').addClass('show');
		$this.addClass('hide');
		$('.click_open_cont').eq(index).removeClass('hide');
	});
	$('.click_open_cont .click_open_cancelBtn').click(function () {
		var $this = $(this);
		var index = $('.click_open_cont .click_open_cancelBtn').index($(this));
		$this.parents('.click_open_cont').addClass('hide');
		$('.click_open_title').eq(index).removeClass('hide');
	});

//评分 score
	score = function (str, obj) {
		var average = 110 / 5;//平均数
		var num1 = Number(str.charAt(0));
		var num2 = Number(str.charAt(2) / 10);
		var oRed_js_W = average * num1 + average * num2;
		//console.log(oRed_js_W);
		var obj = $('.' + obj).eq(0);
		if (num1 <= 0) {
			obj.css('width', oRed_js_W - 2 + 'px');
		} else {
			obj.css('width', oRed_js_W + num1 + 'px');
		}
	};
	/*小背景图评分*/
	score_small = function (str, obj) {
		var average = 88 / 5;//平均数
		var num1 = Number(str.charAt(0));
		var num2 = Number(str.charAt(2) / 10);
		var oRed_js_W = average * num1 + average * num2;
		var obj = $('.' + obj).eq(0);
		if (num1 <= 0) {
			obj.css('width', oRed_js_W - 2 + 'px');
		} else {
			obj.css('width', oRed_js_W + num1 + 'px');
		}
	};
//点击回复添加内容
	$('.clickReply').click(function () {
		var $this = $(this);
		var replyCont = $this.prev('textarea').val();
		var oDate = new Date();
		var myYear = oDate.getFullYear();
		var myMonth = oDate.getMonth() + 1;
		var myDate = oDate.getDate();
		var myHours = oDate.getHours();
		var myMinutes = oDate.getMinutes();
		var mySeconds = oDate.getSeconds();
		if ($this.prev('textarea').val()) {
			$('<dl class="clearfix">' +
				'<dt><img src="../../front/sanhai/images/mok.png"></dt>' +
				'<dd><em>慕容格格：</em><string>' + replyCont + '</string></dd>' +
				'<dd><span>' + myYear + '年-' + supplementO(myMonth) + '-' + supplementO(myDate) + '&nbsp' + supplementO(myHours) + ':' + supplementO(myMinutes) + ':' + supplementO(mySeconds) + '</span></dd>' +
				'</dl>').insertBefore($(this).parent('.view_reply').find('textarea'));
			$this.prev('textarea').val('');
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
	/*班海的下拉框*/
	$('.widget_select').on({
		mouseover: function () {
			$(this).addClass('widget_select_hover');
		},
		mouseout: function () {
			$(this).removeClass('widget_select_hover');
		}
	});
	$('.widget_select a').on('click', function () {
		var pa = $(this).parents('.widget_select');
		pa.find('h6 span').text($(this).text());
		pa.removeClass('widget_select_hover');
	});

	/*loading页面加载*/
	$('.loading_page').children().css('visibility', 'hidden');

	/*置顶*/
	window.arr = [];
	toTop = function () {
		$('body').append($('<div class="toTop hide"></div>'));
		$(window).scroll(function () {

			if ($('body').scrollTop() == 0) {
				$('.toTop').css({'display': 'none'});
			} else {
				$('.toTop').css({'display': 'block'})
					.click(function () {
						$('body').scrollTop(0);
					});
			}
		});

		arr.push(toTop);
	};
	/*调兼容*/
	$(":checkbox").css({'border': 'none'});
	$(":radio").css({'border': 'none', 'border': '0'});
	if (navigator.userAgent.indexOf("MSIE 7.0") != -1) {
		//alert('IE7');
		$(":checkbox").css({'border': 'none'});
		$(":radio").css({'border': 'none', 'border': '0'});

	} else if (navigator.userAgent.indexOf("MSIE 8.0") != -1) {
		//alert('IE8');
		$(":checkbox").css({'border': 'none'});
		$(":radio").css({'border': 'none'});
	}
	/*最新评论*/

	/*侧边导航移入移出*/
	(function () {
		var oUl = $('#js-sidebar');
		var aLi = oUl.children();
		var aUl = $('.more_class_cont');
		var timer = null;
		$('.all_class_type_hover').hover(function () {
			timer = setTimeout(function () {
				$('.class_type_wrap').removeClass('hide');
			}, 150);
		}, function () {
			clearTimeout(timer);
			timer = setTimeout(function () {
				$('.class_type_wrap').addClass('hide');
			}, 300);
		});
		aLi.mouseenter(function () {
			var $this = $(this);
			timer = setTimeout(function () {
				aLi.removeClass('active');
				$this.addClass('active');
				aUl.addClass('hide');
				$this.prev().find('.class_type_content').css('borderBottom', '1px solid #fff');
				var index = $this.index();
				if (index == aLi.length - 1) {
				} else {
					$this.find('.class_type_content').css('borderBottom', '1px solid #ff7f00');
				}
				aUl.eq(index).removeClass('hide');
				aLi.css({
					'cursor': 'pointer'
				});
			}, 150);
		});
		aLi.mouseleave(function () {
			var $this = $(this);
			clearTimeout(timer);
			var index = $this.index();
			if (index == aLi.length - 1) {
			} else {
				$this.find('.class_type_content').css('borderBottom', '1px solid #fdbd39');
			}
			$this.prev().find('.class_type_content').css('borderBottom', '1px solid #fdbd39');
			aLi.removeClass('active');
			aUl.addClass('hide');
		});
	})();

	/*给表格里有title的元素加手型*/
	$('td').each(function () {
		if ($(this).attr('title')) {
			$(this).css({'color': '#fcb314'});
		}
	});
	$('td').mouseenter(function () {
		if ($(this).attr('title')) {
			$(this).css({'cursor': 'pointer'});
		}
	});

	/*课海重构*/
	Kh = {
		/*判断有没有消息*/
		'message': function () {
			var num = 0;
			$('.message').find('.messageNum').each(function (index, ele) {
				var num2 = index;
				if ($(this).text() == 0) {
					num++;
					$(this).parent('span').text('');
					Kh.rSelectList('.message');
				}
				if (num > num2) {
					$('.msg_prɒmpt').hide();
				} else {
					$('.msg_prɒmpt').show();
				}

			});
		},

		/*综合排序*/
		'allSorting': function () {
			$('.main_l_nav li.js-li').each(function (i) {
				var $this = $(this);
				$this.click(function(){
					$this.addClass('active');
					$this.siblings().removeClass('active');
				});
				/*var $ud = $('.updown').find('em');
					$this.click(function () {
					$this.children().addClass('active');
					$this.siblings().children().removeClass('active');
					if (i != 4 && $ud.attr('class') == 'js-slideDown_upw') {
						$ud.attr('class', 'js-slideDown_upb');
					} else if (i != 4 && $ud.attr('class') == 'js-slideUp_downw') {
						$ud.attr('class', 'js-slideUp_downb');
					}
				});*/
			});
		},
		/*心形收藏*/
		'collectHeart': function (val) {
			val.html('<em class="collect"></em>已收藏').addClass('add_loved');
		},
		/*关注*/
		'addAttention': function (val) {

			val.addClass('attented').html('<em></em>已关注');
		}
	};


	/*
	 *   Created By   2015/11/9
	 */

	$.fn.extend({
		//顶部导航的hover效果  调用方式$('.tabRole').rNavhover();
		'rNavhover': function () {
			$(this).hover(function () {
				$this = $(this);
				$this.children('ul').removeClass('hide');
				if($this.children('ul').children()){
					//console.log($this.children('ul').children('li:last').css('border','0'))
				}
			}, function () {
				$this = $(this);
				$this.children('ul').addClass('hide');
			});
		},
		//搜索框的机构切换
		'rSetUpTab': function () {
			$(this).click(function () {
				var _this = $(this);
				_this.children('ul').removeClass('hide');
				_this.undelegate();
				_this.delegate('li', {
					click: function (event) {
						var $this = $(this);
						var txt = $this.parents('.select_type_List').find('.sele_type').text();
						$this.parents('.select_type_List').find('.sele_type').text($this.text());
						$this.text(txt);
						$this.parent('ul').addClass('hide');
						event.stopPropagation();
					}
				});
				$(document).click(function () {
					_this.children('ul').addClass('hide');
				});
				return false;
			});
		},
		//首页轮播
		'rIndexCarousel': function () {
			var oBox = $(this);
			var oBar = $('.banner');
			var oUl = $('.bannerList');
			var aLi = oUl.children();//img
			var oSliul = $('.slidernav_ul');
			var aSlili = oSliul.children();
			var oNext = $('.nextBtn');
			var oPrev = $('.prevBtn');
			var num = 0;
			var timer = null;

			function move() {
				num++;
				aSlili.removeClass('ac');
				aSlili.eq(num % 3).addClass('ac');
				aLi.css({'display': 'none'});
				oBox.css({'background': arr[num % 3]});
				aLi.eq(num % 3).fadeIn(1000);
			};
			aSlili.mouseover(function () {
				var $this = $(this);
				num = aSlili.index($this);
				//alert(aSlili.index($this));
				num--;
				move();
			});
			/*添加交互*/
			DataHover(oBar);
			//DataHover(oPrev);
			function DataHover(obj) {
				obj.hover(function () {
					$(oNext).css({'opacity': 100, 'filter': 'alpha(opacity=100)'});
					$(oPrev).css({'opacity': 100, 'filter': 'alpha(opacity=100)'})
				}, function () {
					$(oNext).css({'opacity': 0, 'filter': 'alpha(opacity=0)'});
					$(oPrev).css({'opacity': 0, 'filter': 'alpha(opacity=0)'})
				});
			}

			oNext.mousedown(function () {
				$(this).css({'backgroundPosition': '-800px -80px'});
				move();
				$(this).mouseup(
					function () {
						$(this).css({'backgroundPosition': '-600px 0'});
					}
				)
			});
			oPrev.mousedown(function () {
				$(this).css({'backgroundPosition': '-798px 0px'});
				num--;
				if (num < 0) {
					num = 2;
				}
				aSlili.removeClass('ac');
				aSlili.eq(num % 3).addClass('ac');
				aLi.css({'display': 'none'});
				//alert(num%3);
				aLi.eq(num % 3).fadeIn(1000);
				$(this).mouseup(
					function () {
						$(this).css({'backgroundPosition': '-558px 0'});
					}
				)
			});
			//自动轮播
			/*timer = setInterval(function(){
			 move();
			 },2000);
			 */
			/*oBar.hover(function(){
			 clearInterval(timer);
			 oNext.removeClass('hide');
			 oPrev.removeClass('hide');
			 },function(){
			 oNext.addClass('hide');
			 oPrev.addClass('hide');
			 timer = setInterval(function(){
			 move();
			 },1500);
			 });*/
		},
		//首页左侧菜单导航
		'rLeftMenuHover': function () {
			var oUl = $(this);
			var aLi = oUl.children();
			var aUl = $('.more_class_cont');
			var timer = null;
			aLi.mouseenter(function () {
				var $this = $(this);
				timer = setTimeout(function () {
					aLi.removeClass('active');
					$this.addClass('active');
					aUl.addClass('hide');
					$this.prev().find('.class_type_content').css('borderBottom', '1px solid #fff');
					var index = $this.index();
					if (index == aLi.length - 1) {
					} else {
						$this.find('.class_type_content').css('borderBottom', '1px solid #ff7f00');
					}
					aUl.eq(index).removeClass('hide');
					aLi.css({
						'cursor': 'pointer'
					});
				}, 150);
			});
			aLi.mouseleave(function () {
				var $this = $(this);
				clearTimeout(timer);
				var index = $this.index();
				if (index == aLi.length - 1) {
				} else {
					$this.find('.class_type_content').css('borderBottom', '1px solid #fdbd39');
				}
				$this.prev().find('.class_type_content').css('borderBottom', '1px solid #fdbd39');
				aLi.removeClass('active');
				aUl.addClass('hide');
			});
		},
		//入驻机构轮播
		'rOrganizationBanner': function () {
			var oDiv = $(this);
			var oUl = $('.organization_banner_list');
			var aLi = oUl.children();  //15
			var W = aLi[0].offsetWidth * 6;
			var prev = $('.prev');
			var next = $('.next');
			var num2 = 12 / 6 - 1;
			var num = 0;
			next.click(function () {
				num++;
				if (num > num2) {
					num = num2;
					return false;
				} else {
					oUl.stop().animate({'left': -W * num}, {'duration': 1000});
				}

				//oUl.stop().animate({'left': -W * num}, {'duration': 1000})
			});

			prev.click(function () {
				num--;
				if (num <= 0) {
					num = 0;
					oUl.stop().animate({'left': -W * num}, {'duration': 1000});
				} else {
					oUl.stop().animate({'left': -W * num}, {'duration': 1000});
				}

			});
		},
		//提示语
		'placeholder': function (opts) {
			var def = {
				value: "",//提示信息文本
				top: 0,//自定义top显示位置
				ie6Top: "",
				left: 0, //自定义left显示位置
				color: "#cccdcc"//文字颜色
			}
			var opts = $.extend(def, opts);
			return this.each(function () {
				var _this = $(this);
				var placeholder = "";
				var inputH = $(this).outerHeight();
				var lineH = parseInt(_this.css("line-height"));
				var inputTop = _this.position().top;
				var inputLeft = _this.position().left;
				var spanLeft = inputLeft + 12;

				if (opts.top == 0)var spanTop = parseInt(opts.top + inputTop);
				else spanTop = parseInt(inputTop + (inputH - lineH) / 2);
				//alert(spanTop);
				function add_placeholder() {
					_this.next('.placeholder').size() > 0 && _this.next('.placeholder').remove();
					_this.after('<span class="placeholder" style="position:absolute;top:0px;left:12px;color:' + opts.color + '; height:100%; width:100%; font-size:14px; text-align:left; line-height:36px;">' + opts.value + '</span>');
					placeholder = _this.nextAll('.placeholder');
					placeholder.click(function () {
						$(this).remove();
						_this.focus();//弹出框聚焦
					});
				};
				//_this.unbind('blur').blur();
				//alert(_this.val());
				if (_this.val() == "") add_placeholder();
				else $(placeholder).remove();
				_this.unbind('focus').focus(function () {
					$(placeholder).remove()
				});
				_this.unbind('blur').blur(function () {
					if (_this.val() == "") add_placeholder()
				});
			});
		},
		//点击回复查看内容
		'rViewReply': function (aa, fn) {

			$(this).find('li').each(function (i) {
				var $this = $(this);

				$(this).find('.bottom_r a').click(function () {

					if (aa) {

						var num = $this.find('.bot_span').text();
						//判断如果是 0 条信息不会执行下面的程序
						if (num == 0) return false;
					}


					if ($this.find('.view_reply').css('display') == 'block') {
						$this.find('.view_reply').addClass('hide');
						$this.find('.bottom_r').children('a').removeClass('ac');
						$this.find('.bottom_r').find('em').text('查看回复');
						$this.siblings().find('.view_reply').addClass('hide');
						$this.siblings().find('.bottom_r').children('a').removeClass('ac');
					} else {
						$this.find('.view_reply').removeClass('hide');
						$this.find('.bottom_r').children('a').addClass('ac');
						$this.find('.bottom_r').find('em').text('收起回复');
						$this.siblings().find('.view_reply').addClass('hide');
						$this.siblings().find('.bottom_r').children('a').removeClass('ac');
					}
					$(document).off();
					$(document).on('click', function () {
						$('.view_reply').addClass('hide');
						$('.bottom_r').find('em').text('查看回复');
						$('.bottom_r').children('a').removeClass('ac');
					});
					//回调函数
					fn && fn();
					return false;
				});
			});
		},
		//网站学校列表 全部课程分类下面的所有分类
		'selectedClassification': function (fn1, fn2) {
			function findInArr(arr, num) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] == num) {
						return true;
					}
				}
				return false;
			}
			 $('.sel_more').toggle(function(){
					var $this = $(this);
					//console.log(1)
					$this.parent('.sele_list').find('.sele_li_list').addClass('h_auto');
					$this.find('span').html('收起<i class="sel_more_stop"></i>')
			 },function(){
					var $this = $(this);
					//console.log(2)
					$this.parent('.sele_list').find('.sele_li_list').removeClass('h_auto');
					$this.find('span').html('更多<i ></i>')
			 });        
			/*点击选项添加内容*/
			//给选中的元素添加自定义属性
			var num = 0;
			$('.sele_list ul').undelegate();
			$('.sele_list ul').delegate('a', {
				'click': function () {
					$this = $(this);
					var oCode = $this.attr("code");
					var oData = $this.parents('.sele_list').find('div').attr("data");
					$this.attr('num', num);
					$this.addClass('ac').parent().siblings().find('a').removeClass('ac');
					var oSele_li_tit = $this.parents('.sele_list').find('.sele_li_tit').text();
					var oSele_li_list = $this.text();
					var tit_index = $('.sele_li_tit').index($this.parents('.sele_list').find('.sele_li_tit'));
					//保存选中的选项往sele_c_list里添加li
					var arr = [];
					$('<li><span class="span_bor"><span data="' + tit_index + '">' + oSele_li_tit + '</span><span class="after">:</span><span class="ac">' + oSele_li_list + '</span><i class="del" data=' + oData + ' num=' + num + '></i></span></li>').appendTo($('.sele_c_list'));

					//选中的id
					num++;
					$('.sele_c_list li span:first-child').each(function () {

						//console.log($(this).attr('data'));
						if (!findInArr(arr, $(this).attr('data'))) {
							arr.push($(this).attr('data'));
						} else if (findInArr(arr, $(this).attr('data'))) {
							$(this).parent().prevAll('li').find('span[data = ' + tit_index + ']').parents('li').remove();
						}
					});
					// sele_c_list里del点击删除父级， 和自己属性一样的元素删除class
					$('.del').click(function () {
						var same = $(this).attr('num');
						$('a[num=' + same + ']').removeClass('ac');
						$(this).parents('li').remove();
						// var codeKey = $(this).attr("data");
						// $("#" + codeKey).val("ignore");
						// selectNavCallback(1);
						var codeKey = $(this).attr("data");
						$("#" + codeKey).val("ignore");
						fn1 && fn1();
					});
					// $("#" + oData).val(oCode);
					// if($("#courseTitle")){
					//     $("#courseTitle").val("ignore");
					// }
					// if($("#orgname")){
					//     $("#orgname").val("ignore");
					// }
					// if($("#name")){
					//     $("#name").val("ignore");
					// }
					// selectNavCallback(1);
					fn2 && fn2(oData, oCode);
				}
			});

			$('.sele_list .sel_more').find('span').css('cursor', 'pointer');
		}
	});
	

});
