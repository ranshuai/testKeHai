/**
 * Created by slg on 2016/1/8.
 */
define('scheduleManagementDo',['jquery','loadVersionAndMatch','dialogs', 'pageBar', 'common', 'money', 'knowledgePoint','loadVersionAndMatch','jquery_ui_min',
    'jquery_iframe_transport', 'jquery_fileupload', 'fileupload_process','fileupload_validate'
],function($,loadVersionAndMatch,dialogs, pageBar, common, money, knowledgePoint,loa){

    var auditSetting=function(){

        /* --------------------------------------[匹配教师]-------------------------------------- */
        dialogs._initBaseDialog(null);

        $(document).on("click",'#courseTeacher', function () {
            $("#org").attr("class", "blue");
            $("#platform").attr("class", "gray");
            loadVersionAndMatch.matchTeacher(null, $('#grade'), $('#subject'), $('#version'));
        });


        $("#cleanTeacher").on("click", function () {
            loa.cleanTeacher();
        });

        //切换本校共和平台
        $("#org").on("click", function () {
            $("#org").attr("class", "blue");
            $("#platform").attr("class", "gray");
            loa.matchTeacher($(this), $('#grade'), $('#subject'), $('#version'));
        });
        $("#platform").on("click", function () {
            $("#platform").attr("class", "blue");
            $("#org").attr("class", "gray");
            loa.matchTeacher($(this), $('#grade'), $('#subject'), $('#version'))
        });

        // 搜索教师
        $("#searchTeaBtn").live("click",function () {

            var org = $("#org").attr("class");
            var platform = $("#platform").attr("class");

            if ("blue" == org) var scope = "org";
            if ("blue" == platform) var scope = "platform";
            loa.loadSearchTeacher($("#name").val(), scope, 1);
        });
        /* --------------------------------------[匹配教师]-------------------------------------- */
        //旁听价格弹窗
        $('.sh_table').on('click','.setPriceJs',function() {
            var _this = this;
            dialogs._setPriceJsBox(function(){
                var SetPrice=$('.setPrice').val();
                if( SetPrice== ''){
                    dialogs._timer('请输入金额','2','2','');
                }else{
                    //更新后台数据
                    $.post("/orderDeal/setPtPrice.do",
                        "orderId="+$(_this).data("orderId") + "&orderPtPrice="+Math.ceil(parseFloat(SetPrice)*100),
                        function(resp){
                            if (common.checkResponse(resp) == false) return;
                            if (resp.resCode == "000"){
                                dialogs._timer('保存成功','1','2','');
                                $(_this).html( money.fmoney(parseFloat(SetPrice), 2) + "元/小时").removeClass();
                                $(_this).siblings("td.gray").addClass('section').removeClass('gray');
                                $(_this).siblings("td.section").data("orderId", $(_this).data("orderId"));
                                window.location.href = "/courses/ctManage.htm";
                            }else{
                                dialogs._timer("设置旁听价格失败", '2', '2', null);
                            }
                        },"json");
                };
            }, null);
            var time = parseInt($(_this).data("time"))/60;
            var pp = ((parseFloat($(_this).data("price"))/time/10)/100).toFixed(2);
            $(".setPrice").attr("placeholder", "不低于"+ pp);
            $(".setPrice").data("price",pp);
        });
        //详情页弹框

        $(".detail_course").live('click', function () {
            var ptId = $(this).attr("data");
            //console.log("ptId-->" + ptId);
            dialogs._ptCoursePreview();
            $.post("/ptCourse/find.do", {ptId:ptId}, function(resp){
               if (resp.resCode == "000"){
                   //console.log(resp.data.ptCourse);
                   var ptCourse = resp.data.ptCourse;
                   $("#grade").text(common.df.grade(ptCourse.gradeId));
                   $("#subject").text(common.df.dataCode(ptCourse.subjectId));
                   $("#classStartTime").text(new Date(parseFloat(ptCourse.classStartTime)).format('yyyy-MM-dd hh:mm'));
                   $("#ptPrice").text(money.fmoney(parseInt(ptCourse.ptPrice)/100*(ptCourse.courseTime)/60));
                   $("#courseTitle").text(ptCourse.theme);
                   if (ptCourse.courseResId=="0"){
                       $("#fileImg").attr('src', JS_BASEURL + "/images/class.png");
                   }else{
                       $("#fileImg").attr('src', "/file/loadImage/"+ptCourse.courseResId+''+".r");
                   }
                   //console.log(ptCourse.courseWareResId);
                   if (ptCourse.courseWareResId == "0"){
                        $("#ware").hide();
                        $(".blue, .loadFile").hide();
                        $("#wareText").text("暂无课件");
                   }else{
                       var type = ptCourse.courseWareFileType;
                       $("#wareText").text(ptCourse.courseWare);
                       $("#ware").attr('src', JS_BASEURL + "/images/" + common.df.courseImageType(type) + ".png");
                   }
                   var kps = ptCourse.knowledgePoints;
                   var topics = ptCourse.topics;
                   if (kps == ""){
                       $("#preIDs").append("<span>暂无知识点</span>");
                   }else{
                       $.each(kps.split(','), function(index, value){
                           //console.log($("value").text());
                           $("#preIDs").append("<span>"+knowledgePoint.getNameById(value)+"</span>&nbsp;&nbsp;&nbsp;");
                       });
                   }
                   if (topics == ""){
                       $("#topics").append("<span class='font18' style='padding-left:20px;'>暂无题目</span>");
                   }else{
                       $.each(topics.split(','), function(index, value){
                           //console.log($(value).text());
                           if (value == "") return true;
                           var url = "/courses/" + value + "/preview.do";
                           $.post(url, function(resp){
                               if (resp.resCode == "000"){
                                   $("#topics").append(resp.data.content[0].content);
                               }else{
                                   $("#topics").append("<h3>无该题目的内容-->题"+value+"</h3>");
                               }
                           }, 'json');

                       });
                   }
                   $("#editor").append(ptCourse.courseDespText);
                   $("#planClass tr").append("<td class='tc'><div class=\"tl\" style='display: inline-block;'><strong >"+ptCourse.theme+"</strong></div></td>");
                   $("#planClass tr").append("<td><div class=\"tc\"><strong >"+new Date(parseFloat(ptCourse.classStartTime)).format('yyyy-MM-dd hh:mm')+"</strong></div></td>");
                   $("#planClass tr").append("<td></td>");
                   if (kps.length == 0){
                       $("#planClass tr td:last").append("<div class=\"tc\"><strong>暂无知识点</strong></div>");
                       return false;
                   }
                   $.each(kps.split(','), function(index, value){
                       $("#planClass tr td:last").append("<div class=\"tc\"><strong>"+knowledgePoint.getNameById(value)+"</strong></div>");
                   });
                   return false;
               }
            });


        });
        //节次安排展开
        $('.sh_table').delegate('.section','click',function(){
        //$('.section').live('click',function() {
            var _this = this;
            var pr = $(this).data("courseIndex");
            var orderid=$(_this).data("orderId");
            var courseMode=$(_this).data("courseMode");
            var salary=$(_this).data("salary");
            var orderTeacherid=$(_this).data("orderTeacherid");
            var maxPrice =$(_this).data("maxPrice");
            $(this).children().toggleClass('open');
            if ($(_this).data("clickFlag") == "1") {
                $(this).parent('tr').next('tr').toggle();
                $('.arrangementList').removeClass('hide');
                return true;
            }
            $.post('/courses/schedule.do', "orderId=" + $(_this).data("orderId"), function(resp){
                if (common.checkResponse(resp) == false) return;
                if (resp.data.resCode = "000"){


                    dialogs._initBaseDialog(null);
                    var list = resp.data.list;
                    var time = resp.data.time;
                    //console.log(parseInt(time) > 0);
                    var content = "<tr class=\"sectionArrangement hide\">" +
                        "<td colspan=\"5\">" +
                        "<ul class='arrangementList hide'>";
                    if (list != null && list.length > 0){
                        var copy = "";
                        $.each(list, function(index, value){
                            if (parseInt(time) > 0){
                                if(userFlag == "0"&&userId==orderTeacherid){
                                    copy = "<span class=\'copySection\'><a href=\"/courses/"+resp.data.courseMode+"/"+value.classId+"/copy.htm\">复制本节</a></span>";
                                }
                                if(userFlag != "0"){
                                    copy = "<span class=\'copySection\'><a href=\"/courses/"+resp.data.courseMode+"/"+value.classId+"/copy.htm\">复制本节</a></span>";
                                }
                            }
                            var tea="";
                            var price="";
                            if(userFlag == "0"){
                                price="<span class=\'ptPrice\'>"+money.fmoney(parseInt(salary)/100 * (parseInt(value.courseTime)/60),2)+"</span>";
                                //tea="<span class=\"speaker\"><em>"+value.name+"</em><input type='hidden' id='salary' value='"+salary+"'/><input type='hidden' id='salary' value='"+orderid+"'/><input type='hidden' id='salary' value='"+value.classId+"'/><input type='hidden' id='salary' value='"+maxPrice+"'/></span>";
                                tea="<span class=\"speaker\"><em></em><input type='hidden' id='salary' value='"+salary+"'/><input type='hidden' id='salary' value='"+orderid+"'/><input type='hidden' id='salary' value='"+value.classId+"'/><input type='hidden' id='salary' value='"+maxPrice+"'/></span>";
                            }else{
                                if(value.teacherId==0){
                                    tea="<p class=\"matchSpeaker \" id='teacher'><input type='hidden' id='salary' value='"+salary+"'/><input type='hidden' id='salary' value='"+orderid+"'/><input type='hidden' id='salary' value='"+value.classId+"'/><input type='hidden' id='salary' value='"+maxPrice+"'/><a class=\"matchingBtn\">匹配主讲人</a></p>";
                                }else{
                                    tea="<span class=\"speaker\"><em>"+value.name+"</em><input type='hidden' id='salary' value='"+salary+"'/><input type='hidden' id='salary' value='"+orderid+"'/><input type='hidden' id='salary' value='"+value.classId+"'/><input type='hidden' id='salary' value='"+maxPrice+"'/><a class=\"matchBtn\">重新匹配</a></span>";
                                }

                                price="<span class=\'ptPrice\'>"+money.fmoney(parseInt(value.ptPrice)/100 * (parseInt(value.courseTime)/60),2)+"</span>";
                            }


                            /*if (value.ptCourseStatus == "700104" || value.pushFlag != 0){
                                content += "<li class=\"pr\">" + "<div class=\"pa knowledgeName clearfix\">" +
                                    "<i class=\"serialNumber\"></i><em>第"+value.courseIndex+"节："+value.theme+"</em>" +
                                    tea+
                                    price+
                                    "<span class=\'ptModify\'>"+
                                    "<a href='javascript:;' data="+value.ptId+" class='detail_course'>详情</a>&nbsp;&nbsp;|&nbsp;&nbsp;" +
                                    //"<a href=\"javascript:;\" class=\"gray\">修改</a></a>" +  copy +
                                    "<a href=/courses/"+resp.data.courseMode+"/"+value.classId+"/modify.htm>修改</a>" +
                                    "</span>" +
                                    "</div>";
                            }else{*/
                                content += "<li class=\"pr\">" + "<div class=\"pa knowledgeName clearfix\">" +
                                    "<i class=\"serialNumber\"></i><em>第"+value.courseIndex+"节："+value.theme+"</em>" +
                                    tea+
                                    price+
                                    "<span class=\'ptModify\'>"+
                                    "<a href='javascript:;' data="+value.ptId+" class='detail_course'>详情</a>&nbsp;&nbsp;|&nbsp;&nbsp;" +
                                    "<a href=/courses/"+resp.data.courseMode+"/"+value.classId+"/modify.htm>修改</a>" +
                                    copy+
                                    "</span>" +
                                    "</div>";
                           /* }*/
                            if (value.courseWareResId == "0"){
                                content += "<div class=\"upload pa clearfix\">" +
                                    "<img src="+JS_BASEURL+"/images/uploadCourseware.png alt=\"\"/>" +
                                    "<label for='fileupload"+pr+index+"'>上传课件</label><input style='opacity:0; filter:alpha(opacity=0);' id='fileupload"+pr+index+"' type=\"file\" name=\"files[]\">" +
                                    "<input type='hidden' value="+value.classId+" \>"+
                                    "<span>允许上传课件类型：ppt、pptx、pdf、doc、docx，单个文件不大于10M</span>"+
                                    "</div>";
                            }else{
                                content += "<div class=\"courseName pa clearfix\">" +
                                    "<img src="+JS_BASEURL+"/images/"+common.df.courseImageType(value.courseWareFileType)+".png alt=\"\"/>" +
                                    "<em>"+value.courseWare+"</em>" +
                                    "<i class=\"delete\"></i>" +"<input type='hidden' value="+value.classId+" \>"+
                                    "</div>";
                                content += "<div class=\"upload pa clearfix hide\">" +
                                    "<img src="+JS_BASEURL+"/images/uploadCourseware.png alt=\"\"/>" +
                                    "<label for='fileupload"+pr+index+"'>上传课件</label><span>文件类型为：doc,docx,pptx,pdf,ppt</span><input class='' id='fileupload"+pr+index+"' type=\"file\" name=\"files[]\">" +
                                    "<input type='hidden' value="+value.classId+" \>"+
                                    "</div>";
                            }
                            content += "</li>";
                        });
                    }
                    if(resp.data.totalTime == null || parseInt(resp.data.coursesTime) > parseInt(resp.data.totalTime)){

                        if(userFlag == "0"&&userId==orderTeacherid){
                            content += "<li class=\"pr last\">"+
                                "<div class=\"pa knowledgeName\">"+
                                "<i class=\"serialNumber\"></i>"+
                                "<a href='javascript:;'><button type='button' class='btn w90 c_bg_color1 nCourse'>排新课</button></a>"+
                                "<a href='javascript:;'><button type='button' class='btn w90 c_bg_color1 scheduling'>批量排课</button></a>"+
                                "</div>"+
                                "</li>";
                        }
                        if(userFlag != "0"){
                            content += "<li class=\"pr last\">"+
                                "<div class=\"pa knowledgeName\">"+
                                "<i class=\"serialNumber\"></i>"+
                                "<a href='javascript:;'><button type='button' class='btn w90 c_bg_color1 nCourse'>排新课</button></a>"+
                                "<a href='javascript:;'><button type='button' class='btn w90 c_bg_color1 scheduling'>批量排课</button></a>"+
                                "</div>"+
                                "</li>";
                        }

                    }
                    content += "</ul>"+
                        "</td>"+
                        "</tr>";
                    $(_this).parents("tr").after(content);
                    $(_this).parent('tr').next('tr').toggle();
                    $('.arrangementList').removeClass('hide');
                    $(_this).data("clickFlag", 1);
                    $('.nCourse').click(function(){
                        window.location.href = '/courses/'+courseMode+'/'+orderid+'/pk.htm';
                    });

                    $('.scheduling').click(function(){
                        window.location.href = '/courses/batch/pk.htm?orderid='+orderid;
                    });

                }
            }, 'json');
        });

        //节次匹配主讲人弹窗
        $('.sh_table').on('click','.matchingBtn',function(){
           var salary=$(this).parents("p").find("input").eq(0).val();
            var orderid=$(this).parents("p").find("input").eq(1).val();
            var classId=$(this).parents("p").find("input").eq(2).val();
            var maxPrice=$(this).parents("p").find("input").eq(3).val();
            matchingSpeaker('','','匹配主讲人',salary,1,orderid,classId,maxPrice);
        });
        //节次重新匹配主讲人弹窗
        $('.sh_table').on('click','.matchBtn',function(){
            var salary=$(this).parents("span").find("input").eq(0).val();
            var orderid=$(this).parents("span").find("input").eq(1).val();
            var classId=$(this).parents("span").find("input").eq(2).val();
            var maxPrice=$(this).parents("span").find("input").eq(3).val();
            matchingSpeaker('','','重新匹配主讲人',salary,1,orderid,classId,maxPrice);
        });

        //订单匹配主讲人弹窗
        $('.sh_table').on('click','.matchingBtnorder',function(){
            var salary=$(this).parents("td").find("input").eq(0).val();
            var orderid=$(this).parents("td").find("input").eq(1).val();
            var maxPrice=$(this).parents("td").find("input").eq(2).val();
            matchingSpeaker('','','匹配主讲人',salary,0,orderid,0,maxPrice);
        });
        //订单重新匹配主讲人弹窗
        $('.sh_table').on('click','.matchBtnorder',function(){
            var salary=$(this).parents("td").find("input").eq(0).val();
            var orderid=$(this).parents("td").find("input").eq(1).val();
            var maxPrice=$(this).parents("td").find("input").eq(2).val();
            matchingSpeaker('','','重新匹配主讲人',salary,0,orderid,0,maxPrice);
        });

        var matchingSpeaker = function(trueFn, falseFn, or,salary,type,orderid,classId,maxPrice){
                var d = dialogs._init();
                d.addClass('_matchingSpeaker').attr({'title': or});
                d.find('p').append($(
                    "<div class=\"popBox\" style=\"padding-left:50px\">"+
                    "<div class=\"form_list\">" +
                    "<div class=\"row\">" +
                    "<div class=\"formL\">" +
                    "<p>主讲人：</p>" +
                    "</div>" +
                    "<div class=\"formR\">" +
                    "<input type=\"hidden\" class=\"w180\" id='courseTeacherID'/>" +
                    "<input type=\"text\" class=\"w180\" id='courseTeacher'/>" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"row\">" +
                    "<div class=\"formL\">" +
                    "<p>课酬：</p>" +
                    "</div>" +
                    "<div class=\"formR lessonMoney\">" +
                    "<input type=\"text\" class=\"w180\" id='salary1' placeholder=''/><em class=\"orange hide\">"+salary/100+"</em>元"+
                    "</div>" +
                    "</div>" +
                    "<div class=\"tl lessonMoney hide\" style='color: red;padding-left:94px' id='wrong'>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                ))
                d.dialog({
                    autoOpen: true,
                    width: 600,
                    modal: true,
                    resizable: false,
                    close: function () {
                        $(this).remove();
                    },
                    buttons: [
                        {
                            text: "提交", click: function () {
                            if($('#courseTeacher').val().trim()==''){
                                $('#wrong').text('请选择老师');
                                $('#wrong').removeClass('hide');
                                return;
                            }
                            if($('#salary1').attr('class').indexOf("hide")<0)
                            {
                                if($('#salary1').val().trim()==''){
                                    $('#wrong').text('请填写课酬');
                                    $('#wrong').removeClass('hide');
                                    return;
                                }
                            }
                            if($('#salary1').val().trim()<0){
                                $('#wrong').text('课酬金额不能小于零');
                                $('#wrong').removeClass('hide');
                                return;
                            }

                            var num = $('#salary1').val().trim();
                            if(!isNaN(num)){
                                var dot = num.indexOf(".");
                                if(dot != -1){
                                    var dotCnt = num.substring(dot+1,num.length);
                                    if(dotCnt.length > 2){
                                        $('#wrong').text('小数位已超过2位');
                                        $('#wrong').removeClass('hide');
                                        return;
                                    }
                                }
                            }else{
                                $('#wrong').text('课酬金额不合法');
                                $('#wrong').removeClass('hide');
                                return;
                            }

                            if(Number($('#salary1').val().trim())>Number(maxPrice)){
                                $('#wrong').text('课酬金额不能超过课程单价');
                                $('#wrong').removeClass('hide');
                                return;
                            }
                            var salary=$('#salary1').val();
                            if($('#salary1').val()!=''){
                                salary=salary*100;
                            }
                            $.ajax({
                                url: "/courses/assignTeacher.do",
                                type: "post",
                                dataType: "json",
                                data: {
                                    orderId: orderid,
                                    classId: classId,
                                    teacherId: $('#courseTeacherID').val(),
                                    teacherName: $('#courseTeacher').val(),
                                    type:type,
                                    salary:salary
                                },
                                success: function (response) {

                                    //console.log(response.resCode);

                                    if ("000" == response.resCode) {
                                        window.location.reload();
                                    }
                                }
                            });


                            if (trueFn)trueFn();
                            $(this).remove()
                        }
                        },
                        {
                            text: "取消", click: function () {
                            if (falseFn)falseFn();
                            $(this).remove()
                        }
                        }
                    ]
                });

                $('._matchingSpeaker').parent().addClass('dialogs_box _matchingSpeaker');
                $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');

                if(salary==0&&maxPrice!=0.00){
                    $('.lessonMoney').children('input').removeClass('hide').siblings('em').addClass('hide')
                }else{
                    $('.lessonMoney').children('em').removeClass('hide').siblings('input').addClass('hide')
                }

            $("#salary1").attr("placeholder", "金额不得大于 " + money.fmoney(maxPrice, 2));

        }



        //上传课件
        $('.arrangementList li').live('click','input[id^="fileupload"]',function(){

            var classId  = $(this).find('input[type=hidden]').eq(2).val();
            var $this = this;

            //debugger;

            $(this).fileupload({
                "acceptFileTypes": /(\.|\/)(doc|docx|pptx|pdf|ppt)$/i,
                "maxFileSize":1024*1024*10,
                "done": function (e, data, response) {
                    //console.log(data);
                    var resId = data.result.data.ids;
                    var file = data.files[0];
                    //console.log(file);
                    var fileName = file.name.substring(0, file.name.lastIndexOf('.'));
                    //console.log(fileName);
                    var fileType = file.name.substring(file.name.lastIndexOf('.')+1);

                    $.post("/ptCourse/upload.do", {
                        "classId":classId,
                        "courseWareResId":resId
                    }, function(resp){
                        if (resp.resCode == "000"){
                            dialogs._timer("上传成功", 1, 2, function(){
                                //console.log($this);
                                $($this).append("<div class=\"courseName pa clearfix\">" +
                                    "<img src="+JS_BASEURL+"/images/"+ fileType +".png alt=\"\"/>" +
                                    "<em>"+ fileName+"</em>" +
                                    "<i class=\"delete\"></i>" +"<input type='hidden' value="+classId+" \>"+
                                    "</div>");
                                $($this).children('.upload').hide();
                            })
                        }else{
                            dialogs._timer("上传失败", 2, 2, null);
                        }
                    }, 'json');

                },
                "processfail": function (e, data) {
                    var index = data.index, file = data.files[index];
                    var fileSize = file.size;
                        if (fileSize > 1024*1024*10){
                        dialogs._timer("上传的文件太大了",2,2, null);
                    }
                    else {
                        dialogs._timer("文件类型错误--->支持的文件类型(doc,docx,pptx,pdf,ppt)",2,2, null);
                    }
                },
                "url": '/file/upload.se',
                "autoUpload": true,
                "formData": {},
                "dataType": 'json'
            });

          $($this).find("input").blur();
        });

            //删除课件
        $('.delete').live("click", function(){
            var $this=$(this);
            dialogs._confirm('确定删除吗？','提示',function(){
                var classId = $this.siblings("input[type=hidden]").val();
                //console.log(classId);
                $.post("/ptCourse/delFile.do", {
                    "classId":classId,
                    "courseWareResId":11
                }, function(resp){
                    if (resp.resCode == "000"){
                        dialogs._timer("删除成功", 1, 2, function(){
                            $this.parent().siblings('.upload').removeClass('hide').css('display','block');
                            $this.parent().siblings('.upload').children('input').css({'opacity':'0','filter':'alpha(opacity=0)'});
                            $this.parent().remove();
                            //location.reload();
                        })
                    }else{
                        dialogs._timer("删除失败", 2, 2, null);
                    }
                }, 'json');

            });

        });

        //搜索
        $("#searchBtn").on("click", function(){
            loadOrderList($(".r_search_wrap_txt").val(), 1);
        });
    };

    /**
     * 页面内容填充
     * @param resp
     */
    function appendOrderList2Html(resp){
        $("tbody").empty();
        if (common.checkResponse(resp) == false) return;
        var count = resp.data.countSize;
        $("#count").text("共有"+count+"门课程");
        if (count == 0) return;
        $("tbody").append("<tr><th>课程名</th><th>学生</th><th>"+(userFlag == "0"?"":"主讲人")+"</th><th>"+(userFlag == "0"?"课酬":"旁听价格")+"</th><th>操作</th></tr>");
        var list = resp.data.list;
        $.each(list, function(index, value){
           var maxPrice= (value.orderActualPrice/100)/(value.coursesTime/60);
            var pt = "";

            if(userFlag == "0"){
                $('.scheduleManagement table').addClass('tea_table');
                $('.tea_table').children('colgroup').children('col').eq(2).attr('width','0');
                $('.tea_table').children('colgroup').children('col').eq(3).attr('width','150px');
                $('.tea_table').children('colgroup').children('col').eq(4).attr('width','200px');


                //pt = "<td>"+money.fmoney(parseInt(value.salary)/100,2)+'元/小时'+"</td>"+ "<td class=\"section course"+index+"\" >节次安排<i class=\"close\"></i></td>";
                pt = "<td></td>"+ "<td class=\"section course"+index+"\" >节次安排<i class=\"close\"></i></td>";
            }else{
                if (parseInt(value.orderPtPrice) == -1){
                    if (userFlag == "0" || userFlag == "1"){
                        pt = "<td class=\"money\">未设置价格</td>" + "<td class=\"gray\">节次安排<i class=\"close\"></i></td>";
                    } else{
                        pt = "<td class=\"setPriceJs money"+index+"\">设置价格</td>" + "<td class=\"gray\">节次安排<i class=\"close\"></i></td>";
                    }
                }else{
                    pt = "<td>"+money.fmoney(parseInt((userFlag == "0"?value.salary:value.orderPtPrice))/100,2)+'元/小时'+"</td>"+ "<td class=\"section course"+index+"\" >节次安排<i class=\"close\"></i></td>";
                }
            }


            var tea="";

            if(userFlag == "0"){//如果老师身份显示课酬
                //tea = "<td>"+value.name+"<input type='hidden' id='salary' value='"+value.salary+"'/><input type='hidden' id='salary' value='"+value.id+"'/><input type='hidden' id='salary' value='"+maxPrice+"'/></td>";
                tea = "<td><input type='hidden' id='salary' value='"+value.salary+"'/><input type='hidden' id='salary' value='"+value.id+"'/><input type='hidden' id='salary' value='"+maxPrice+"'/></td>";
            }else{
                if(value.teacherId!=0){
                    tea = "<td>"+value.name+"<input type='hidden' id='salary' value='"+value.salary+"'/><input type='hidden' id='salary' value='"+value.id+"'/><input type='hidden' id='salary' value='"+maxPrice+"'/><a class=\"matchBtnorder\">重新匹配</a></td>";
                }else{
                    tea = "<td><input type='hidden' id='salary' value='"+value.salary+"'/><input type='hidden' id='salary' value='"+value.id+"'/><input type='hidden' id='salary' value='"+maxPrice+"'/><a class=\"matchingBtnorder\">匹配主讲人</a></td>";
                }
            }
            var content = "<tr>"+
                            "<td class='tl'><span class='tl' style='display: inline-block'>"+value.courseTitle+"</span></td>"+
                            "<td>"+(value.sNickName==''?value.sPhoneNumber:value.sNickName)+"</td>"+
                            //"<td>"+value.coursesId+"</td>"+
                            //"<td>"+value.nickName+"&nbsp;&nbsp;|&nbsp;&nbsp;<a class=\"matchBtn blue\">重新匹配</a></td>"+
                            //"<td><a class=\"matchingBtn blue\">匹配主讲人</a></td>"+
                           tea+pt+
                          "</tr>";
            $("tbody").append(content);
            $(".money"+index).data("orderId", value.id);
            $(".course" + index).data("orderId", value.id);
            $(".course" + index).data("courseMode", value.courseMode);
            $(".course" + index).data("courseIndex", index);
            $(".course" + index).data("salary",value.salary);
            $(".course" + index).data("orderTeacherid",value.teacherId);
            $(".course" + index).data("maxPrice",maxPrice);
            $(".money" +index).data("price", value.orderPrice);
            $(".money" +index).data("time", value.coursesTime);
        });
    }

    var loadOrderList= function(courseTitle, currPage){
        var url = "/courses/ctManage.do";
        var temp = courseTitle;
        var data = "currPage="+currPage+"&courseTitle=" + courseTitle;
        $.ajax({
            url:url,
            type:'post',
            data:data,
            dataType:'json',
            success:function(resp){
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    appendOrderList2Html(resp);
                    var params = new Array();

                    params.push(temp);
                    pageBar.setBasePageBar(resp.data.totalPages, resp.data.currPage, loadOrderList, params);
                }
            },
            error:function(resp){
                dialogs._wait("加载数据失败", 2, null);
            }
        });
    }

    return{
        auditSetting:auditSetting,
        loadOrderList:loadOrderList
    }

});
