/**
 * Created by bbb on 2015/12/10.
 */
define('siteVideoList', ['jquery', 'common', 'money', 'pageBar', 'dialogs', 'intoPtCourse','PTCoursePopBox', 'base'], function ($, common, money, pageBar, dialogs, intoPtCourse,PopBox) {
    /**
     * 显示数据检索过滤条
     * @param selectNavCallback
     */
    var showSelectNav = function (selectNavCallback) {
        $.each($(".sele_c_list input"), function (index, item) {
            var inputId = $(this).attr("id");
            var inputVal = $("#" + inputId).val();
            if (inputId != "courseTitle" && inputId != "orgname" && inputId != "name" && inputVal != "ignore" && inputId != "sortType"&& inputId != "theme") {
                var title = $(".sele_list div[data=" + inputId + "]").text();
                var val = $(".sele_list ul li a[code=" + inputVal + "]").eq(0).text();
                $(".sele_list ul li a[code=" + inputVal + "]").eq(0).addClass('ac');
                var tit_index = $('.sele_li_tit').index($(".sele_list ul li a[code=" + inputVal + "]").eq(0).parents('.sele_list').find('.sele_li_tit'));
                $('<li><span class="span_bor"><span data="' + tit_index + '">' + title + '</span><span class="after">:</span><span class="ac">' + val + '</span><i class="del" data=' + inputId + ' num=' + index + '></i></span></li>').appendTo($('.sele_c_list'));
                $('.del').click(function () {
                    var same = $(this).attr('num');
                    $(" a[code=" + inputVal + "]").removeClass('ac');
                    $(this).parents('li').remove();
                    var codeKey = $(this).attr("data");
                    $("#" + codeKey).val("ignore");
                    if ($("#courseTitle")) {
                        $("#courseTitle").val("ignore");
                    }
                    if ($("#orgname")) {
                        $("#orgname").val("ignore");
                    }
                    if ($("#name")) {
                        $("#name").val("ignore");
                    }
                    selectNavCallback(1);
                });
            }

        });

        /**
         * 显示多行内容时折叠与展开
         * @returns {boolean}
         */

        function findInArr(arr, num) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == num) {
                    return true;
                }
            }
            return false;
        };

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
                    var codeKey = $(this).attr("data");
                    $("#" + codeKey).val("ignore");
                    selectNavCallback(1);
                });
                $("#" + oData).val(oCode);
                if ($("#courseTitle")) {
                    $("#courseTitle").val("ignore");
                }
                if ($("#orgname")) {
                    $("#orgname").val("ignore");
                }
                if ($("#name")) {
                    $("#name").val("ignore");
                }
                selectNavCallback(1);
            }

        });

        $('.sele_list .sel_more').find('span').css('cursor', 'pointer');


    }

    /*加载题目内容*/
    var loadQuestion = function (topics) {
        $.ajax({
            url: "/site/ptcourse/loadQuestion.do",
            type: "post",
            data: {
                "topics": topics
            },
            success: function (result) {
                $('#questionData').html(result.data.question)
            }
            ,
            error: function (xhr, status, error) {
                //alert("请求失败.");
            }
        });

    }

    /**
     * 加载旁听课程信息
     * @param currPage
     */
    var loadSelectvideoCourse = function (currPage,index,oignore) {
        $("#courseCount").html('');
        $("#pageBar").html('');
        var userId = user.userId;
        var userIdentity=user.userIdentity;
        var courseTitle = encodeURI(encodeURI($("#courseTitle").val()));
        var theme = encodeURI(encodeURI($("#theme").val()));
        var url = "/site/videoCourse/" + $("#courseType").val() + "/" + $("#gradeId").val() + "/" + $("#subjectId").val() + "/" +
            $("#stuScore").val() + "/" + $("#teachTime").val() + "/" + courseTitle + "/" + $("#sortType").val() + "/" + currPage + "/"+theme+"/"+$("#searchtype").val()+"/"+$("#dataId").val()+"/selectvideoCourseList.do";

        var lode='<div class="load_wrap tc pr">'+
            '<img class="pa" src="/front/sanhai/images/loading.gif" alt=""/>'+
            '</div>';
        $("#contentDiv").html(lode);

        $.post(url, function (response, status, xhr) {
            // 是否有课程
            //console.log(response.data.list)
            if (null == response.data.list) {
                $("#contentDiv").html("没有对应课程信息");
            } else {
                $("#contentDiv").empty();
                // 默认图片
                var fileImg = "";
                /***************************推荐课程***************************************/

                var data=response.data.knowOrQuestionList;
                var sorttype=$("#searchtype").val();
                /******************************不显示短板暂时注释*******************************************/
                /*if(sorttype=='Know'&&userId != "null"&&userIdentity==2){
                    if(data!=""){
                        if($('#subjectId').val() != oignore){
                             var WPX = 0;
                            $('.login_main_l_nav').empty();
                            $('<span id="errorNum" class="pa login_error_date"></span><span class="nav_bg1 pa"><</span><span class="nav_bg2 pa">></span><div class="main_l_nav_scope pr" style="width:1050px"><ul class="main_l_nav clearfix"></ul></div>').appendTo($('.login_main_l_nav'));
                            for(var i = 0; i<data.length; i++){
                                var qid=data[i].kid
                                var qname=data[i].kpointname;
                                var list = $('<li class="pr js-li "><a href="javascript:;" class="p0_12" data="'+qid+'">'+qname+'</a></li>');
                                list.appendTo($('.login_main_l_nav .main_l_nav'));
                                 WPX+=$('.login_main_l_nav ').find('.js-li').eq(i).width();
                             };
                            $('.login_main_l_nav .main_l_nav').css('width',(WPX+2));
                        }
                        if(index==undefined){
                            $('.login_main_l_nav .main_l_nav .js-li').eq(0).find('a').addClass('orange');
                        }else{
                            $('.login_main_l_nav .main_l_nav .js-li a').removeClass('orange');
                            $('.login_main_l_nav .main_l_nav .js-li').eq(index).find('a').addClass('orange');
                        }
                        $('#errorNum').empty();
                        $('#errorNum').html("共<span class='orange' >"+data.length+"</span>个知识点</span>");
                    }else{
                        $('.login_main_l_nav .main_l_nav').empty();
                        var list = $('<li class="pr js-li "><a href="javascript:void(0);" class="p0_12" >您暂无知识点短板数据</a></li>');
                        list.appendTo($('.login_main_l_nav .main_l_nav'));
                        $('#errorNum').empty();
                        $('#errorNum').html("共<span class='orange' >0</span>个知识点</span>");
                    }

                }
                //错题选视频
                if(sorttype=='Topic'&&userId != "null"&&userIdentity==2){

                    //生成题目数据
                    if(data!=""){
                        if($('#subjectId').val() != oignore){
                            $('.login_main_l_nav').empty();
                            $('<span id="errorNum" class="pa login_error_date"></span><span class="nav_bg1 pa"><</span><span class="nav_bg2 pa">></span><div class="main_l_nav_scope pr" style="width:1050px"><ul class="main_l_nav clearfix"></ul></div>').appendTo($('.login_main_l_nav'));
                            for(var i = 0; i<data.length; i++){
                                var qid=data[i].questionId;
                                var list = $('<li class="pr js-li "><a href="javascript:;" class="p0_12" data="'+qid+'">题目'+qid+'</a></li>');
                                list.appendTo($('.login_main_l_nav .main_l_nav'));
                            };
                        }

                        if(index==undefined){
                            $('.login_main_l_nav .main_l_nav .js-li').eq(0).find('a').addClass('orange');
                        }else{
                            $('.login_main_l_nav .main_l_nav .js-li a').removeClass('orange');
                            $('.login_main_l_nav .main_l_nav .js-li').eq(index).find('a').addClass('orange');
                        }
                        //错题的数量
                        $('#errorNum').empty();
                        $('#errorNum').html("共<span class='orange' >"+data.length+"</span>道错题</span>");
                        if($("#dataId").val() == 'ignore') {
                            loadQuestion($('.login_main_l_nav .main_l_nav .js-li').eq(0).find('a').attr('data'));
                        }else{
                            loadQuestion($("#dataId").val());
                        }
                    }else{
                        $('.login_main_l_nav .main_l_nav').empty();
                        var list = $('<li class="pr js-li "><a href="javascript:void(0);" class="p0_12">您暂无题目短板数据</a></li>');
                        list.appendTo($('.login_main_l_nav .main_l_nav'));
                        //错题的数量
                        $('#errorNum').empty();
                        $('#errorNum').html("共<span class='orange' >0</span>道错题</span>");
                        $('#questionData').empty();
                    }

                }*/
                /******************************不显示短板暂时注释*******************************************/
                /**********************************************************************/
               // //console.log(response.data);

                // 遍历所有记录
               var isExistVideoCard=response.data.isExistVideoCard;
               var allBuyVideos= response.data.buyedVideos;
                $.each(response.data.list, function (index, value) {
                    if ("" != value.courseResId && null != value.courseResId && "0" != value.courseResId && undefined != value.courseResId) {
                        fileImg = "/file/loadImage/" + value.courseResId + "/180/100.r";
                    } else {
                        fileImg = "/front/sanhai/images/course.png";
                    }
                    var courseId = value.courseId;

                    var content = "<dl class='fl'>";
                    content += "<dt>";
                    content += "<a href=\"/site/videoCourse/"+value.videoId+"/detail.htm\" target=\"_blank\"><img src=" + fileImg + " ></a>";
                    content += "</dt>";
                    content += "<dd class=\"startStudy pa hide\">";
                    content +="<input type='hidden' value='" + value.videoId + "'/>";
                    if(isExistVideoCard==0){
                        content += "<a onclick='playVideo($(this))'>开始学习<i></i></a>";
                    }else{
                        if(allBuyVideos!=null&&allBuyVideos.length>0){
                            var sta=0;
                            $.each(allBuyVideos, function (index, value1) {
                                if(value1.coursesId==value.videoId){
                                    sta=1;
                                    return false;
                                }
                            })

                            if(sta==1){
                                content += "<a onclick='playVideo($(this))'>开始学习<i></i></a>";
                            }else{
                                content += "<a onclick='addShoppingCart($(this))'>加入购物车<i></i></a>";
                            }
                            sta=0;
                        }else{
                            content += "<a onclick='addShoppingCart($(this))'>加入购物车<i></i></a>";
                        }

                    }
                    content += "</dd>";
                    content += "<dd>";
                    content += "<h5 title='"+value.theme+"'><a href=\"/site/videoCourse/"+value.videoId+"/detail.htm\" target=\"_blank\">" + value.theme + "</a></h5>";
                    content += "<p class=\"clearfix\">";
                    content += "<a href=\"/site/theacher/" + value.teacherId + "/toTeacherIndex.htm\" target=\"_blank\"><span class=\"fl schName\" title='"+value.teaname +"'>主讲人：" + value.teaname + "</span></a>";
                    content += "<span class=\"fr orange\">"+ money.fmoney(value.price / 100, 2) + "</span>";
                    content += "</p>";
                    content += "<p class=\"clearfix\">";
                    if (value.schoolInfo != undefined) {
                        content += "<a href=\"/site/shool/" + value.schoolId + "/findCourseByorgId.htm\" target=\"_blank\"><span class=\"fl schName\" title=\""+(value.schoolInfo.length > 0 ? (value.schoolInfo[0].orgName != undefined ? value.schoolInfo[0].orgName : 1) : 1)+"\">学校："+ (value.schoolInfo.length > 0 ? (value.schoolInfo[0].orgName != undefined ? value.schoolInfo[0].orgName : 1) : 1) + "</span></a>";
                    }

                    content += "<span class=\"fr\">"+ (value.buyCount==''?0:value.buyCount) +"人在学</span>";
                    content += "</p>";
                    content += "</dd>";
                    content += "</dl>";
                    // 渲染
                    $("#contentDiv").append(content);

                    //视频滑鼠
                    $('.videoListMain').on('mouseenter','dl',function(){
                        $(this).children('.startStudy').slideDown();
                    }).on('mouseleave','dl',function(){
                        $(this).children('.startStudy').slideUp();
                    });
                });
                $("#courseCount").html('共筛选出<em class="orange">'+response.data.countSize+'</em>门相关课程');
                //显示分页工具条
                pageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                    //console.log("显示分页加载条: "+currPage);
                    loadSelectvideoCourse(currPage);

                })
                // alert($('.com_sel_role').children('li').size());
                var timer = null;
                $('.com_sel_role').children('li').hover(function (ev) {
                    var scrollTop = $(document).scrollTop();
                    var scrollLeft = $(document).scrollLeft();
                    var $this = $(this)
                    clearInterval(timer);
                    timer = setInterval(function () {
                        $this.find('.title_list ').removeClass('hide').css('zIndex', '1');

                        clearInterval(timer);
                    }, 500)
                }, function () {
                    clearInterval(timer);
                    $(this).find('.title_list ').addClass('hide').css('zIndex', '0');
                });

                /*加入购物车*/
                addShoppingCart = function (obj) {
                    var videoId = obj.parent('dd').children('input').val();
                    //console.log(videoId)
                    var auditFlag = 0;
                    $.ajax({
                        url: "/site/shopping/add.do",
                        type: "post",
                        dataType: "json",
                        data: {
                            courseMode: 3,
                            courseId: videoId,
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

                                //console.log("===========");

                                dialogs._timer(response.resMsg,2,2,null);
                            }
                        }
                    });
                };
                window.openWindow = function(url) {
                    //console.log("打开一个窗口");
                    var width = window.screen.availWidth;
                    var height = window.screen.availHeight;
                    var tempWindow = window.open(url, '_blank','channelmode=yes,fullscreen=no,location=0,width=' + width + ",height=" +height + ",top=0, left=0");
                    return false;
                }
                /*开始学习*/
                playVideo = function (obj) {
                    var videoId = obj.parent('dd').children('input').val();
                    $.ajax({
                        url: "/video/playBack.do",
                        type: "post",
                        data: {
                            videoId: videoId
                        },
                        dataType: "json"
                    }).success(function (response, status, xhr) {
                        if ("000" == response.resCode) {
                            var url = response.data.url;
                            if (typeof url == "undefined") return false;
                            var text_num =9;
                            var timer = null;
                            dialogs._confirm('马上进入视频，准备好了吗？还有 '+text_num+' 秒自动关闭','操作提示',function(){
                                clearInterval(timer);
                                window.openWindow(url);
                            },function(){
                                clearInterval(timer);
                            });

                            timer = setInterval(function(){
                                text_num --;
                                $('.confirm_dialog_box .popbox_item p').text('马上进入视频，准备好了吗？还有 '+text_num+'  秒自动关闭');
                                if(text_num<=0){
                                    clearInterval(timer);
                                    $('.popBox ').remove();
                                }
                            },1000);
                        } else {

                        }
                    }).fail(function (response, status, xhr) {

                    });
                };


                popBuyAudit = function (courseId,studentId,classid) {

                    //判断是否登录
                    var userId = ptCourseData.userId;
                    var userIdentity=ptCourseData.userIdentity;
                    if (userId == "null") {
                        location.href = "/login.htm";
                        return;
                    }

                    if(userIdentity!=null&&userIdentity!=2){
                        dialogs._wait("请用学生身份登录", 2);
                        return;
                    }
                    $.ajax({
                        url: "/site/ptcourse/plan/selectArrangeCourseByCourseIdAndUserId.do",
                        type: "post",
                        dataType: "json",
                        data: {
                            courseId: courseId,
                            studentId:studentId
                        },
                        success: function (response) {
                            /* if (!common.checkResponse(response)) {
                             return false;
                             }*/

                            var htmlStr = "";
                            var isBuy=false;
                            $.each(response.data.allArrangeCourseList, function (index_1, item_1) {
                                isBuy=false;
                                htmlStr += "<div class='courItem clearfix'>";
                                htmlStr += "<div class='fl' style='width:240px'>";
                                $.each(response.data.arrangeCourseList, function (index, item_2) {
                                    if(item_1.classId==item_2.classId){
                                        isBuy=true;
                                    }
                                })
                                if(isBuy==true){
                                    htmlStr += "<input type='checkbox' id='checkbox" + index_1 + "' name='classid'  disabled='disabled' value='" + item_1.classId + "' />";
                                }else{
                                    if(item_1.classId==classid){
                                        htmlStr += "<input type='checkbox' id='checkbox" + index_1 + "' name='classid'  checked value='" + item_1.classId + "' />";
                                    }else{
                                        htmlStr += "<input type='checkbox' id='checkbox" + index_1 + "' name='classid'  value='" + item_1.classId + "' />";
                                    }

                                }
                                htmlStr += "  <label for='checkbox" + index_1 + "'><strong>" + item_1.theme + "</strong></label>";
                                htmlStr += "</div>";
                                htmlStr += "<div class='fl tc' style='width:160px'>" + new Date(parseFloat(item_1.classStartTime)).format("MM-dd hh:mm") + "</div>";
                                htmlStr += "<div class='fr tl' style='width:123px'>";
                                htmlStr += "<strong class='font20 orange'>" + money.fmoney(item_1.ptPrice / 100, 2) + "</strong>";
                                htmlStr += "<input class='price' type='hidden' value="+item_1.ptPrice / 100+">";
                                htmlStr += "</div>";
                                htmlStr += "</div>";
                            });
                            $("#couserlists").html(htmlStr);
                        }
                    });

                    $('#toPay').click(function () {

                        if($("#couserlists").html()==""){
                            return;
                        }else{

                            var classids = "";
                            $("#couserlists input[type = checkbox]:checked").each(function (index) {

                                classids += $(this).val() + ",";
                            });
                            var ids = classids.substring(0, classids.length - 1);
                            if(ids==''){
                                return;
                            }
                            $("#couserlists").html("");
                            $(".popBox").dialog("close");
                            location.href = "/site/ptcourse/buyPtCourse.htm?classIds="+ids;
                        }
                    });

                }

            }
        });

    }


    soft=function (val) {
        if (val == 1) {//综合
            $("#sortType").val("100");
            loadSelectvideoCourse(1);
        }
        if (val == 2) {//人气
            $("#sortType").val("101");
            loadSelectvideoCourse(1);
        }
        if (val == 3) {//销量
            $("#sortType").val("102");
            loadSelectvideoCourse(1);
        }
        if (val == 4) {//评价
            $("#sortType").val("103");
            loadSelectvideoCourse(1);
        }
    }

    /**
     * 加载热门课程
     */
    function loadHotCourse() {
        $.ajax({
            url: "/site/hotCourse.r",
            dataType: "json",
            success: function (response) {
                if (!common.checkResponse(response)) {
                    return false;
                }
                var htmlStr = "";
                $.each(response.data.list, function (index, item) {
                    var courseurl = "";
                    if (item.advertiseResId == "" || item.advertiseResId == 0 || item.advertiseResId == undefined) {
                        courseurl = "/front/sanhai/images/course.png";
                    } else {
                        courseurl = "/file/loadImage/" + item.advertiseResId + ".r?dim=180";
                    }
                    var price = money.fmoney(Number(item.price) / 100, 2);
                    var couid = "'" + item.courseId + "'";

                });
                $("#hotCoursePanel").html(htmlStr);
            }
        });
    }


    return {
        loadSelectvideoCourse: loadSelectvideoCourse,
        showSelectNav: showSelectNav
    }

});