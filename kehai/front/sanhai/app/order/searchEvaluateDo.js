//评价记录业务模块

define(['jquery','sanhai-evaluate', 'base'], function ($,evaluate) {



        //设置打开的菜单
        /*$("#evaluateList").trigger('click');*/
        $('.reason').mouseover(function () {
            $('.reject_reason').show();
        });
        $('.reason').mouseout(function () {
            $('.reject_reason').hide();
        });
        /*tab切换*/

        $('.tab .tabList li').click(function () {

            var index = $(this).index();

            //alert(index);
            $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
        });


        evaluateReyresult = evaluateReys;
        /*if(common.checkResponse(result) == false){
         return;
         }
         if(common.checkResponse(evaluateReys) == false){
         return;
         }*/
        /* sercheEvaluate(val,evaluateReys);*/
        var data1 = "parm=total1&";
        var url = "/evaluate/searchEvaluateByStatus.do";
        evaluate.loadevaluate1(url, data1, 1);


        var goodrate = (goodEvaluateRecordTotal / evaluateTotal).toFixed(2) * 1000/10;
        if (!isNaN(goodrate)) {
            $("#goodrate").text(goodrate + "%");
        } else {
            $("#goodrate").text("0" + "%");
        }

        score(orgScore, 'red_js3');
        score(teaScore, 'red_js2');
        score(sourceScore, 'red_js1');
        $("#avgsourceScore").text(sourceScore + "分");
        $("#avgteaScore").text(teaScore + "分");
        $("#avgorgScore").text(orgScore + "分");

        $('.all_comment').children('ul').eq(0).children('li').eq(0).children('label').text("全部评论（" + evaluateTotal + "）");
        $('.all_comment').children('ul').eq(0).children('li').eq(1).children('label').text("好评（" + goodEvaluateRecordTotal + "）");
        $('.all_comment').children('ul').eq(0).children('li').eq(2).children('label').text("中评（" + mediumEvaluateRecordTotal + "）");
        $('.all_comment').children('ul').eq(0).children('li').eq(3).children('label').text("差评（" + differenceEvaluateRecordTotal + "）");



    /*查看最新评论*/
    function sercheEvaluate(val, evaluateReys) {
        var tab = "";
        //debugger;
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


                tab += "<textarea name='' id='' placeholder='最多输入300字'></textarea>" +
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
                });
            });
        });


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
                var evaid = $this.next().val();
                var content = $this.prev('textarea').val();
                if(trim(content).length>300){
                    alert("最多输入300字");
                    return;
                }

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
                    '</dl>').insertBefore($(this).parent('.view_reply').find('textarea'));

                $this.prev('textarea').val('');
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


                    },
                    error: function (xhr, status, error) {
                        alert("请求失败.");
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


    var url = "/evaluate/searchEvaluateByStatus.do";
    function evaluate1(parm) {
        var data = "parm=" + parm + "&";
        evaluate.loadevaluate1(url, data, 1);

    }


    function cli(par) {
        if (par == 'tea') {

            var data1 = "parm=total1&";
            evaluate.loadevaluate1(url, data1, 1);

        } else if (par == 'stu') {

            var data1 = "";
            evaluate.loadstuevaluate1("/evaluate/searchEvaluateStu.do", data1, 1);
        }


    }

    $('.all_comment').find('li').eq(0).click(function(){
        evaluate1('total1')
    });
    $('.all_comment').find('li').eq(1).click(function(){
        evaluate1('good')
    });
    $('.all_comment').find('li').eq(2).click(function(){
        evaluate1('medium')
    });
    $('.all_comment').find('li').eq(3).click(function(){
        evaluate1('difference')
    });
    $('.tabList').children('li').eq(0).click(function(){
        cli('tea');
    });
    $('.tabList').children('li').eq(1).click(function(){
        cli('stu')
    });
});