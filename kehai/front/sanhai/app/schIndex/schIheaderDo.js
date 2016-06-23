define("schIheaderDo",['common','dialogs','jquery_ui_min','base'],function(common,dialogs){
    // var top=function() {
    //     //客服中心hover效果
    //     $('.serviceList').rNavhover();
    //     //切换身份hover效果
    //     $('.tabRole').rNavhover();
       
        //切换机构
        //$('.select_type_List').rSetUpTab();
    //     function changeIdentity(identity) {
          
    //         $.ajax({
    //             type: "post",
    //             dataType: "json",
    //             url: "/perfectInfo/toIdentity.do",
    //             data: {identity: identity},
    //             success: function (data) {
                  
    //                 if (common.checkResponse(data) == false) {
    //                     return;
    //                 }
    //                 location.reload(); 
    //             },
    //             error: function (data) {
    //                 _alert("网络异常", "", "")
    //             }
    //         });
    //     }

    //     if (schI_paget.sessionScope) {
    //         $.ajax({
    //             type: "post",
    //             dataType: "json",
    //             url: "/perfectInfo/changeIdentity.do",
    //             data: {},
    //             success: function (data) {
    //                 if (common.checkResponse(data) == false) {
    //                     return;
    //                 }
    //                 var hasProp = 0;
    //                 $.each(data.data, function (index,value) {

    //                     //alert(this)
    //                     if (this == 0) {
    //                         $('<li><a href="javascript:void(0);" id="changeIdentity0">切换到教师身份</a></li>').appendTo(".changeIdentity");
    //                     } else if (this == 1) {
    //                         $('<li><a href="javascript:void(0);" id="changeIdentity1">切换到大学生身份</a></li>').appendTo(".changeIdentity");
    //                     } else if (this == 2) {
    //                         $('<li><a href="javascript:void(0);" id="changeIdentity2">切换到学生身份</a></li>').appendTo(".changeIdentity");
    //                     } else if (this == 3) {
    //                         $('<li><a href="javascript:void(0);" id="changeIdentity3">切换到学校身份</a></li>').appendTo(".changeIdentity");
    //                     }
    //                     hasProp++;
    //                 });

    //                 if (hasProp>0) {
    //                     $(".tabRole").removeClass('hide');
    //                 }
    //                  $('#changeIdentity0').click(function () {
    //                     changeIdentity(0)
    //                 });
    //                 $('#changeIdentity1').click(function () {
    //                     changeIdentity(1)
    //                 });
    //                 $('#changeIdentity2').click(function () {
    //                     changeIdentity(2)
    //                 });
    //                 $('#changeIdentity3').click(function () {
    //                     changeIdentity(3)
    //                 });

    //             },
    //             error: function (data) {
    //                 _alert("网络异常", "", "");
    //             }
    //         });
    //     } else {
    //         $('.tabRole').addClass('hide');
    //     }

    // };



    var topf=function(){
         //切换机构
        $('.select_type_List').rSetUpTab();

      /*  $.ajax({
            url: "/site/hotSearchKey.r",
            dataType :"json",
            success : function (res){
                if(common.checkResponse(res)) {
                    var htmlStr ="";
                    $.each(res.data.hotKeyList , function(index, item ){
                        htmlStr += "<li><a href='"+item.url+"'>"+item.name+"</a></li>";
                    });
                    if(htmlStr.length > 0 ) {
                        $("#hotSearchKey").html(htmlStr);
                    }
                }
            }
        });*/
        var htmlStr ="<li><a href='/site/course/ignore/10010/courseTransfer.htm'>语文</a></li>" +
            "<li><a href='/site/course/ignore/10011/courseTransfer.htm'>数学</a></li>" +
            "<li><a href='/site/course/ignore/10012/courseTransfer.htm'>英语</a></li>" +
            "<li><a href='/site/course/ignore/10013/courseTransfer.htm'>生物</a></li>" +
            "<li><a href='/site/course/1/ignore/courseTransfer.htm'>小学</a></li>" +
            "<li><a href='/site/course/2/ignore/courseTransfer.htm'>小升初</a></li>";
        $("#hotSearchKey").html(htmlStr);

        score_small(schI_page.avgteaShoolScore=='0.0'?'0.0':schI_page.avgteaShoolScore,'red_js9999');
        $("#avgsourceScore999999").text((schI_page.avgteaShoolScore=='0.0'?'0.0':schI_page.avgteaShoolScore)+"分");
        $('.subTitleBar_text1').placeholder({value:'请输入课程名称、关键词等...'})



        function attention(val,attentiontype){

            $.ajax({
                url: "/attention/intoAttention.do",
                type: "post",
                dataType: "json",
                data: {
                    attentionObjId: orgidid,
                    attentionType: attentiontype
                },
                success: function (response) {

                    if ("000" == response.resCode){
                        Kh.addAttention(val);
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

        function savePersonnel(){
            if(schI_page.uname=="null"){
                window.location.href="/login.htm";
                return;
            }
            $.ajax({
                type:"post",
                url:"/orgInfo/joinOrg.do",
                dataType:"json",
                data:{
                    "orgId":orgidid
                },
                success:function(result) {
                    //console.log(result);
                    if (common.checkResponse(result) == false) {
                        return;
                    }
                    //console.log(2222);
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "/personnel/applyToSaveInvite.do",
                        data: {
                            orgId: orgidid
                        },
                        success: function (data) {


                            //console.log(1111);
                            if (common.checkResponse(data) == false) {
                                return;
                            }
                            if(result.resMsg=="登录已经超时"){
                                window.location.href="/login.htm";
                            }else{
                                /*clickSuccess(result.resMsg);*/
                                dialogs._timer(result.resMsg,1,2,function(){
                                    window.location.reload();
                                });
                            }
                        }
                    });

                }
                ,
                error:function(xhr,status,error) {
                   // clickSuccess("请求失败.");
                }
            });

        }

        document.getElementById('search_input').onkeydown=keyDownSearch;

        function keyDownSearch(e) {
            // 兼容FF和IE和Opera
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                sercher();
                return false;
            }
            return true;
        }

        function sercher (){
            var seltype=$(".sele_type").text();
            var data=$(".subTitleBar_text1").val();
            var seldata=encodeURI(encodeURI(data));
            if($.trim(data)==''){
                return;
            }
            if (seltype == "课程") {
                window.location.href = "/site/course/selectCourse1.htm?courseTitle=" + seldata;
            }
            if (seltype == "学校") {
                window.location.href = "/site/selectschool.htm?orgname=" + seldata;
            }
            if (seltype == "教师") {
                window.location.href = "/site/selectteacher.htm?name=" + seldata;
            }
            if (seltype == "课表") {
                window.location.href = "/site/toselectPtCourse.htm?theme=" + seldata;
            }
            if (seltype == "课海") {
                window.location.href = "/site/toselectVideoCourse.htm?theme=" + seldata;
            }
        }

        $('#schI_attention').click(function(){ attention($(this),0) })
        $('#schI_joinsch').click(function(){ savePersonnel() })
        $('#schI_searchbtn').click(function(){ sercher() })

    }
	return{
        topf:topf
        //top:top  //用headerDo.init()方法代替
	}
	
})



















