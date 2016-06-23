define(function () {
    
    
    function SiteNewCommentGet() {
    }

    $.fn.extend({
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
        }
    });

    SiteNewCommentGet.prototype.data = function (val, evaluateReys) {
        var tab = "";
        //debugger;
        if (val.length > 0) {
            for (var k = 0; k < val.length; k++) {
                if (k < 6) {
                    var time = new Date(parseFloat(val[k].time)).format("yyyy-MM-dd hh:mm:ss");
                    /*var time = val[k].time;*/
                    var evaurl = "";
                    if (val[k].ppResId == "" || val[k].ppResId == 0 || val[k].ppResId == undefined) {
                        evaurl = "/front/sanhai/images/person.png";
                    } else {
                        evaurl = "/file/loadImage/" + val[k].ppResId + "/60/60.r";
                        //evaurl="/file/loadImage/" + val[k].ppResId + ".r?dim=60";
                    }
                    tab += "<li class='dialogItem '>" +
                        "<div class='head_img'>" +
                        "<a href='/site/student/" + val[k].userId + "/toStudentIndex.htm'><img STYLE='width:60px; height:60px;' src='" + evaurl + "'>" + val[k].userName + "</a>" +
                        /*"<a href='/site/student/23041447900806927/toStudentIndex.htm'><img STYLE='width:60px; height:60px;' src='" + evaurl + "'>" + val[k].userName + "</a>" +*/
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
                    var evaluateId = val[k].evaid;
                    var str = "";
                    var evaluateReyLength = 0;
                    if (evaluateReys.length > 0) {

                        for (var j = 0; j < evaluateReys.length; j++) {
                            var evakeyurl = "";
                            if (evaluateReys[j].ppResId == "" || evaluateReys[j].ppResId == 0 || evaluateReys[j].ppResId == undefined) {
                                evakeyurl = "/front/sanhai/images/person.png";
                            } else {
                                evakeyurl = "/file/loadImage/" + evaluateReys[j].ppResId + "/60/60.r";
                                //evakeyurl="/file/loadImage/" + evaluateReys[j].ppResId + ".r?dim=60";
                            }
                            if (evaluateReys[j].evaid == evaluateId) {
                                evaluateReyLength++;
                                var ti = new Date(parseFloat(evaluateReys[j].reTime)).format("yyyy-MM-dd hh:mm:ss");
                                /*var ti = evaluateReys[j].reTime;*/
                                str += "<dl class='clearfix'>" +
                                    "<dt><img STYLE='width:60px; height:60px;' src='" + evakeyurl + "'></dt>" +
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
                            "(<span class='bot_span'>" + evaluateReyLength + "</span>" +
                            "</a>" +
                            "</div>" +
                            "</div>" +
                            "<div class='view_reply clearfix hide'>";
                        tab += str;
                        evaluateReyLength = 0;
                    }
                    tab += "</div>" +
                        "</li>";
                } else {
                    break;
                }

            }
        }

        $("#sereva").html(tab);

        //$("#sereva").children('li').children('div:last').children('dl:last').addClass('last_dialogItem');
        $('#sereva li').each(function () {
            $(this).find('dl:last').addClass('last_dialogItem');
        });
        /*最新评论*/
            $('.dialogList').rViewReply(1);
    };

    SiteNewCommentGet.prototype.init = function () {
        var $this = this;
        $.ajax({
            url: "/site/loadIndexData.do",
            type: "post",
            dataType: "json",
            success: function (response) {
                var evaluate = response.data.evaluate.data;//最新评论
                var evaluateRey = response.data.evaluateRey;//最新回复
                $this.data(evaluate, evaluateRey);
            }
        });
    };

    return new SiteNewCommentGet()
});