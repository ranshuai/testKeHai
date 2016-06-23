/**
 * Created by bbb on 2015/12/11.
 */

define([
        'jquery',
        'loadHotCourse',
        'sanhai_evaluate',
        'money',
        'pageBar',
        'dialogs',
        'common',
        'base',
        'jquery_ui_min'
    ],

    function ($, loadHotCourse, sanhai_evaluate, money, pageBar,dialogs,common) {

        function courseDetailsDo() {

        }

        courseDetailsDo.prototype.init = function () {
            /*只有学生身份显示购物车*/
            if(user.userIdentity==2){
                $('.shopping_car').removeClass('hide');
            }
            var t = this;
            /*tab切换*/
            $('.tab .tabList li').click(function () {
                var index = $(this).index();
                $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
                $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
            });
            $('.popBox').dialog({
                autoOpen: false,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).dialog("close")
                }
            });

            $('.pushBtnJs').click(function () {
                var courseMode = $(this).parent('div').children('input').eq(0).val();
                var courseId = $(this).parent('div').children('input').eq(1).val();
                $("#pushNotice").dialog("open");

                $('#courseMode1').val(courseMode);
                $('#courseId').val(courseId);
                return false;
            });
            $('.push_btnJs').click(function () {
                $("#push_notice").dialog("open");
                return false;
            });
            $('.cancelBtn').click(function () {

                $(".pushNotice").dialog("close");
            });
            (function () {
                var aView_reply = $('.view_reply');
                var aA = $('.bottom_r a');
                var aSpan = $('.bottom_r').find('span');
                aA.toggle(function () {
                    var $this = $(this);
                    $this.addClass('ac');
                    aView_reply.eq(aA.index($this)).removeClass('hide');
                    $this.children('em').text('回复收起');
                }, function () {
                    var $this = $(this);
                    var num = $this.children('.bot_span').text();
                    //alert(num);
                    $this.removeClass('ac');
                    aView_reply.eq(aA.index($this)).addClass('hide');
                    $this.children('em').text('查看回复');
                    $this.children('.bot_span').text(num);
                });
            })();
            /****************************************************************/

            //客服中心hover效果
            $('.serviceList').rNavhover();
            //切换身份hover效果
            $('.tabRole').rNavhover();
            //切换机构身份
            $('.select_type_List').rSetUpTab();

            $('.subTitleBar_text1').placeholder({value: '请输入课程名称、关键词等...'})
            $('.reason').mouseover(function () {
                $('.reject_reason').show();
            });
            $('.reason').mouseout(function () {
                $('.reject_reason').hide();
            });
            /*********************************************************************/
            $("#content").find("td").eq(7).text(courseDeataildata.duration + "小时");
            $("#content").find("td").eq(1).text(courseDeataildata.grade);
            $("#content").find("td").eq(3).text(courseDeataildata.subject);
            $("#content").find("td").eq(9).find("span").eq(0).text(money.fmoney(Number(courseDeataildata.price) / 100, 2));
            if (0 == courseDeataildata.advertiseResId) $("#fileImg").attr("src", "/front/sanhai/images/course.png");
            if (0 != courseDeataildata.advertiseResId) $("#fileImg").attr("src", "/file/loadImage/" + courseDeataildata.advertiseResId + "/350/200.r");

            aLLcourseId = courseDeataildata.courseallid;
            orgidid = courseDeataildata.orgiiiid;
            var course = courseDeataildata.data;
            var evaluateRey = course.data.evaluateRey;//最新回复
            evaluateReyresult = evaluateRey;
            var goodEvaluateRecordTotal = courseDeataildata.goodEvaluateRecordTotal;
            var evaluateTotal = courseDeataildata.evaluateTotal;
            var goodrate = new Number((goodEvaluateRecordTotal / evaluateTotal)).toFixed(2) * 1000/10;
            var data = "courseId=" + aLLcourseId + "&parm=total1&";
            t.loadonetooneevaluate1(url, data, 1);
            if (!isNaN(goodrate)) {
                $("#goodrate").text(goodrate + "%");
                $("#goodrate1").text(goodrate + "%");
            } else {
                $("#goodrate").text("0" + "%");
                $("#goodrate1").text("0" + "%");
            }
            var orgScore = courseDeataildata.avgorgScore;
            var teaScore = courseDeataildata.avgteaScore;
            var sourceScore = courseDeataildata.avgsourceScore;
            //console.log(orgScore);
            score(orgScore, 'red_js3');
            score(teaScore, 'red_js2');
            score(sourceScore, 'red_js1');
            $("#avgsourceScore").text(sourceScore + "分");
            $("#avgteaScore").text(teaScore + "分");
            $("#avgorgScore").text(orgScore + "分");
            $("#avgsourceScore1").text(sourceScore + "分");
            $("#avgteaScore1").text(teaScore + "分");
            $("#avgorgScore1").text(orgScore + "分");
            var evaluateTotal = courseDeataildata.evaluateTotal;
            var goodEvaluateRecordTotal = courseDeataildata.goodEvaluateRecordTotal;
            var mediumEvaluateRecordTotal = courseDeataildata.mediumEvaluateRecordTotal;
            var differenceEvaluateRecordTotal = courseDeataildata.differenceEvaluateRecordTotal;
            $('.all_comment').children('ul').eq(0).children('li').eq(0).children('label').text("全部评论（" + evaluateTotal + "）");
            $('.all_comment').children('ul').eq(0).children('li').eq(1).children('label').text("好评（" + goodEvaluateRecordTotal + "）");
            $('.all_comment').children('ul').eq(0).children('li').eq(2).children('label').text("中评（" + mediumEvaluateRecordTotal + "）");
            $('.all_comment').children('ul').eq(0).children('li').eq(3).children('label').text("差评（" + differenceEvaluateRecordTotal + "）");

            var Imgarray = document.getElementById('editor').getElementsByTagName('img');
            var realWidth;//真实的宽度
            var realHeight;//真实的高度
            for(var i =0;i<Imgarray.length;i++) {
                var imgtemp = new Image();//创建一个image对象
                imgtemp.src = Imgarray[i].src;
                imgtemp.index = i;//指定一个检索值，用于确定是哪张图
                imgtemp.onload = function () {//图片加载完成后执行
                    var _stemp = this;//将当前指针复制给新的变量，不然会导致变量共用
                    realWidth = this.width;
                    realHeight = this.height;
                    if (realWidth >=600) {
                        Imgarray[_stemp.index].style.width = 600 + 'px';
                        Imgarray[_stemp.index].style.height = 'auto';
                    }
                }

            }
        };

        courseDetailsDo.prototype.continueCourse = function () { //继续选课
            var courseMode = $('#courseMode1').val();
            var courseId = $('#courseId').val();
            var auditFlag = 0;
            var remark = $('#notice_textarea').val();
            $.ajax({
                url: "/orderDeal/add.do",
                type: "post",
                dataType: "json",
                data: {
                    courseMode: courseMode,
                    courseId: courseId,
                    auditFlag: auditFlag,
                    remark: remark
                },
                success: function (response) {

                    //console.log(response.resCode);

                    if ("000" == response.resCode) {
                        $('#notice_textarea').val("");
                        $(".pushNotice").dialog("close");
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                        $('#notice_textarea').val("");
                        $(".pushNotice").dialog("close");
                    } else if ("300" == response.resCode) {
                        // 2015-10-16 蒋淼修改中在add.do中校验只有学生用户可以加入购物车
                        dialogs._timer( response.resMsg, 2,2,null);
                        //dialog.defaultDialog("warning", response.resMsg, null);
                    } else {
                        $('#notice_textarea').val("");
                        window.location.href = "/site/course/selectCourse.htm";
                    }

                }
            });
        };
        courseDetailsDo.prototype.payCourse = function () {//去购物车结算
            var courseMode = $('#courseMode1').val();
            var courseId = $('#courseId').val();
            var auditFlag = 0;
            var remark = $('#notice_textarea').val();
            $.ajax({
                url: "/orderDeal/add.do",
                type: "post",
                dataType: "json",
                data: {
                    courseMode: courseMode,
                    courseId: courseId,
                    auditFlag: auditFlag,
                    remark: remark
                },
                success: function (response) {
                    if ("000" == response.resCode) {

                        window.location.href = "/shopping/shoppingCoureses.htm";
                        $('#notice_textarea').val("");
                        $(".pushNotice").dialog("close");
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                        $('#notice_textarea').val("");
                        $(".pushNotice").dialog("close");
                    }
                    // 2015-10-16 蒋淼修改中在add.do中校验只有学生用户可以加入购物车
                    if ("300" == response.resCode) {
                        dialogs._timer( response.resMsg, 2,2,null);
                       // dialog.defaultDialog("warning", response.resMsg, null);
                    }
                }
            });
        };
        /*加入购物车*/
        addShoppingCart = function (obj) {
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
                        dialogs._shoppingcar(function () {

                        }, function () {
                            window.location.href = "/shopping/shoppingCoureses.htm";
                        });
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                        $('#notice_textarea').val("");
                        $(".pushNotice").dialog("close");
                    }
                    // 2015-10-16 蒋淼修改中在add.do中校验只有学生用户可以加入购物车
                    if ("300" == response.resCode) {
                         dialogs._timer( response.resMsg, 2,2,null);
                        //dialog.defaultDialog("warning", response.resMsg, null);
                    }
                }
            });
        };
        topay = function (obj) {//直接支付
            var courseMode = obj.parent('div').children('input').eq(0).val();
            var courseId = obj.parent('div').children('input').eq(1).val();
            var auditFlag = 0;
            $.ajax({
                url: "/site/shopping/toPay.do",
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

                        var orderid = response.data.orderId;
                        var coursesName = response.data.coursesName;
                        var cousData = orderid;
                        var shoppingcount = 1;
                        var paymoney = response.data.couresePrice;
                        window.location.href = "/shopping/shoppingCarTrade.htm?tradeOrder=" + orderid;
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                        $(".pushNotice").dialog("close");
                    }
                    // 2015-10-16 蒋淼修改中在add.do中校验只有学生用户可以加入购物车
                    if ("300" == response.resCode) {
                         dialogs._timer( response.resMsg, 2,2,null);
                       // dialog.defaultDialog("warning", response.resMsg, null);

                    }
                }
            });
        };
        courseDetailsDo.prototype.toShopping = function (courseId, courseMode, auditFlag, remark) {
            $.ajax({
                url: "/orderDeal/add.do",
                type: "post",
                dataType: "json",
                data: {
                    courseMode: courseMode,
                    courseId: courseId,
                    auditFlag: auditFlag,
                    remark: remark
                },
                success: function (response) {

                    //console.log(response.resCode);

                    if ("000" == response.resCode) alert("加入购物车");
                    if ("200" == response.resCode) window.location.href = "/login.htm";
                }
            });
        };

        courseDetailsDo.prototype.loadonetooneevaluate1 = function (url, data, currPage) {
            var t = this;
            var a = data;
            data += "currentPage=" + currPage;
            //console.log(a);
            //console.log(data)
            $.ajax({
                url: url,
                data: data,
                type: "post",
                success: function (result) {

                    /*  if (common.checkResponse(result) == false) {
                     return;
                     }
                     if (common.checkResponse(evaluateReyresult) == false) {
                     return;
                     }*/

                    /*   //console.log(result.data);

                     //console.log(result.data.pageSize);*/
                    //console.log(result);
                    var val = result.data.rows;//评论记录
                    t.sercheEvaluate(val, evaluateReyresult);
                    var params = new Array();
                    params.push("/site/course/searchEvaluateBymodel.do");
                    params.push(a);
                    //console.log("------------------");
                    //console.log("totalPages-->" + result.data.totalPages);
                    //console.log("currPage-->" + result.data.currPage);
                    //console.log("------------------");
                    pageBar.setBasePageBar(result.data.totalPages, result.data.currPage, t.loadonetooneevaluate1, params);

                }
                ,
                error: function (xhr, status, error) {
                    //alert("请求失败.");
                }
            });

        }


        /*查看最新评论*/
        courseDetailsDo.prototype.sercheEvaluate = function (val, evaluateReys) {
            var tab = "";
            //debugger;
            if (val.length > 0) {
                for (var k = 0; k < val.length; k++) {
                    if (k < 6) {
                        var time = new Date(parseFloat(val[k].time)).format("yyyy-MM-dd hh:mm:ss");
                        /*var time = val[k].time;*/
                        var evaurl = "";
                        if (val[k].ppResId == "" || val[k].ppResId == 0) {
                            evaurl = "/front/sanhai/images/person.png";
                        } else {
                            evaurl = "/file/loadImage/" + val[k].ppResId + "/60/60.r";
                        }
                        tab += "<li class='dialogItem '>" +
                            "<div class='head_img'>" +
                            "<a href='/site/student/" + val[k].userId + "/toStudentIndex.htm'><img STYLE='width:60px; height:60px;' src='" + evaurl + "'>" + val[k].userName + "</a>" +
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
                                /*"<span>" + time + "</span>&nbsp;&nbsp;&nbsp;<span><a href='/site/course/" + val[k].courseId + "/courseContent.htm'>《" + val[k].courseName + "》</a></span>";*/
                            "<span>" + time + "</span>";

                        if (evaluateReys.length > 0) {
                            var evaluateId = val[k].evaid;
                            var str = "";
                            var evaluateReyLength = 0;
                            for (var j = 0; j < evaluateReys.length; j++) {
                                var evakeyurl = "";
                                if (val[k].ppResId == "" || val[k].ppResId == 0) {
                                    evakeyurl = "/front/sanhai/images/person.png";
                                } else {
                                    evakeyurl = "/file/loadImage/" + evaluateReys[j].ppResId + "/60/60.r";
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
                                "<span class='bot_span'>(" + evaluateReyLength + ")</span>" +
                                "</a>" +
                                "</div>" +
                                "</div>" +
                                "<div class='view_reply hide'>";
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

            $('#sereva li').each(function () {
                $(this).find('dl:last').addClass('last_dialogItem');
            });

            /*最新评论*/
            $('.dialogList li').each(function (i) {
                var $this = $(this);
                $(this).find('.bottom_r a').click(function () {
                    var num = $this.find('.bot_span').text().substring(1, $this.find('.bot_span').text().length - 1);
                    if (num == 0) return false;
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
                    $(document).click(function () {
                        $('.view_reply').addClass('hide');
                        $('.bottom_r').find('em').text('查看回复');
                        $('.bottom_r').children('a').removeClass('ac');
                    });
                    return false;
                });
            });

        };

        getSubjectId = function (subject) {
            switch (subject) {
                case "语文":
                    return "10010";
                case "数学":
                    return "10011";
                case "英语":
                    return "10012";
                case "生物":
                    return "10013";
                case "物理":
                    return "10014";
                case "化学":
                    return "10015";
                case "地理":
                    return "10016";
                case "历史":
                    return "10017";
                case "政治":
                    return "10018";
                case "品德与生活":
                    return "10019";
                case "美术":
                    return "10020";
                case "音乐":
                    return "10021";
                case "体育":
                    return "10022";
                case "信息技术":
                    return "10023";
                case "法制":
                    return "10024";
                case "综合实践":
                    return "10025";
                case "科学":
                    return "10026";
                case "理综":
                    return "10027";
                case "文综":
                    return "10028";
                case "思想品德":
                    return "10029";
                case "一年级":
                    return "1001";
                case "二年级":
                    return "1002";
                case "三年级":
                    return "1003";
                case "四年级":
                    return "1004";
                case "五年级":
                    return "1005";
                case "六年级":
                    return "1006";
                case "预初":
                    return "1007";
                case "初一":
                    return "1008";
                case "初二":
                    return "1009";
                case "初三":
                    return "1010";
                case "高一":
                    return "1011";
                case "高二":
                    return "1012";
                case "高三":
                    return "1013";
                default :
                    return "";
            }
        };
        /**
         * 收藏课程
         * @param courseId
         * @param coursemode
         */
        collection = function (val, courseId, coursemode) {
            //alert(courseId+" "+coursemode)
            $.ajax({
                url: "/collection/intoCollection.do",
                type: "post",
                dataType: "json",
                data: {
                    courseId: courseId,
                    courseMode: coursemode
                },
                success: function (response) {

                    //console.log(response.resCode);

                    if ("000" == response.resCode) {
                        Kh.collectHeart(val);
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


        /**
         * 首页左侧菜单事件
         * @param content   事件触发元素
         * @param level     菜单级别 1 = 第一级；2 = 第二级
         */
        toSelectMainCourse = function (content) {
            var subjectId = getSubjectId(content.text());
            var url = "/site/course/ignore/" + subjectId + "/courseTransfer.htm";
            location.href = url;
        }

        toSelectMainCourse1 = function (content) {
            var subjectId = getSubjectId(content.text());
            var url = "/site/course/ignore/" + subjectId + "/ignore/ignore/ignore/ignore/courseTransfer.htm";
            location.href = url;
        }

        courseDetailsDo.prototype.evaluate1 = function (parm) {
            var t = this;
            var data = "courseId=" + aLLcourseId + "&parm=" + parm + "&";
            t.loadonetooneevaluate1(url, data, 1);
        };

        courseDetailsDo.prototype.bindEvent = function () {
            var t = this;
            $('.all_comments').children('li').eq(0).bind('click', function (event) {
                t.evaluate1('total1');
            });
            $('.all_comments').children('li').eq(1).bind('click', function (event) {
                t.evaluate1('good');
            });
            $('.all_comments').children('li').eq(2).bind('click', function (event) {
                t.evaluate1('medium');
            });
            $('.all_comments').children('li').eq(3).bind('click', function (event) {
                t.evaluate1('difference');
            });
        };

        courseDetailsDo.prototype._init = function () {
            var t = this;
            t.init();
            t.bindEvent();
            loadHotCourse.loadHotCourse();
        };
        courseDetailsDo.prototype.render = function () {
            this._init();
        };
        return courseDetailsDo;
    }
);