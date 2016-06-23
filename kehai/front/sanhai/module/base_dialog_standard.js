
/*
*和 sanhai -base-dialog-standard  文件的内容基本一样  
*
* 
 */

define('base_dialog_standard',['jquery','jquery_ui_min'],function($){
	
	var initBaseDialog=function (callback) {
	    $(".popBox").dialog({
	        autoOpen: false,
	        width: 600,
	        modal: true,
	        resizable: false,
	        close: function () {
	            callback && callback();
	            $(this).dialog("close");
	            $(this).find("button").unbind("click");
	        }
	    });
	}
	
	var defaultDialog=function (status, msg, callback) {

	    $('<div class="eject_warpper custom_dialog">' +
	        '<div class="warp_opacity"></div>' +
	        '<div class="box">' +
	        '<div class="box_content pr">' +
	        '<i style="width: 62px;height: 62px;background: url(/front/sanahi/images/ico.png) no-repeat -438px -278px; position: absolute; left: 24px;top: 50%;margin-top: -30px;"></i>' +
	        '<p>' + msg + '</p>' +
	        '</div>' +
	        ' </div>' +
	        '</div>').appendTo($('body'));
	
	    if ("success" == status) $(".box_content").addClass("box_content custom_icon_success");
	    if ("warning" == status) $(".box_content").addClass("box_content custom_icon_warning");
	    if ("error" == status) $(".box_content").addClass("box_content custom_icon_error");
	
	    $('.custom_dialog').css({
	        'width': '100%',
	        'height': '100%',
	        'position': 'fixed',
	        'top': '0',
	        'left': '0'
	    });
	
	    $('.box').css({
	        'padding': '12px',
	        'position': 'absolute',
	        'left': '50%',
	        'top': '50%',
	        'border-radius': '6px'
	    });
	
	    $('.box_content').css({
	        'width': 'auto',
	        'max-width': '400px',
	        'background': '#fff',
	        'border-radius': '6px',
	        'padding': '36px 24px 36px 96px',
	        'position': 'relative'
	    });
	
	    var left = parseInt($('.box').css('width'));
	    var top = parseInt($('.box').css('height'));
	
	    $('.box').css({'margin-left': -left / 2 + 'px', 'margin-top': -top / 2 + 'px'});
	
	    var timer = null;
	    timer = setTimeout(function () {
	        callback && callback();
	        $('.eject_warpper').remove();
	    }, 1000);
	
	    $('.eject_warpper .box').hover(function () {
	        clearTimeout(timer);
	    }, function () {
	        timer = setTimeout(function () {
	            callback && callback();
	            $('.eject_warpper').remove();
	        }, 800);
	    });
	
	}

	var baseWaitDialog=function (text, src) {

	    if ($('.establish_success_wait').length != 0) {
	        $('.eject_warpper_wait').removeClass('hide');
	    } else {
	        $("<div class='eject_warpper_wait establish_success_wait'>" +
	            "<div class='warp_opacity_wait'></div>" +
	            "<div class='box_wait'>" +
	            "<div class='box_content_wait'>" +
	            "<div style='margin:0 auto;width:62px; height:62px'>" +
	            "<img src='/front/sanhai/images/wait.gif' />" +
	            "</div>" +
	            "<div style='margin:10px auto'>" +
	            "<p>" + text + "</p>" +
	            "</div>" +
	            "</div>" +
	            "</div>" +
	            "</div>"
	        ).appendTo($("body"));
	
	        $('.establish_success_wait').css({
	            'width': '100%',
	            'height': '100%',
	            'position': 'fixed',
	            'top': '0',
	            'left': '0'
	        });
	        $('.warp_opacity_wait').css({
	            'width': '100%',
	            'height': '100%',
	            'background': '#000',
	            'opacity': '0.3',
	            'filter': 'alpha(opacity=30)'
	        });
	
	        $('.box_wait').css({
	            'padding': '12px',
	            'position': 'absolute',
	            'left': '50%',
	            'top': '50%',
	            'border-radius': '6px'
	        });
	
	        $('.box_content_wait').css({
	            'width': 'auto',
	            'max-width': '400px',
	            'background': '#fff',
	            'border-radius': '6px',
	            'padding': '45px',
	            'position': 'relative'
	        });
	        var num1 = parseInt($('.box_wait').css('width'));
	        var num2 = parseInt($('.box_wait').css('height'));
	        $('.box_wait').css({'margin-left': -num1 / 2 + 'px', 'margin-top': -num2 / 2 + 'px'});
	    }
	}
	
	
	return{
		initBaseDialog:initBaseDialog,
		defaultDialog:defaultDialog,
		baseWaitDialog:baseWaitDialog
	}
		
	
})
