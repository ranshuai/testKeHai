
define(['jquery','base'],function($){
        //客服中心hover效果
         $('.serviceList').rNavhover();
         //切换身份hover效果
         $('.tabRole').rNavhover();
        //鼠标移入li 切换
        $('.app_acc_list li').mouseenter(function(){
            //alert(1);
            var index = $(this).index();
            //alert($('.app_acc_list li').index($(this)));

            var $this = $(this);
            $this.addClass('ac').siblings('li').removeClass('ac');
            $this.parents('.app_acc').find('.app_acc_cont div:eq('+index+')').removeClass('hide').siblings('div').addClass('hide');
        });
        //轮播
        var num = 0;
        var timer = null;
        timer = setInterval(function(){
            //alert(1);
            move();
        },1500);
        function move() {
            num++;
            $('.app_acc_cont div:eq('+num%2+')').removeClass('hide').siblings('div').addClass('hide');
            $('.app_acc_list li:eq('+num%2+')').addClass('ac').siblings('li').removeClass('ac');
        };
        $('.app_acc').hover(function(){
            clearInterval(timer);
        },function(){
            timer = setInterval(function(){
                //alert(1);
                move();
            },1500);
        });
        $('.download_load_btn_1 img,.download_load_btn_3 img').hover(function(){
            var $this = $(this);
            $this.attr('src',JS_BASEURL + '/images/imgs_app/app_load/load_btn_1_hover.png')
                .css("cursor","pointer");
        },function(){
            var $this = $(this);
            $this.attr('src',JS_BASEURL +'/images/imgs_app/app_load/load_btn_1.png')
        });
        $('.download_load_btn_2 img,.download_load_btn_4 img').hover(function(){
            var $this = $(this);
            $this.attr('src', JS_BASEURL +'/images/imgs_app/app_load/load_btn_2_hover.png')
                .css("cursor","pointer");
        },function(){
            var $this = $(this);
            $this.attr('src', JS_BASEURL +'/images/imgs_app/app_load/load_btn_2.png')
        });
    //课海大学生iphone下载
    $('.download_load_btn_1').click(function(){
        window.open("https://itunes.apple.com/cn/app/ke-hai-bang-yang-da-xue-sheng/id1049209888?mt=8");
    });
    //课海大学生安卓下载
    $('.download_load_btn_2').click(function(){
        window.open("http://android.myapp.com/myapp/detail.htm?apkName=com.sanhai.bangyang");
    });
    //课海学生iphone下载
    $('.download_load_btn_3').click(function(){
        window.open("https://itunes.apple.com/cn/app/ke-hai/id1031144897?mt=8");
    });
    //课海学生安卓下载
    $('.download_load_btn_4').click(function(){
        window.open("http://android.myapp.com/myapp/detail.htm?apkName=com.sanhai.nep.student");
    });
});