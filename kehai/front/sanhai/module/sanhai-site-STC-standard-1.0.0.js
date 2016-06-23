/**
 * 网站学校列表和名师列表界面js
 * Created by mahuihuang on 15/8/10.
 */
$(document).ready(function () {

    /*综合排序*/
    /*;
    (function () {
        var sele = document.getElementById('js-slideDown'); //li
        var oUl1 = sele.getElementsByTagName('ul')[0];
        var oA = $('#oa');
        var aA = oUl1.getElementsByTagName('a');
        var aLi = $('.main_l_nav')[0].children;

        $(sele).hover(function () {
            $(oUl1).stop().slideDown();
            var aLi = $(oUl1)[0].children;
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].onclick = function () {
                    oA[0].innerHTML = this.innerHTML;
                };
            }
        }, function () {
            $(oUl1).stop().slideUp();
        });

        for (var i = 0; i < aLi.length; i++) {
            $(aLi[i]).click(function () {
                for (var i = 0; i < aLi.length; i++) {
                    $(aLi[i]).removeClass('active');
                }
                $(this).addClass('active');
            });
        }
    })();*/
    ;(function(){
        $('.main_l_nav li').each(function(i){
            var $this=$(this);
            var $ud=$('.updown').children('i');
            $this.click(function(){
                $this.addClass('active').siblings().removeClass('active');
                if(i!=4 && $ud.attr('class')=='js-slideDown_upw'){
                    $ud.attr('class','js-slideDown_upb');
                }else if(i!=4 && $ud.attr('class')=='js-slideUp_downw'){
                    $ud.attr('class','js-slideUp_downb');
                }
            });
        });
        $('.updown').toggle(function(){
            $(this).children('i').attr('class','js-slideUp_downw');

        },function(){
            $(this).children('i').attr('class','js-slideDown_upw');

        })

    })();

});
/**
 * 显示数据检索过滤条
 * @param selectNavCallback
 */
function showSelectNav(selectNavCallback) {

    /*//默认选中的
    $.each($(".classes_sel_ul input"), function (index, item) {
        var inputId = $(this).attr("id");
        var inputVal = $("#" + inputId).val();
        if (inputVal != "ignore") {
            var title = $(".classes_sel_cont .div1 .s-dl dt[data=" + inputId + "]").text();
            var val = $(".classes_sel_cont dd a[code=" + inputVal + "]").eq(0).text();      //这里code=1 有2个
            $(".classes_sel_cont .div1 .s-dl dt[data=" + inputId + "]").parents("div .div1").hide();
            $('<li id="" data="" >' + title + '&nbsp;:&nbsp;<span>' + val + '</span><span class="del js-sursor" code="' + inputVal + '" codeKey="' + $(this).attr("id") + '">x</span></li>').appendTo('ul.classes_sel_ul');
        }
    });
    $('ul.classes_sel_ul li .del').die('click');//移除所有的事件
    $('ul.classes_sel_ul li .del').live('click', function () {
        var code = $(this).attr("code");
        var codeKey = $(this).attr("codeKey");

        $("#" + codeKey).val("ignore");

        $("dt[data=" + codeKey + "]").parents(".div1").show();

        ($('dd').eq($(this).parent().attr('id')).children('a').css({'color': 'black'}));
        $(this).parent().remove();

        var oTit = $(this).parent("li").attr("data");//
        var oTxt = $(this).parent("li").find("span").eq(0).text();

        selectNavCallback(1);
    });

    var oBox = $('.classes_sel_cont');
    var aHide = $('.h_div');
    var aC = $('.js-ac');
    var oUl = $('.classes_sel_ul');

    $('.classes_sel_cont').undelegate('dd');
    $('.classes_sel_cont').delegate('dd', {
            'click': function () {
                var $this = $(this);

                var oCode = $this.children('a').attr("code");
                //alert(oCode);

                var oDdTxt = $this.children('a').html();
                //alert(oDdTxt);

                var oTit = $this.parents('.div1').find('dt').html();
                //alert(oTit);

                var oData = $this.parents('.div1').find('dt').attr("data");
                //alert(oData);

                var aLi = oUl.children();
                //alert("aLi" + aLi);

                /!*if ($this.children('a').html() == '全部') {
                    return false;
                } else {
                    $this.children('a').css({'color': '#FF7F00'});
                }*!/

                //alert("0000");
                //console.log(aLi);
                /!*for (var i = 0; i < aLi.length; i++) {
                    //alert("1->" + aLi[i].getAttribute('id'));
                    //alert("2->" + $this.index('dd'));

                    if (aLi[i].getAttribute('id') == $this.index('dd')) {
                        $this.children('a').css({'color': '#FF7F00'});
                        return false;
                    }
                    if ($this.children('a').html() == '全部') {
                        return false;
                    }
                }*!/

                $('<li id="' + $(this).index('dd') + '" data="' + oData + '" >' + oTit + '&nbsp;:&nbsp;<span>' + oDdTxt + '</span><span class="del js-sursor">x</span></li>').appendTo(oUl);
                aHide.addClass('hide');
                $('#' + $(this).index('dd') + ' .del').click(function () {
                    //$('.del').click(function () {

                    //($('dd').eq($(this).parent().attr('id')).children('a').css({'color': 'black'}));
                    $(this).parent().remove();

                    var oTit = $(this).parent("li").attr("data");//

                    var oTxt = $(this).parent("li").find("span").eq(0).text();

                    //console.log(oTit + " - " + oTxt);

                    $("#" + oTit).val("ignore");

                    $this.parents("div .div1").show();

                    selectNavCallback(1);

                });

                //console.log(oData + " - " + oDdTxt + " - " + oCode);
                $("#" + oData).val(oCode);

                $this.parents("div .div1").hide();

                selectNavCallback(1);
            }
        }
    );

    /!*更多按钮*!/
    aC.toggle(function () {
        var $this = $(this);
        aHide.addClass('hide');
        $this.siblings('.h_div').removeClass('hide');
    }, function () {
        aHide.addClass('hide');
    });*/


    $.each($(".sele_c_list input"), function (index, item) {
        var inputId = $(this).attr("id");
        var inputVal = $("#" + inputId).val();
        if (inputId!="courseTitle"&&inputId!="orgname"&&inputId!="name"&&inputVal != "ignore"&&inputId!="sortType") {
            var title = $(".sele_list div[data=" + inputId + "]").text();
            var val = $(".sele_list ul li a[code=" + inputVal + "]").eq(0).text();
            $(".sele_list ul li a[code=" + inputVal + "]").eq(0).addClass('ac');
            var tit_index =$('.sele_li_tit').index($(".sele_list ul li a[code=" + inputVal + "]").eq(0).parents('.sele_list').find('.sele_li_tit'));
            $('<li><span class="span_bor"><span data="'+tit_index+'">'+title+'</span><span class="after">:</span><span class="ac">'+val+'</span><i class="del" data='+inputId+' num='+index+'></i></span></li>').appendTo($('.sele_c_list'));
            $('.del').click(function(){
                var same = $(this).attr('num');
                $(" a[code=" + inputVal + "]").removeClass('ac');
                $(this).parents('li').remove();
                var codeKey = $(this).attr("data");
                $("#" + codeKey).val("ignore");
                if($("#courseTitle")){
                    $("#courseTitle").val("ignore");
                }
                if($("#orgname")){
                    $("#orgname").val("ignore");
                }
                if($("#name")){
                    $("#name").val("ignore");
                }
                selectNavCallback(1);
            });
        }

    });
        /*网站学校列表全部课程分类下面的所有分类
        *
        * 调用的时候传进两个参数,
        * 
        */
        $('.classes_sel_sel').selectedClassification(function(){
                var codeKey = $(this).attr("data");
                $("#" + codeKey).val("ignore");
                selectNavCallback(1);
        },function(oData,oCode){
                $("#" + oData).val(oCode);
                if($("#courseTitle")){
                    $("#courseTitle").val("ignore");
                }
                if($("#orgname")){
                    $("#orgname").val("ignore");
                }
                if($("#name")){
                    $("#name").val("ignore");
                }
                selectNavCallback(1);
        });
}


/**
 * 选课界面
 * 加载对应选项课程并渲染分页
 * @param url
 *
 */
function loadSelectCourse(currentPage) {
    var courseTitle=encodeURI(encodeURI($("#courseTitle").val()));
    var url = "/site/course/" + $("#courseType").val() + "/" + $("#gradeId").val() + "/" + $("#subjectId").val() + "/" + $("#versionId").val() + "/" + $("#courseMode").val() + "/" + currentPage + "/"+courseTitle+"/"+$("#sortType").val()+"/selectCourse.do"
    $("#contentDiv").html("加载中...");
    $.post(url, function (response, status, xhr) {

        //console.log("--------------------------------------------------");
        //console.log("课程类型（courseType）   -> " + response.data.courseType);
        //console.log("年级编号（gradeId）      -> " + response.data.gradeId);
        //console.log("科目编号（subjectId）    -> " + response.data.subjectId);
        //console.log("教材版本（versionId）    -> " + response.data.versionId);
        //console.log("授课模式（courseMdoe）   -> " + response.data.courseMode);
        //console.log("当前页面（currentPage）  -> " + response.data.currentPage);
        //console.log("--------------------------------------------------");

        // 隐藏导航条
        //$("ul[class='main_l_nav']").hide();

        // 是否有课程
        if (null == response.data.list  ) {
            $("#contentDiv").html("没有对应课程信息");
        } else {
            $("#contentDiv").empty();

            // 默认图片
            var fileImg = "";

            // 遍历所有记录
            $.each(response.data.list, function (index, value) {

                if ("" != value.advertiseResId && null != value.advertiseResId && "0" != value.advertiseResId&& undefined != value.advertiseResId){
                    fileImg = "/file/loadImage/" + value.advertiseResId+ "/180/110.r";
                }else{
                    fileImg = "/front/sanhai/images/course.png";
                }


                var courseMode = value.courseMode;
                var courseId = value.courseId;
                var auditFlag = 0;
                var remark = "加入购物车";
                var price = money.fmoney(Number(value.price)/100,2);
                var des=value.des.length>15?value.des.substr(0,16)+"...":value.des;
                var goodrate=""
                if(value.evalCount==0||value.evalCount==undefined){
                    goodrate="100";
                }else
                {
                    goodrate=new Number(value.goodEvaluateTotal/value.evalCount).toFixed(2)*100;
                }

               var content=" <div class='main_l_nav_cont_row clearfix'>"+
                   "<dl class='fl'>"+
                   "<dt class='fl'><a href='/site/course/" + value.courseId + "/courseContent.htm' target='_blank'><img src='"+fileImg+"'></a></dt>"+
                   "<dd class='fl'>"+
                   "<div class='class_detail fl'>"+
                   "<h3><a href='/site/course/" + value.courseId + "/courseContent.htm' target='_blank'> " + value.courseTitle + "</a><em>"+(value.courseMode==0?'一对一':'班课')+"</em></h3>"+
                   "<p class='class_money clearfix'><span class='fl'>科目：" + value.subject + "</span><strong>" + price + "</strong></p>"+
                   "<p class='class_money clearfix'><span class='fl'>学校：<a href='/site/shool/" + ((value.orgEntity)?value.orgEntity.orgId:"") + "/findCourseByorgId.htm'>" +((value.orgEntity) ? value.orgEntity.orgName :"")+"</a></span><em>共" + value.duration + "课时</em></p>"+
                   "<p class='ellipsis' title='"+value.des+"'>简介：" + des + "</p>"+
                   "</div>"+
                   "</dd>"+
                   "</dl>"+
                   "<div class='class_evaluate fl'>"+
                   "<span class='persent'>"+goodrate+"%</span>"+
                   "<em class='myd'>满意度</em>"+
                   "<strong><span>" + value.buyCount + "人</span>已购买 </strong>"+
                   "<strong><span>"+((value.evalCount)&&(value.evalCount!=0) ? value.evalCount+"条" : "暂无" )+"</span>评价</strong>"+
                   "</div>"+
                   "<div class='fl the_last_div'>"+
                   "<button type='btn' class='to_ask to_consult' onclick=\"window.open('/consult/chat.htm?type=course&typeId="+courseId+"','','height=730,width=900');\">去咨询</button>" +
                   "<input type='hidden' value='" + value.courseMode + "'/>" +
                   "<input type='hidden' value='" + value.courseId + "'/>" +
                   /*"<a class='btn to_ask pushBtnJs'>加入购物车</a>"+*/
                   "<a class='btn to_ask' onclick='addShoppingCart($(this))'>加入购物车</a>"+
                   "</div>"+
                    "</div>";

                // 渲染
                $("#contentDiv").append(content);
            });
            //显示分页工具条
            showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                //console.log("显示分页加载条: "+currPage);
                loadSelectCourse(currPage);
            })
        }

        $('.popBox').dialog({
            autoOpen: false,
            width: 600,
            modal: true,
            resizable: false,
            close: function () {
                $(this).dialog("close")
            }
        });
        $('.to_consult').click(function (){
            var courseId = $(this).parent('div').children('input').eq(1).val();
            $.courseChat(courseId);
        });
        $('.pushBtnJs').click(function () {
            var courseMode = $(this).parent('div').children('input').eq(0).val()
            var courseId = $(this).parent('div').children('input').eq(1).val()
            $("#pushNotice").dialog("open");

            $('#courseMode').val(courseMode);
            $('#courseId').val(courseId);
            return false;
        });

        $('.cancelBtn').click(function () {
            $(".pushNotice").dialog("close");
        })

    });

}
/**
 * 学校列表界面
 * @param currPage
 */
function loadSchoolListData(currPage) {
    var orgname=encodeURI(encodeURI($("#orgname").val()));
    var arraObj = new Array();
    var arrayscore = new Array();
    //console.log("请求服务器 ： /site/siteSchoolList/" + currPage + "/" + $("#addressCode").val() + "/" + $("#courseType").val() + "/" + $("#subjectId").val() + ".do");
    $.ajax({
        url: "/site/siteSchoolList/" + currPage + "/" + $("#addressCode").val() + "/" + $("#courseType").val() + "/" + $("#subjectId").val() + "/"+orgname+"/"+$("#sortType").val()+"/schoolListData.do",
        dataType: "json",
        success: function (response) {
            if (!common.checkResponse(response)) {
                return false;
            }
            var htmlStr = "";
            $.each(response.data.list, function (index, item) {
                htmlStr += '<dl>';
                htmlStr += '    <dt>';
                if (item.ppResId && item.ppResId != 0&& item.ppResId != undefined) {
                    htmlStr += '        <a href="/site/shool/' + item.orgId + '/findCourseByorgId.htm"><img style="width:120px;height:80px;" src="/file/loadImage/' + item.ppResId + '/120/80.r" alt="学校logo"></a>';
                } else {
                    htmlStr += '        <a href="/site/shool/' + item.orgId + '/findCourseByorgId.htm"><img style="width:120px;height:80px;" src="/front/sanhai/images/person.png" alt="学校logo"></a>';
                }
                var des="";
                if(item.des || item.des.length != 0){
                    if(item.des.length>68){
                        des=  item.des.substring(0,68)+"...";
                    }else{
                        des=item.des;
                    }
                }else{
                    des="暂无介绍";
                }
                htmlStr += '        <span><a href="/site/shool/' + item.orgId + '/findCourseByorgId.htm">' + ((item.orgName) ? item.orgName : " " ) + '</a></span>';
               /* htmlStr += '        </br>';*/
                //htmlStr += '        <em>' + ((!item.orgScore)||(item.orgScore=="") ? "5.0" :parseFloat(item.orgScore).toFixed(1) ) + '分</em>';
                htmlStr += '<span class="evaluationsMain" title="' + ((!item.orgScore)||(item.orgScore=="") ? "0.0" :parseFloat(item.orgScore).toFixed(1) ) + '分">';
                htmlStr += '<ul class="score_ul evaluationSmall p_right fl">';
                htmlStr += '<li><span class="score"><div class="gray_js"></div><div class="red_js'+index+' red_js" style="width: 44px;"></div></span></li>';
                htmlStr += '</ul>';
                htmlStr += '</span>';
                htmlStr += '    </dt>';
                htmlStr += '    <dd class="clearfix">';
                htmlStr += item.teacherNum>999?'<span class="sch_teacher" title='+item.teacherNum+'><i></i>教师：999<b></b>人</span>':'<span class="sch_teacher"><i></i>教师：'+item.teacherNum+'人</span>';
                htmlStr += item.courseNum>999?'<span class="sch_classes" title='+item.courseNum+'><i></i>课程：999<b></b>门</span>':'<span class="sch_classes"><i></i>课程：'+item.courseNum+'门</span>';
                htmlStr += item.studentNum>999?'<span class="sch_student" title='+item.studentNum+'><i></i>学生：999<b></b>人</span>':'<span class="sch_student"><i></i>学生：' + item.studentNum + '人</span>';
                htmlStr += '        <p>简介：' + des + '</p>';
                htmlStr += '        <a href="javascript:void(0);" class="allClasses">' + item.studentNum + '人在学习</a>';
                htmlStr += '        <a class="schConsultation w100" onclick="window.open(\'/consult/chat.htm?type=org&typeId='+item.orgId+'\',\'\',\'height=730,width=900\');">去咨询</a>';
                //htmlStr += '        <a href="" class="schConsultation w100">去咨询</a>';
                htmlStr += '    </dd>';
                htmlStr += '</dl>';

                arraObj.push("red_js"+index);
                arrayscore.push(((!item.orgScore)||(item.orgScore=="") ? "0.0" :parseFloat(item.orgScore).toFixed(1) ));
            });
            $("#schoolListPanel").html(htmlStr);
            for(var m=0;m<arraObj.length;m++){
                score_small(arrayscore[m],arraObj[m]);
            }
            //显示分页工具条
            showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                loadSchoolListData(currPage);
            });
        }
    });
}

//渲染名师列表表格
/**
 * 名师列表界面
 * @param currPage
 */
function loadTeacherListData(currPage) {
    var name=encodeURI(encodeURI($("#name").val()));
    $.ajax({
        url: "/site/siteTeacherList/" + currPage + "/" + $("#courseType").val() + "/" + $("#gradeId").val() + "/" + $("#subjectId").val() + "/" + $("#highestDegree").val() + "/"+name+"/"+$("#sortType").val()+"/teacherListData.do",
        dataType: "json",
        success: function (response) {
            if (!common.checkResponse(response)) {
                return false;
            }

            var htmlStr = "";
            $.each(response.data.list, function (index, item) {
                var goodrate=""
                if(item.EvaluateTotal==0){
                    goodrate="0";
                }else
                {
                    goodrate=(item.goodEvaluateTotal/item.EvaluateTotal).toFixed(1)*100;
                }

                htmlStr += "           <dl class='clearfix'>";
                htmlStr += "                <dt>";
                //htmlStr += "                    <a href='javascript:;'><img src='file/userFace/" + item.userId + ".r?dim=95' alt='老师头像'></a>";
                if (item.ppResId&&item.ppResId!=undefined&&item.ppResId!=0) {
                    htmlStr += "<a href='/site/theacher/" + item.userId + "/toTeacherIndex.htm'><img src='/file/loadImage/" + item.ppResId + "/95/95.r' alt='老师头像'></a>";
                } else {
                    htmlStr += "<a href='/site/theacher/" + item.userId + "/toTeacherIndex.htm'><img src='/front/sanhai/images/person.png' alt='老师头像'></a>";
                }
                htmlStr += "                    <span>" + ((item.seniority) ? item.seniority : 1) + "年教龄</span>";
                htmlStr += "                </dt>";
                htmlStr += "                <dd class='clearfix'>";
                htmlStr += "                    <div class='teacher_list_main_dd_left'>";
                htmlStr += "                        <h3>";
                htmlStr += "                            <a href='/site/theacher/" + item.userId + "/toTeacherIndex.htm' class='tc_name'>" + item.name + "</a>";
                htmlStr += "                            <a href='/site/shool/" + item.orgId + "/findCourseByorgId.htm' class='sc_name'><i></i><span>" + item.orgName + "</span></a>";
                htmlStr += "                        </h3>";
                htmlStr += "                        <div class='tch_authentication'>";
                if(item.teaCardAudited==='0'){
                    htmlStr += "                        <label><i></i>身份认证</label>";
                }
                if(item.teaCerAudited==='-1'){
                    htmlStr += "                        <label><s></s>教师认证</label>";
                }
                htmlStr += "                        <label><b></b>学历认证</label><label><em></em>在线授课</label></div>";
                htmlStr += "                        <p><i class='tlmdpico2'></i><span>" + ((item.courseCode) ? df.dataCode(item.courseCode) : "教授多个科目") + "  授课时长:" + ((item.workHour && item.workHour + "" != "") ? parseFloat(item.workHour)/60 : 0).toFixed(2) + "小时 学生数:" + ((item.orderNum) ? item.orderNum : 0) + "人</span></p>";
                htmlStr += "                        <p><i class='tlmdpico3'></i><span>在售课程:";
                $.each(item.courseList, function (c_index, c_item) {
                    htmlStr += "<a href='/site/course/" + c_item.courseId + "/courseContent.htm' >《" + c_item.courseTitle + "》</a>";
                });
                if(item.courseList.length>0){
                    htmlStr += "                        ... &nbsp;<a href='/site/theacher/" + item.userId + "/toCourse.htm' class='orange'>查看更多></a></span></p>";
                }else{
                    htmlStr += "                       </span></p>";
                }

                htmlStr += "                    </div>";
                htmlStr += "                    <div class='teacher_list_main_dd_right'>";
               /* htmlStr += "                        <span>" + ((item.evaluate) ? item.evaluate : 100) + "%</span>";*/
                 htmlStr += "                        <span>" + goodrate + "%</span>";
                htmlStr += "                        <strong>满意度</strong>";
                htmlStr += "                        <em>" + ((item.orderNum) ? item.orderNum : 0) + "人已购买</em>";
                htmlStr += "                        <a onclick=\"window.open('/consult/chat.htm?type=teacher&typeId="+item.userId+"','','height=730,width=900');\" class='btn'>去咨询</a>";
                htmlStr += "                    </div>";
                htmlStr += "                </dd>";
                htmlStr += "            </dl>";
            });
            $("#teacherListPanel").html(htmlStr);
            //显示分页工具条
            showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                loadTeacherListData(currPage);
            });
        }
    });
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
                var courseurl="";
                if(item.advertiseResId==""||item.advertiseResId==0||item.advertiseResId==undefined){
                    courseurl="/front/sanhai/images/course.png";
                }else{
                    courseurl="/file/loadImage/" + item.advertiseResId+ ".r?dim=180";
                }
               /* if(response.data.list.length-1==index){
                    htmlStr += '<dl class="main_r_cont_item clearfix noBorder">';
                    htmlStr += '<dt class="learn_together fl"><a href="/site/course/' + item.courseId + '/courseContent.htm"><img src='+courseurl+'></a></dt>';
                    htmlStr += '<dd>';
                    htmlStr += '<h4><a href="/site/course/' + item.courseId + '/courseContent.htm">' + item.courseTitle + '</a></h4>';
                    htmlStr += '<p class="select_classes_bg">' + item.sales + '人在学习</p>';
                    htmlStr += '</dd>';
                    htmlStr += '</dl>';
                }else{
                    htmlStr += '<dl class="main_r_cont_item clearfix">';
                    htmlStr += '<dt class="learn_together fl"><a href="/site/course/' + item.courseId + '/courseContent.htm"><img src='+courseurl+'></a></dt>';
                    htmlStr += '<dd>';
                    htmlStr += '<h4><a href="/site/course/' + item.courseId + '/courseContent.htm">' + item.courseTitle + '</a></h4>';
                    htmlStr += '<p class="select_classes_bg">' + item.sales + '人在学习</p>';
                    htmlStr += '</dd>';
                    htmlStr += '</dl>';
                }*/
                var price= money.fmoney(Number(item.price)/100,2);
                var couid="'"+item.courseId+"'";
                if(response.data.list.length-1==index){
                    htmlStr += '<dl class="main_r_cont_item noBorder">';
                    htmlStr += '<dt class="learn_together"><a href="/site/course/' + item.courseId + '/courseContent.htm">' + item.courseTitle + '</a></dt>';
                    htmlStr += '<dd>';
                    htmlStr += '<p><strong>' + price + '</strong><span>' + item.sales + '人在学</span></p>';
                    htmlStr += '<p><a href="javascript:void(0);" class="audit">抢旁听</a><a href="javascript:void(0);" onclick="collection($(this),'+couid+','+item.courseMode+')" class="add_love"><em></em>收藏</a></p>';
                    htmlStr += '</dd>';
                    htmlStr += '</dl>';
                }else{
                    htmlStr += '<dl class="main_r_cont_item clearfix">';
                    htmlStr += '<dt class="learn_together"><a href="/site/course/' + item.courseId + '/courseContent.htm">' + item.courseTitle + '</a></dt>';
                    htmlStr += '<dd>';
                    htmlStr += '<p><strong>' + price + '</strong><span>' + item.sales + '人在学</span></p>';
                    htmlStr += '<p><a href="javascript:void(0);" class="audit">抢旁听</a><a href="javascript:void(0);" onclick="collection($(this),'+couid+','+item.courseMode+')" class="add_love"><em></em>收藏</a></p>';
                    htmlStr += '</dd>';
                    htmlStr += '</dl>';
                }
            });
            $("#hotCoursePanel").html(htmlStr);
        }
    });
}
/**
 * 收藏课程
 * @param courseId
 * @param coursemode
 */
function collection(val,courseId,coursemode){
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

            if ("000" == response.resCode){
     Kh.collectHeart(val);
            }
            if ("200" == response.resCode) {
                window.location.href = "/login.htm";
            }
        }
    });
}
