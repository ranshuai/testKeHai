/**
 * Created by bbb on 2015/12/7.
 */

define(['jquery', 'common', 'money','app/site/siteMainNav','base'], function ($, common, money,siteMainNav) {

    function siteIndex() {
        this.$a=$('.tabList').eq(0).children('li').children('a');
        this.$b=$('.tabList').eq(1).children('li').children('a');
    }


    /*今日推荐*/
    siteIndex.prototype.terday = function (value) {
        var tab = "";
        //debugger;
        for (var i = 0; i < value.length; i++) {
            var val = value[i];
            var courseurl = "";
            if (val.advertiseResId == "" || val.advertiseResId == 0 || val.advertiseResId == undefined) {
                courseurl = "/front/sanhai/images/course.png";
            } else {
                // http://localhost:8080/file/loadImage/{图片ID}}/{宽度}/{高度}.r
                courseurl = "/file/loadImage/" + val.advertiseResId + "/240/135.r";
            }
            if (i % 3 == 0 && i < 6) {
                //2015-08-29 蒋淼修改
                //var price= parseFloat(val.price)/100;
                var price = money.fmoney(Number(val.price) / 100, 2);
                var orgname = val.orgEntity == null ? "" : val.orgEntity.orgName;
                var orgId = val.orgEntity == null ? "" : val.orgEntity.orgId;
                tab += " <dl>" +
                    "<dt><a href='/site/course/" + val.courseId + "/courseContent.htm'><img STYLE='width:240px; height: 135px;' src='" + courseurl + "'/></a></dt>" +
                    "<dd>" +
                    "<h5><a title='" + val.courseTitle + "' href='/site/course/" + val.courseId + "/courseContent.htm'>" + val.courseTitle + "</a></h5>" +
                    "<span class='fl'><a title='" + orgname + "' href='/site/shool/" + orgId + "/findCourseByorgId.htm'>" + orgname + "</a></span>" +
                    "<span class='red fr'>" + price + "</span>" +
                    "</dd>" +
                    "</dl>"
            } else if (i != 0 && i < 6) {
                var orgname = val.orgEntity == null ? "" : val.orgEntity.orgName;
                var orgId = val.orgEntity == null ? "" : val.orgEntity.orgId;
                //var price= parseFloat(val.price)/100;
                var price = money.fmoney(Number(val.price) / 100, 2);
                tab += " <dl>" +
                    "<dt><a href='/site/course/" + val.courseId + "/courseContent.htm'><img STYLE='width:240px; height: 135px;' src='" + courseurl + "'/></a></dt>" +
                    "<dd>" +
                    "<h5><a title='" + val.courseTitle + "' href='/site/course/" + val.courseId + "/courseContent.htm'>" + val.courseTitle + "</a></h5>" +
                    "<span class='fl'><a title='" + orgname + "' href='/site/shool/" + orgId + "/findCourseByorgId.htm'>" + orgname + "</a></span>" +
                    "<span class='red fr'>" + price + "</span>" +
                    "</dd>" +
                    "</dl>"
            } else {
                break
            }
        }
        $("#terdayCour").html(tab);
    };
    /*热门课程*/
    siteIndex.prototype.good = function (value) {
        var tab = "";
        for (var i = 0; i < value.length; i++) {
            var courseurl = "";
            var val = value[i];
            if (val.advertiseResId == "" || val.advertiseResId == 0 || val.advertiseResId == undefined) {
                courseurl = "/front/sanhai/images/course.png";
            } else {
                courseurl = "/file/loadImage/" + val.advertiseResId + "/240/135.r";
                //courseurl="/file/loadImage/" + val.advertiseResId + ".r?dim=241";
            }
            if (i % 3 == 0 && i < 6) {
                //var price= parseFloat(val.price)/100;
                var price = money.fmoney(Number(val.price) / 100, 2);
                var orgname = val.orgEntity == null ? "" : val.orgEntity.orgName;
                var orgId = val.orgEntity == null ? "" : val.orgEntity.orgId;
                tab += " <dl>" +
                    "<dt><a href='/site/course/" + val.courseId + "/courseContent.htm'><img STYLE='width:240px; height: 135px;' src='" + courseurl + "'/></a></dt>" +
                    "<dd>" +
                    "<h5><a title='" + val.courseTitle + "' href='/site/course/" + val.courseId + "/courseContent.htm'>" + val.courseTitle + "</a></h5>" +
                    "<span class='fl'><a title='" + orgname + "' href='/site/shool/" + orgId + "/findCourseByorgId.htm'>" + orgname + "</a></span>" +
                    "<span class='red fr'>" + price + "</span>" +
                    "</dd>" +
                    "</dl>"
            } else if (i != 0 && i < 6) {
                var orgname = val.orgEntity == null ? "" : val.orgEntity.orgName;
                var orgId = val.orgEntity == null ? "" : val.orgEntity.orgId;
                //var price= parseFloat(val.price)/100;
                var price = money.fmoney(Number(val.price) / 100, 2);
                tab += " <dl>" +
                    "<dt><a href='/site/course/" + val.courseId + "/courseContent.htm'><img STYLE='width:240px; height: 135px;' src='" + courseurl + "'/></a></dt>" +
                    "<dd>" +
                    "<h5><a title='" + val.courseTitle + "' href='/site/course/" + val.courseId + "/courseContent.htm'>" + val.courseTitle + "</a></h5>" +
                    "<span class='fl'><a title='" + orgname + "' href='/site/shool/" + orgId + "/findCourseByorgId.htm'>" + orgname + "</a></span>" +
                    "<span class='red fr'>" + price + "</span>" +
                    "</dd>" +
                    "</dl>"
            } else {
                break
            }


        }
        $("#goodCour").html(tab);
    };
    /*一对一课程*/
    siteIndex.prototype.onetoone = function (value) {
        var tab = "";
        for (var i = 0; i < value.length; i++) {
            if (i < 4) {
                var courseurl = "";
                var val = value[i];
                if (val.advertiseResId == "" || val.advertiseResId == 0 || val.advertiseResId == undefined) {
                    courseurl = "/front/sanhai/images/course.png";
                } else {
                    courseurl = "/file/loadImage/" + val.advertiseResId + "/240/135.r";
                }
                //var price= parseFloat(val.price)/100;
                var price = money.fmoney(Number(val.price) / 100, 2);
                var duration = parseFloat(val.duration) / 60;
                tab += "<dl>" +


                    "<dt><a href='/site/course/" + val.courseId + "/courseContent.htm'><img STYLE='width:240px; height: 135px;' src='" + courseurl + "'/></a></dt>" +
                    "<dd>" +
                    "<h5><a title='" + val.courseTitle + "' href='/site/course/" + val.courseId + "/courseContent.htm'>" + val.courseTitle + "</a></h5>" +
                    "<span class='fl'>" + duration + "课时 | " + val.buyCount + "人在学</span>" +
                    "<span class='red fr'>" + price + "</span>" +
                    "</dd>" +
                    "<dd><a href=''><!--<i></i>--></a></dd>" +
                    "</dl>";
            } else {
                break
            }


        }
        $("#onetooneCour").html(tab);
    };
    /*公共课*/
    siteIndex.prototype.publicC = function (value) {
        var tab = "";
        for (var i = 0; i < value.length; i++) {
            if (i < 4) {
                var val = value[i];
                if (val.advertiseResId == "" || val.advertiseResId == 0 || val.advertiseResId == undefined) {
                    courseurl = "/front/sanhai/images/course.png";
                } else {
                    courseurl = "/file/loadImage/" + val.advertiseResId + "/240/135.r";
                    //courseurl="/file/loadImage/" + val.advertiseResId + ".r?dim=241";
                }
                //var price= parseFloat(val.price)/100;
                var price = money.fmoney(Number(val.price) / 100, 2);
                var teaName = val.teacherEntity == null ? "无名氏" : val.teacherEntity.name;
                tab += "<dl>" +
                    "<dt><a href='/site/course/" + val.courseId + "/courseContent.htm'><img STYLE='width:240px; height: 135px;' src='" + courseurl + "'/></a></dt>" +
                    "<dd>" +
                    "<h5><a title='" + val.courseTitle + "' href='/site/course/" + val.courseId + "/courseContent.htm'>" + val.courseTitle + "</a></h5>" +
                    "<span class='fl'> 授课老师：" + teaName + "</span>" +
                    "<span class='red fr'>" + price + "</span>" +
                    "</dd>" +
                    "<dd><a href=''><i></i></a></dd>" +
                    "</dl>";
            } else {
                break
            }


        }
        $("#publicCour").html(tab);
    };

    /*通过科目查找今日推荐*/
    siteIndex.prototype.getSelecttodayContent = function (par) {
        var subjectId = "";
        var subjectType = par.text();
        var t = this;
        if ("语文" == subjectType) subjectId = "10010";
        if ("数学" == subjectType) subjectId = "10011";
        if ("英语" == subjectType) subjectId = "10012";
        if ("物理" == subjectType) subjectId = "10014";
        if ("化学" == subjectType) subjectId = "10015";

        $.ajax({
            type: "post",
            url: "/site/index/selectterdayCourBysubjectId.r",
            dataType: "json",
            data: {
                "subjectId": subjectId
            },
            success: function (result) {

                var terdayCour = result.data.terdayCour.data;//今日推荐课程
                t.terday(terdayCour);
            },
            error: function (xhr, status, error) {
                //alert("请求失败.");
            }
        });

    };
    /*根据科目查找热门课程*/
    siteIndex.prototype.getSelectGoodContent = function (par) {
        var subjectId = "";
        var subjectType = par.text();
        var t = this;
        if ("语文" == subjectType) subjectId = "10010";
        if ("数学" == subjectType) subjectId = "10011";
        if ("英语" == subjectType) subjectId = "10012";
        if ("物理" == subjectType) subjectId = "10014";
        if ("化学" == subjectType) subjectId = "10015";

        $.ajax({
            type: "post",
            url: "/site/hotCourse/" + subjectId + ".r",
            dataType: "json",
            success: function (result) {

                var goodCour = result.data.goodCour.data;//今日推荐课程
                t.good(goodCour);
            },
            error: function (xhr, status, error) {
                //alert("请求失败.");
            }
        });

    };
    /*查看最新评论*/
    siteIndex.prototype.sercheEvaluate = function (val, evaluateReys) {
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

    siteIndex.prototype.bindEvent = function () {
        var t = this;
        $.each(t.$a, function (index, value) {
            $(value).bind('mouseover', function (event) {
                t.getSelecttodayContent($(this));
            });
        });
        $.each(t.$a, function (index, value) {
            $(value).bind('click', function (event) {
                new siteMainNav().toSelectMainCourse($(this),3);
            });
        });
        $.each(t.$b, function (index, value) {
            $(value).bind('click', function (event) {
                new siteMainNav().toSelectMainCourse($(this),3);
            });
        });
        $.each(t.$b, function (index, value) {
            $(value).bind('mouseover', function (event) {
                t.getSelectGoodContent($(this))
            });
        });
    };
    siteIndex.prototype._init = function (course) {
        var t = this;
        var terdayCour = course.terdayCour.data;//今日推荐课程
        var goodCour = course.goodCour.data;//热门课程
        var onetooneCour = course.onetooneCour.data;//一对一课程
        var publicCour = course.publicCour.data;//班课
        var evaluate = course.evaluate.data;//最新评论
        var evaluateRey = course.evaluateRey;//最新回复
        t.terday(terdayCour);
        t.good(goodCour);
        t.onetoone(onetooneCour);
        t.publicC(publicCour);
        t.sercheEvaluate(evaluate, evaluateRey);
        t.bindEvent();
    };
    siteIndex.prototype.render = function (course) {
        this._init(course);
    };

    return siteIndex;

});
