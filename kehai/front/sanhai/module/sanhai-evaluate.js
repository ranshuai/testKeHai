function loadevaluate1(url, data,currPage){
    var a = data;
    data += "currentPage=" + currPage;
    //console.log(a);
    //console.log(data)
    $.ajax({
        url:url,
        data: data,
        type:"post",
        success:function(result) {

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
            sercheEvaluate(val,evaluateReyresult);
            var params = new Array();
            params.push("/evaluate/searchEvaluateByStatus.do");
            params.push(a);
            //console.log("------------------");
            //console.log("totalPages-->" + result.data.totalPages);
            //console.log("currPage-->" + result.data.currPage);
            //console.log("------------------");
            setBasePageBar(result.data.totalPages, result.data.currPage, loadevaluate1, params);

        }
        ,
        error:function(xhr,status,error) {
            alert("请求失败.");
        }
    });

}


function loadstuevaluate1(url, data,currPage){
    var a = data;
    data += "currentPage=" + currPage;
    //console.log(a);
    //console.log(data)

    $.ajax({
        url:url,
        data: data,
        type:"post",
        success:function(result) {
            if(common.checkResponse(result) == false){
                return;
            }
            var val=result.data.rows;//评论记录
            $("#count").text("全部评论（"+result.data.countSize+"）");
            var tab="";

            if(val.length>0){
                for (var i=0;i<val.length;i++)
                {
                    var time =new Date(parseFloat(val[i].time)).format("yyyy-MM-dd hh:mm:ss");
                    var evaurl="";
                    if(val[i].ppResId==""||val[i].ppResId==0){
                        evaurl="/front/sanhai/images/person.png";
                    }else{
                        evaurl="/file/loadImage/" + val[i].ppResId + ".r?dim=60";
                    }
                    tab+=" <li class='dialogItem '>"+
                        "<div class='head_img'>"+
                        "<a href='/site/theacher/"+val[i].userId+"/toTeacherIndex.htm'><img STYLE='width:60px; height:60px;' src='"+evaurl+"'>"+val[i].userName+"</a>"+
                        "</div>"+
                        "<i class='arrow'></i>"+
                        "<div class='dialogCont dialogCont100'>"+val[i].des+
                        "</div>"+
                        "<div class='bottom_tools'>"+
                        "<span>"+time+"</span><a href='/site/course/"+val[i].courseId+"/courseContent.htm'>《"+val[i].courseName+"》</a>"+
                        "</div>"+
                        "</li>";

                }
            }
            $("#stuevaluates").html(tab);
            //console.log(result);
            var val = result.data.rows;//评论记录
            sercheEvaluate(val,evaluateReyresult);
            var params = new Array();
            params.push("/evaluate/searchEvaluateStu.do");
            params.push(a);
            //console.log("------------------");
            //console.log("totalPages-->" + result.data.totalPages);
            //console.log("currPage-->" + result.data.currPage);
            //console.log("------------------");
            setBasePageBar(result.data.totalPages, result.data.currPage, loadstuevaluate1, params);

        },
        error:function(xhr,status,error) {
            alert("请求失败.");
        }
    });

}



function loadShoolevaluate1(url, data,currPage){
    var a = data;
    data += "currentPage=" + currPage;
    //console.log(a);
    //console.log(data)
    $.ajax({
        url:url,
        data: data,
        type:"post",
        success:function(result) {

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
            sercheEvaluate(val,evaluateReyresult);
            var params = new Array();
            params.push("/site/shool/searchEvaluateBymodel.do");
            params.push(a);
            //console.log("------------------");
            //console.log("totalPages-->" + result.data.totalPages);
            //console.log("currPage-->" + result.data.currPage);
            //console.log("------------------");
            setBasePageBar(result.data.totalPages, result.data.currPage, loadShoolevaluate1, params);

        }
        ,
        error:function(xhr,status,error) {
            alert("请求失败.");
        }
    });

}

function loadTeacherevaluate1(url, data,currPage){
    var a = data;
    data += "currentPage=" + currPage;
    //console.log(a);
    //console.log(data)
    $.ajax({
        url:url,
        data: data,
        type:"post",
        success:function(result) {

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
            sercheEvaluate(val,evaluateReyresult);
            var params = new Array();
            params.push("/site/theacher/searchTeacherEvaluateBymodel.do");
            params.push(a);
            //console.log("------------------");
            //console.log("totalPages-->" + result.data.totalPages);
            //console.log("currPage-->" + result.data.currPage);
            //console.log("------------------");
            setBasePageBar(result.data.totalPages, result.data.currPage, loadTeacherevaluate1, params);

        }
        ,
        error:function(xhr,status,error) {
            alert("请求失败.");
        }
    });

}

function loadonetooneevaluate1(url, data,currPage){
    var a = data;
    data += "currentPage=" + currPage;
    //console.log(a);
    //console.log(data)
    $.ajax({
        url:url,
        data: data,
        type:"post",
        success:function(result) {

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
            sercheEvaluate(val,evaluateReyresult);
            var params = new Array();
            params.push("/site/course/searchEvaluateBymodel.do");
            params.push(a);
            //console.log("------------------");
            //console.log("totalPages-->" + result.data.totalPages);
            //console.log("currPage-->" + result.data.currPage);
            //console.log("------------------");
            setBasePageBar(result.data.totalPages, result.data.currPage, loadonetooneevaluate1, params);

        }
        ,
        error:function(xhr,status,error) {
            alert("请求失败.");
        }
    });

}