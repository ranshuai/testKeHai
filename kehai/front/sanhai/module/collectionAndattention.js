/**
 * 增加关注
 * @param val
 * @param orgid
 * @param attentiontype
 */

define(["jquery","common","pageBar","money"],
    function($,common,PageBar,money){

        function CollectionAndattention(){
            this.obje=null;
            this.attentiontype="";
        }

        /**
         * 展现关注学校
         * @param currPage
         * @param Attentiontype
         */
        CollectionAndattention.prototype.loadAttentionorgList = function (currPage) {
            $('.tabList').children('li').eq(0).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            attentiontype="org";
            var arraObj = new Array();
            var arrayscore = new Array();
            $.ajax({
                url: "/attention/loadAttentionList.do",
                type: "post",
                dataType: "json",
                data: {
                    currentPage: currPage,
                    Attentiontype: "org"
                },
                success: function (response) {
                    if (!common.checkResponse(response)) {
                        return false;
                    }

                    var htmlStr = "";
                    $.each(response.data.list, function (index, item) {

                        htmlStr += "<div class='attention_org clearfix'>";
                        htmlStr += "   <div class='org_logo fl'>";
                        if (item.ppResId && item.ppResId != 0&& item.ppResId != undefined) {
                            htmlStr += '        <a href="/site/shool/' + item.attentionObjId + '/findCourseByorgId.htm"><img style="width:120px;height:80px;" src="/file/loadImage/' + item.ppResId + '.r?dim=120" alt="学校logo"></a>';
                        } else {
                            htmlStr += '        <a href="/site/shool/' + item.attentionObjId + '/findCourseByorgId.htm"><img style="width:120px;height:80px;" src="/front/sanhai/images/person.png" alt="学校logo"></a>';
                        }
                        htmlStr += "  </div>";
                        htmlStr += "  <div class='org_detail fl'>";
                        htmlStr += "  <input type='hidden' value='" + item.attentionObjId + "'/>";
                        htmlStr += "  <h3>" + item.orgName + " <button class='no_attention pushBtnJs_agree'>取消关注</button></h3>";
                        htmlStr += "<span class='evaluationsMain'>";
                        htmlStr += "  <ul class='score_ul evaluationSmall p_right fl'>";
                        htmlStr += " <li>";
                        htmlStr += " <span class='score'>";
                        htmlStr += " <div class='gray_js'></div>";
                        htmlStr += " <div class='red_js"+index+" red_js' style='width: 44px;'></div>";
                        htmlStr += " </span>";
                        htmlStr += " <em id='avgsourceScore1'>" + ((!item.orgScore)||(item.orgScore=="") ? "5.0" :parseFloat(item.orgScore).toFixed(1) ) +"分</em>";
                        htmlStr += " </li>";
                        htmlStr += "</ul>";
                        htmlStr += " </span>";
                        htmlStr += "<p>在售课程:";
                        $.each(item.courseList, function (c_index, c_item) {
                            htmlStr += "<a href='/site/course/" + c_item.courseId + "/courseContent.htm' >《" + c_item.courseTitle + "》</a>";
                        });
                        htmlStr += "</p>";
                        htmlStr += "</div>";
                        htmlStr += "<div class='fr org_buttons'><button class='go_consult' onclick=\"window.open(\'/consult/chat.htm?type=org&typeId="+item.attentionObjId+"\',\'\',\'height=730,width=900\');\">去咨询</button></div>";
                        htmlStr += "</div>";
                        arraObj.push("red_js"+index);
                        arrayscore.push(((!item.orgScore)||(item.orgScore=="") ? "5.0" :parseFloat(item.orgScore).toFixed(1) ));
                    });
                    $("#collectionorg").html(htmlStr);
                    for(var m=0;m<arraObj.length;m++){
                        score_small(arrayscore[m],arraObj[m]);
                    }
                    //显示分页工具条
                    PageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                        new CollectionAndattention().loadAttentionorgList(currPage)
                    });

                    /*弹窗初始化*/
                    $('.popBox').dialog({
                        autoOpen: false,
                        width: 600,
                        modal: true,
                        resizable: false,
                        close: function() {
                            $(this).dialog("close")
                        }
                    });
                    /*驳回申请*/
                    $('.pushBtnJs').click(function() {
                        $("#pushNotice").dialog("open");
                        return false;
                    });
                    /*同意申请*/
                    $('.pushBtnJs_agree').click(function() {
                        obje=$(this);
                        var id = $(this).parent('h3').parent('div').children('input').val();
                        $("#pushNotice_agree").dialog("open");
                        $('#ObjId').val(id);
                        $('#conte').text("是否要取消你关注的学校？取消后可就找不到了哦！");
                        return false;
                    });
                    //清除选项
                    $('.cancelBtn').click(function() {

                        $(".pushNotice,.pushNotice_agree").dialog("close");
                    })


                }
            });
        };

        /**
         * 展现关注老师
         * @param currPage
         * @param Attentiontype
         */
        CollectionAndattention.prototype.loadAttentionteaList = function (currPage){
            $('.tabList').children('li').eq(1).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            attentiontype="tea";
            $.ajax({
                url: "/attention/loadAttentionList.do",
                type: "post",
                dataType: "json",
                data: {
                    currentPage: currPage,
                    Attentiontype: "tea"
                },
                success: function (response) {
                    if (!common.checkResponse(response)) {
                        return false;
                    }
                    var htmlStr = "";

                    $.each(response.data.list, function (index, item) {
                        htmlStr += "<div class='attention_tea clearfix'>";
                        htmlStr += "<div class='tea_logo fl'>";
                        if (item.ppResId&&item.ppResId!=undefined&&item.ppResId!=0) {
                            htmlStr += "<a href='/site/theacher/" + item.attentionObjId + "/toTeacherIndex.htm'><img src='/file/loadImage/" + item.ppResId + ".r?dim=95' alt='老师头像'></a>";
                        } else {
                            htmlStr += "<a href='/site/theacher/" + item.attentionObjId + "/toTeacherIndex.htm'><img src='/front/sanhai/images/person.png' alt='老师头像'></a>";
                        }
                        htmlStr += "  <input type='hidden' value='" + item.attentionObjId + "'/>";
                        htmlStr += "<button class='no_attention pushBtnJs_agree'>取消关注</button>";
                        htmlStr += "</div>";
                        htmlStr += "<div class='tea_detail fl'>";
                        htmlStr += "<h4><a href='/site/theacher/" + item.attentionObjId + "/toTeacherIndex.htm' class='tc_name'>" + item.name + "</a><span>" + ((item.seniority) ? item.seniority : 1) + "年教龄</span></h4>";
                        htmlStr += "<div><i class='td1'></i><i class='td2'></i><i class='td3'></i><i class='td4'></i></div>";
                        htmlStr += "<h4><i class='att_sch'></i><a href='/site/shool/" + item.orgId + "/findCourseByorgId.htm' class='sc_name'><i></i><span>" + item.orgName + "</span></a></h4>";
                        htmlStr += "<p><i class='att_class'></i><span>" + ((item.courseCode) ? common.df.dataCode(item.courseCode) : "教授多个科目") + "</span><span>  授课时长：" + ((item.workHour && item.workHour + "" != "") ? parseFloat(item.workHour)/60 : 0).toFixed(2) + "小时</span><span> 学生：" + ((item.orderNum) ? item.orderNum : 0) + "人</span></p>";
                        htmlStr += "<p><i class='att_course'></i>在线课程：";
                        $.each(item.courseList, function (c_index, c_item) {
                            htmlStr += "<a href='/site/course/" + c_item.courseId + "/courseContent.htm' >《" + c_item.courseTitle + "》</a>";
                        });
                        htmlStr += "</p>";
                        htmlStr += "</div>";
                        htmlStr += "<div class='fr org_buttons'><button class='go_consult' onclick=\"window.open('/consult/chat.htm?type=teacher&typeId="+item.attentionObjId+"','','height=730,width=900');\">去咨询</button></div>";
                        htmlStr += "</div>";
                    });
                    $("#collectionorg").html(htmlStr);
                    //显示分页工具条
                    PageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                        new CollectionAndattention().loadAttentionteaList(currPage)
                    });
                    /*弹窗初始化*/
                    $('.popBox').dialog({
                        autoOpen: false,
                        width: 600,
                        modal: true,
                        resizable: false,
                        close: function() {
                            $(this).dialog("close")
                        }
                    });
                    /*驳回申请*/
                    $('.pushBtnJs').click(function() {
                        $("#pushNotice").dialog("open");
                        return false;
                    });
                    /*同意申请*/
                    $('.pushBtnJs_agree').click(function() {
                        obje=$(this);
                        var id = $(this).parent('div').children('input').val();
                        $("#pushNotice_agree").dialog("open");
                        $('#ObjId').val(id);
                        $('#conte').text("是否要取消你关注的老师？取消后可就找不到了哦！");
                        return false;
                    });
                    //清除选项
                    $('.cancelBtn').click(function() {

                        $(".pushNotice,.pushNotice_agree").dialog("close");
                    })
                }

            });
        }

        /**
         * 加载收藏
         * @param currPage 当前页
         * @param coursetype课程类型
         */
        CollectionAndattention.prototype.loadCollection = function (currPage,coursetype){
            $.ajax({
                url: "/collection/loadCollectionList.do",
                type: "post",
                dataType: "json",
                data: {
                    currentPage: currPage,
                    coursetype: coursetype
                },
                success: function (response) {
                    if (!common.checkResponse(response)) {
                        return false;
                    }
                    var htmlStr = "";
                    if(response.data.list==""||response.data.list==undefined){

                        if(coursetype==2){
                            htmlStr += "<p class='careful_l'><i></i>您还没有收藏的课程哦，想要充充电，快<a href='/site/ptcourse/selectCourse.htm'>去逛逛></a></p>"
                        }else{
                            htmlStr += "<p class='careful_l'><i></i>您还没有收藏的课程哦，想要充充电，快<a href='/site/course/selectCourse.htm'>去逛逛></a></p>"
                        }

                    }
                    $.each(response.data.list, function (index, item) {
                        var price = money.fmoney(Number(item.price)/100,2);
                        var des=item.des&&item.des!=""&&item.des.length>15?item.des.substr(0,16)+"...":item.des;
                        htmlStr += "<div class='main_l_nav_cont_row clearfix'>";
                        htmlStr += "<dl class='fl'>";
                        htmlStr += "<dt class='fl pr'>";
                        if ("" != item.advertiseResId && null != item.advertiseResId && "0" != item.advertiseResId&& undefined != item.advertiseResId){
                            htmlStr += "<a href='/site/course/" + item.courseId + "/courseContent.htm'><img src='/file/loadImage/" + item.advertiseResId+ ".r?dim=180' alt='" + item.courseTitle + "' title='" + item.courseTitle + "'></a>";
                        }else{
                            htmlStr += "<a href='/site/course/" + item.courseId + "/courseContent.htm'><img src='/front/sanhai/images/course.png' alt='" + item.courseTitle + "' title='" + item.courseTitle + "'></a>";
                        }
                        htmlStr += "  <input type='hidden' value='" + item.courseId + "'/>";
                        htmlStr += "<i class='pa cancel_collect pushBtnJs_agree'></i>";
                        htmlStr += "</dt>";
                        htmlStr += "<dd class='fl'>";
                        htmlStr += "<div class='class_detail fl'>";
                        htmlStr += "<h3><a href='/site/course/" + item.courseId + "/courseContent.htm'>" + item.courseTitle + "</a><em>"+(item.courseMode==0?'一对一':'班课')+"</em></h3>";
                        htmlStr += "<p class='class_money clearfix'><strong>"+price+"</strong><em>共" + item.duration + "课时</em></p>";
                        htmlStr += "<p class='class_money clearfix'><span class='fl'>学校：" + item.orgName + "</span></p>";
                        htmlStr += "<p class='ellipsis' title='最快的提分战略习题'>简介：" + item.des + "</p>";
                        htmlStr += "</div>";
                        htmlStr += "</dd>";
                        htmlStr += "</dl>";
                        htmlStr += "<div class='fr the_last_div'>";
                        htmlStr += "<button type='button' class='to_ask' onclick=\"window.open('/consult/chat.htm?type=course&typeId="+item.courseId+"','','height=730,width=900');\">去咨询</button>";
                        htmlStr += "  <input type='hidden' value='" + item.courseId + "'/>";
                        htmlStr += "  <input type='hidden' value='" + item.courseMode + "'/>";
                        htmlStr += "<a href='#' onclick='topay($(this))'>立即购买</a>";
                        htmlStr += "</div>";
                        htmlStr += "</div>";
                    });
                    $("#collectionCourse").html(htmlStr);
                    //显示分页工具条
                    PageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                        new CollectionAndattention().loadCollection(currPage,coursetype)
                    });

                    /*弹窗初始化*/
                    $('.popBox').dialog({
                        autoOpen: false,
                        width: 600,
                        modal: true,
                        resizable: false,
                        close: function() {
                            $(this).dialog("close")
                        }
                    });
                    /*同意申请*/
                    $('.pushBtnJs_agree').click(function() {
                        obje=$(this);
                        var id = $(this).parent('dt').children('input').val();
                        $("#pushNotice_agree").dialog("open");
                        $('#courseid').val(id);
                        return false;
                    });

                    $('.push_btnJs').click(function () {
                        var coueseId = $(this).parent('div').children('input').eq(0).val();
                        var courseMode = $(this).parent('div').children('input').eq(1).val();
                        $("#push_notice").dialog("open");
                        $('#coueseId').val(coueseId);
                        $('#courseMode').val(courseMode);
                        return false;
                    });
                    //清除选项
                    $('.cancelBtn').click(function() {

                        $(".pushNotice,.pushNotice_agree,").dialog("close");
                    })

                    $('.tab .main_l_nav_cont_row').mouseover(function(){
                        $(this).find('i').css('display','block');


                    }).mouseout(function(){
                        $(this).find('i').css('display','none');
                    })
                }


            });
        }

        /**
         * 展现关注学生
         * @param currPage
         * @param Attentiontype
         */
        CollectionAndattention.prototype.loadAttentionstuList = function (currPage){
            $('.tabList').children('li').eq(2).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            attentiontype="stu";
            $.ajax({
                url: "/attention/loadAttentionList.do",
                type: "post",
                dataType: "json",
                data: {
                    currentPage: currPage,
                    Attentiontype: "stu"
                },
                success: function (response) {
                    if (!common.checkResponse(response)) {
                        return false;
                    }
                    var htmlStr = "";

                    $.each(response.data.list, function (index, item) {
                        htmlStr += "<div class='attention_stu clearfix'>";
                        htmlStr += "<div class='stu_logo fl'>";
                        if (item.ppResId&&item.ppResId!=undefined&&item.ppResId!=0) {
                            htmlStr += "<a href='/site/student/" + item.attentionObjId + "/toStudentIndex.htm'><img src='/file/loadImage/" + item.ppResId + ".r?dim=95' alt='老师头像'></a>";
                        } else {
                            htmlStr += "<a href='/site/student/" + item.attentionObjId + "/toStudentIndex.htm'><img src='/front/sanhai/images/head_portrait.png' alt='机构logo'/></a>";
                        }

                        htmlStr += "</div>";
                        htmlStr += "<div class='stu_detail fl'>";
                        htmlStr += "<h3><a href='/site/student/" + item.attentionObjId + "/toStudentIndex.htm'>" + item.nickName + "</a></h3>";
                        htmlStr += "<p>年级：" + (common.df.showClass(item.calss)) + "</p>";
                        htmlStr += "<p>学校：" + item.school + "</p>";
                        htmlStr += "<p>课程:  ";
                        $.each(item.courseList, function (index1, item1) {
                            if(index1!=item.courseList.length-1){
                                htmlStr += "《"+item1.courseTitle+"》,";
                            }else{
                                htmlStr += "《"+item1.courseTitle+"》";
                            }

                        });
                        htmlStr += "</p>";
                        htmlStr += "</div>";
                        htmlStr += "<div class='fr stu_buttons'><input type='hidden' value='" + item.attentionObjId + "'/><button class='cancle_attention pushBtnJs_agree'>取消关注</button></div>";
                        htmlStr += "</div>";
                    });
                    $("#collectionorg").html(htmlStr);
                    //显示分页工具条
                    PageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                        new CollectionAndattention().loadAttentionstuList(currPage);
                    });
                    /*弹窗初始化*/
                    $('.popBox').dialog({
                        autoOpen: false,
                        width: 600,
                        modal: true,
                        resizable: false,
                        close: function() {
                            $(this).dialog("close")
                        }
                    });
                    /*驳回申请*/
                    $('.pushBtnJs').click(function() {
                        $("#pushNotice").dialog("open");
                        return false;
                    });
                    /*同意申请*/
                    $('.pushBtnJs_agree').click(function() {
                        obje=$(this);
                        var id = $(this).parent('div').children('input').val();
                        $("#pushNotice_agree").dialog("open");
                        $('#ObjId').val(id);
                        $('#conte').text("是否要取消你关注的学生？取消后可就找不到了哦！");
                        return false;
                    });
                    //清除选项
                    $('.cancelBtn').click(function() {

                        $(".pushNotice,.pushNotice_agree").dialog("close");
                    })
                }


            });
        }

        return CollectionAndattention;
    });