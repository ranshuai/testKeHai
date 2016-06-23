/**
 * Created by bbb on 2015/12/9.
 */
define('loadHotCourse',['dialogs','jquery', 'common', 'money', 'pageBar', 'base'], function (dialogs,$, common, money, pageBar) {
    /**
     * 加载热门课程
     */
    var loadHotCourse=function () {
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
                    var price= money.fmoney(Number(item.price)/100,2);
                    var couid="'"+item.courseId+"'";
                    if(response.data.list.length-1==index){
                        htmlStr += '<dl class="main_r_cont_item noBorder">';
                        htmlStr += '<dt class="learn_together"><a href="/site/course/' + item.courseId + '/courseContent.htm">' + item.courseTitle + '</a></dt>';
                        htmlStr += '<dd>';
                        htmlStr += '<p><strong>' + price + '</strong><span>' + item.sales + '人在学</span></p>';
                        htmlStr += '<p><!--<a href="javascript:void(0);" class="audit">抢旁听</a>--><a href="javascript:void(0);" onclick="collection($(this),'+couid+','+item.courseMode+')" class="add_love"><em></em>收藏</a></p>';
                        htmlStr += '</dd>';
                        htmlStr += '</dl>';
                    }else{
                        htmlStr += '<dl class="main_r_cont_item clearfix">';
                        htmlStr += '<dt class="learn_together"><a href="/site/course/' + item.courseId + '/courseContent.htm">' + item.courseTitle + '</a></dt>';
                        htmlStr += '<dd>';
                        htmlStr += '<p><strong>' + price + '</strong><span>' + item.sales + '人在学</span></p>';
                        htmlStr += '<p><!--<a href="javascript:void(0);" class="audit">抢旁听</a>--><a href="javascript:void(0);" onclick="collection($(this),'+couid+','+item.courseMode+')" class="add_love"><em></em>收藏</a></p>';
                        htmlStr += '</dd>';
                        htmlStr += '</dl>';
                    }
                });
                $("#hotCoursePanel").html(htmlStr);
            }
        });
    };

    /**
     * 收藏课程
     * @param courseId
     * @param coursemode
     */
    collection =function (val,courseId,coursemode){
        //console.log(val);
         //console.log(courseId);
          //console.log(coursemode);
        $.ajax({
            url: "/collection/intoCollection.do",
            type: "post",
            dataType: "json",
            data: {
                courseId: courseId,
                courseMode: coursemode
            },
            success: function (response) {
                if ("000" == response.resCode){
                    Kh.collectHeart(val);
                }
                if ("200" == response.resCode) {
                    //debugger;
                    window.location.href = "/login.htm";
                }
                if("300" == response.resCode){
                    dialogs._timer(response.resMsg,2,2,null);
                }
            }
        });
    }
    return {
        loadHotCourse: loadHotCourse
    }

});
