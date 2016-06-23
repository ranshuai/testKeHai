/**
 * Created by bbb on 2015/12/9.
 */
define('siteSchoolList',['jquery', 'common', 'money', 'pageBar', 'base'], function ($, common, money, pageBar) {

    function removeHTMLTag(str) {
        str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
        str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
        //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
        str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
        return str;
    }
    /**
     * 学校列表界面
     * @param currPage
     */
   var loadSchoolListData=function (currPage) {
        $("#pageBar").html('');
        var orgname = encodeURI(encodeURI($("#orgname").val()));
        var arraObj = new Array();
        var arrayscore = new Array();
        //console.log("请求服务器 ： /site/siteSchoolList/" + currPage + "/" + $("#addressCode").val() + "/" + $("#courseType").val() + "/" + $("#subjectId").val() + ".do");
        var lode='<div class="load_wrap tc pr">'+
            '<img class="pa" src="/front/sanhai/images/loading.gif" alt=""/>'+
            '</div>';
        $("#schoolListPanel").html(lode);
        $.ajax({
            url: "/site/siteSchoolList/" + currPage + "/" + $("#addressCode").val() + "/" + $("#courseType").val() + "/" + $("#subjectId").val() + "/" + orgname + "/" + $("#sortType").val() + "/schoolListData.do",
            dataType: "json",
            success: function (response) {
                if (!common.checkResponse(response)) {
                    return false;
                }
                var htmlStr = "";
                $.each(response.data.list, function (index, item) {
                    htmlStr += '<dl>';
                    htmlStr += '    <dt>';
                    if (item.ppResId && item.ppResId != 0 && item.ppResId != undefined) {
                        htmlStr += '        <a href="/site/shool/' + item.orgId + '/findCourseByorgId.htm"><img style="width:100px;height:100px;" src="/file/loadImage/' + item.ppResId + '/120/80.r" alt="学校logo"></a>';
                    } else {
                        htmlStr += '        <a href="/site/shool/' + item.orgId + '/findCourseByorgId.htm"><img style="width:100px;height:100px;" src="/front/sanhai/images/person.png" alt="学校logo"></a>';
                    }
                    var des = "";
                    var shcoolDes=removeHTMLTag(item.des);
                    if (item.des || item.des.length != 0) {
                        if (shcoolDes.length > 68) {
                            des = shcoolDes.substring(0, 68) + "...";
                        } else {
                            des = shcoolDes;
                        }
                    } else {
                        des = "这个学校很懒，什么都没有留下";
                    }
                    htmlStr += '        <span><a href="/site/shool/' + item.orgId + '/findCourseByorgId.htm">' + ((item.orgName) ? item.orgName : " " ) + '</a></span>';
                    /* htmlStr += '        </br>';*/
                    //htmlStr += '        <em>' + ((!item.orgScore)||(item.orgScore=="") ? "5.0" :parseFloat(item.orgScore).toFixed(1) ) + '分</em>';
                    htmlStr += '<span class="evaluationsMain" title="' + ((!item.orgScore) || (item.orgScore == "") ? "0.0" : parseFloat(item.orgScore).toFixed(1) ) + '分">';
                    htmlStr += '<ul class="score_ul evaluationSmall p_right fl">';
                    htmlStr += '<li><span class="score"><div class="gray_js"></div><div class="red_js' + index + ' red_js" style="width: 44px;"></div></span></li>';
                    htmlStr += '</ul>';
                    htmlStr += '</span>';
                    htmlStr += '    </dt>';
                    htmlStr += '    <dd class="clearfix">';
                    htmlStr += item.teacherNum > 999 ? '<span class="sch_teacher" title=' + item.teacherNum + '><i></i>教师：999<b></b>人</span>' : '<span class="sch_teacher"><i></i>教师：' + item.teacherNum + '人</span>';
                    htmlStr += item.courseNum > 999 ? '<span class="sch_classes" title=' + item.courseNum + '><i></i>课程：999<b></b>门</span>' : '<span class="sch_classes"><i></i>课程：' + item.courseNum + '门</span>';
                    htmlStr += item.studentNum > 999 ? '<span class="sch_student" title=' + item.studentNum + '><i></i>学生：999<b></b>人</span>' : '<span class="sch_student"><i></i>学生：' + item.studentNum + '人</span>';
                    htmlStr += '        <p>简介：' + des + '</p>';
                    htmlStr += '        <a href="javascript:void(0);" class="allClasses">' + item.studentNum + '人已购买</a>';
                    htmlStr += '        <a class="schConsultation w100" onclick="window.open(\'/consult/chat.htm?type=org&typeId=' + item.orgId + '\',\'\',\'height=730,width=900\');">去咨询</a>';
                    //htmlStr += '        <a href="" class="schConsultation w100">去咨询</a>';
                    htmlStr += '    </dd>';
                    htmlStr += '</dl>';

                    arraObj.push("red_js" + index);
                    arrayscore.push(((!item.orgScore) || (item.orgScore == "") ? "0.0" : parseFloat(item.orgScore).toFixed(1) ));
                });
                $("#schoolListPanel").html(htmlStr);
                for (var m = 0; m < arraObj.length; m++) {
                    score_small(arrayscore[m], arraObj[m]);
                }
                //显示分页工具条
                pageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                    loadSchoolListData(currPage);
                });
            }
        });
    };

    return {
        loadSchoolListData: loadSchoolListData
    }

});