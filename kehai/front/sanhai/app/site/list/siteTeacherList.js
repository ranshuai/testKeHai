/**
 * Created by bbb on 2015/12/10.
 */
define('siteTeacherList', ['jquery', 'common', 'money', 'pageBar', 'base'], function ($, common, money, pageBar) {
    //渲染名师列表表格
    /**
     * 名师列表界面
     * @param currPage
     */
    var loadTeacherListData=function (currPage) {
        $("#pageBar").html('');
        var name=encodeURI(encodeURI($("#name").val()));
        var lode='<div class="load_wrap tc pr">'+
            '<img class="pa" src="/front/sanhai/images/loading.gif" alt=""/>'+
            '</div>';
        $("#teacherListPanel").html(lode);
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
                        goodrate=(item.goodEvaluateTotal/item.EvaluateTotal).toFixed(2)*1000/10;
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
                    htmlStr += "                        <p><i class='tlmdpico2'></i><span>" + ((item.courseCode) ? common.df.dataCode(item.courseCode) : "教授多个科目") + "  授课时长:" + ((item.workHour && item.workHour + "" != "") ? parseFloat(item.workHour)/60 : 0).toFixed(2) + "小时 学生数:" + ((item.orderNum) ? item.orderNum : 0) + "人</span></p>";
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
                pageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                    loadTeacherListData(currPage);
                });
            }
        });
    }

    return {
        loadTeacherListData: loadTeacherListData
    }

});
