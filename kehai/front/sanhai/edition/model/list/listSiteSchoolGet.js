/*
*   网站学校列表
*   接口
* */

define(function(){
    function listSiteSchoolGet (){}
    /*@param
     * json对象
     * currpage 当前的页数
     * callback 回调函数
     * tem script 模板
     * */
    //学校列表接口
    listSiteSchoolGet.prototype.schoolListInit = function(json){
        var orgname = encodeURI(encodeURI($("#orgname").val()));
        var url = "/site/siteSchoolList/" + json.currPage + "/" +
            $("#addressCode").val() + "/" + $("#courseType").val() +
            "/" + $("#subjectId").val() + "/" + orgname + "/" +
            $("#sortType").val() + "/schoolListData.do";
        $.ajax({
            url:url,
            type:'post',
            dataType:'json',
            success:function(response){
                json.callback&&json.callback(response,json.tem);
            },
            error:function(){
                console.log('失败');
            }
        });
    };
    //课程中心列表接口
    listSiteSchoolGet.prototype.courseListInit = function(json){
        var courseTitle=encodeURI(encodeURI($("#courseTitle").val()));
        var url = "/site/course/" +
            $("#courseType").val() +
            "/" + $("#gradeId").val() +
            "/" + $("#subjectId").val() + "/" +
            $("#versionId").val() + "/" + $("#courseMode").val() +
            "/" + json.currPage + "/"+courseTitle+"/"+
            $("#sortType").val()+"/selectCourse.do";
        $.ajax({
            url:url,
            type:"post",
            dataType:"json",
            success:function(response){
                json.callback&&json.callback(response,json.tem);
            },
            error:function(){
                console.log('失败');
            }
        });
    };
    //旁听列表接口
    listSiteSchoolGet.prototype.PTListInit = function(json){
        var courseTitle = encodeURI(encodeURI($("#courseTitle").val()));
        var theme = encodeURI(encodeURI($("#theme").val()));
        var url = "/site/ptcourse/" + $("#courseType").val() + "/" + $("#gradeId").val() + "/" +
            $("#subjectId").val() + "/" + $("#stuScore").val() + "/" + $("#teachTime").val() +
            "/" + courseTitle + "/" + $("#sortType").val() + "/" + json.currPage +
            "/"+theme+"/"+$("#searchtype").val()+"/"+$("#dataId").val()+"/selectCourse.do";

        $.ajax({
            url:url,
            type:"post",
            dataType:"json",
            success:function(response){
                json.callback&&json.callback(response,json.tem);
            },
            error:function(){
                console.log('失败');
            }
        })
    };
    //课海列表接口
    listSiteSchoolGet.prototype.KHListInit = function(json){
        var courseTitle = encodeURI(encodeURI($("#courseTitle").val()));
        var theme = encodeURI(encodeURI($("#theme").val()));
        var url = "/site/videoCourse/" + $("#courseType").val() + "/" + $("#gradeId").val() + "/" +
            $("#subjectId").val() + "/" + $("#stuScore").val() + "/" + $("#teachTime").val() + "/" +
            courseTitle + "/" + $("#sortType").val() + "/" + json.currPage + "/"+theme+"/"+$("#searchtype").val()+
            "/"+$("#dataId").val()+"/selectvideoCourseList.do";

        $.ajax({
            url:url,
            type:'post',
            dataType:'json',
            success:function(response){
                json.callback&&json.callback(response,json.tem);
            },
            error:function(){
                console.log('失败');
            }

        });
    };
    
    return new listSiteSchoolGet();
});