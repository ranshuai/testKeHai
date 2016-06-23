define(["jquery","common","pageBar","loadAreaAndMatch","dialogs","qrcode","njs","jquery_md5", 'module/sanhai_buttonCountdown',
        "lib/jquery_validate/jquery.validate", "lib/jquery_validate/addkehai_validate",
        "lib/jquery_validate/messages_zh"],
    function($,common,pageBar,are,dialogs){
        $(".changeCodeImg").click(function(){
            common.changeImg('imgObj');
        });
        /*tab切换*/
        $('.tab .tabList li').click(function() {
            var index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();

            switch(index){
                case 0 :
                    loadTeachData(1);//老师
                    break;
                case 1 :
                    loadCounselorData(1);//咨询师
                    break;
                case 2 :
                    loadUniStuData(1);//大学生
                    break;
                case 3 :
                    loadStuData(1);//学生
                    break;
                case 4 :
                    loadPotentialData(1);   //潜在客户
                    break;
            }

            if(index<3 ){
                $('.clearfix li input').removeAttr("checked");
                $('.clearfix li input').eq(index).attr("checked",true);
            }
        });

        /*-----加载数据-----*/
        loadTeachData(1);//老师

        /*------------------------------------------------------------   弹窗开始           -----------------------------------------*/
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

        are.loadAreaAndMatch($("#prov"), $("#country"), $("#city"), null, null);
        /*添加*/
        $('.pushBtnJs_add').click(function() {

            phoneNumberOld="";
            //显示隐藏的字段
            $("#div_password_checkNum").removeClass("hide");

            //每次打开弹框的时候，清空错误信息。
            $('.error_message').each(function(){
               $(this).html("");
            });

            //每次打开的时候把省市区清空
            $('#provEM').attr("code",null).text("选择省");
            $('#countryEM').attr("code",null).text("选择地区");
            $('#cityEM').attr("code",null).text("选择县");

            //每次打开的时候，重置form表单。
            $("#name").removeAttr("readonly");
            $("#phoneNumber").removeAttr("readonly");
            $("#phoneNumber").css("background","none");
            $("#sendCheckCode").removeAttr("disabled").text(oldText);
           /* $("#div_password").parent().removeClass("hide");
            $("#div_checkNum").parent().removeClass("hide");*/
            $('#personnelForm')[0].reset();

            window.clearInterval(interval);
            $("#pushNotice_add").dialog("open");
            $("#consultant_delete").dialog("close");

            //每次打开重新加载图片验证
            $("#sendCheckCode").attr("sended","false");
            common.changeImg('imgObj');

            //若为咨询师，需添加选择条件
            if($('.personnel_management a.ac').text()=='咨询师'){
                $('.consult_message_add').removeClass('hide').parents('.pop_cont').css('width','540px');
            }else{
                $('.consult_message_add').addClass('hide').parents('.pop_cont').css('width','460px')
            }
            return false;
        });

        $(".clearfix :radio").click(function(){

            phoneNumberOld="";
            //显示隐藏的字段
            $("#div_password_checkNum").removeClass("hide");

            //每次打开弹框的时候，清空错误信息。
            $('.error_message').each(function(){
                $(this).html("");
            });

            //每次打开的时候把省市区清空
            $('#provEM').attr("code","null").text("选择省");
            $('#countryEM').attr("code","null").text("选择地区");
            $('#cityEM').attr("code","null").text("选择县");

            //每次打开的时候，重置form表单。
            $("#name").removeAttr("readonly");
            $("#phoneNumber").removeAttr("readonly");
            $("#phoneNumber").css("background","none");
            $("#sendCheckCode").removeAttr("disabled").text(oldText);
            /*$("#div_password").parent().removeClass("hide");
            $("#div_checkNum").parent().removeClass("hide");*/
            $('#personnelForm')[0].reset();

            window.clearInterval(interval);

            //每次打开重新加载图片验证
            $("#sendCheckCode").attr("sended","false");
            common.changeImg('imgObj');

            $("input[name='userIdentity'][value='"+$(this).val()+"']").attr("checked",true);

            if($(this).val()=='4'){
                $('.consult_message_add').removeClass('hide').parents('.pop_cont').css('width','540px');
            }else{
                $('.consult_message_add').addClass('hide').parents('.pop_cont').css('width','460px')
            }
        });

        //清除选项
        $('.cancelBtn').click(function() {
            $(".tch_bundling,.potential_customers,.consultant_delete").dialog("close");
        })
        /*------------------------------------------------------------   弹窗结束            -----------------------------------------*/

        $("#personnelForm").validate({
            submitHandler: function(form){

                var userIdentity =  $("input:radio[name=userIdentity]:checked").val();

                $("#password").val($.md5($("#password").val()).toUpperCase());

                if(userIdentity ==4){
                    var provId = $("#provEM").attr("code");
                    var prov = $("#provEM").text();
                    var countryId = $("#countryEM").attr("code");
                    var country = $("#countryEM").text();
                    var cityId = $("#cityEM").attr("code");
                    var city = $("#cityEM").text();

                    if ("null" == countryId && "null" == cityId) {
                        var addressCode = provId;
                        var address = prov;
                    } else if ("null" != countryId && "null" == cityId) {
                        var addressCode = provId + "," + countryId;
                        var address = prov + "," + country;
                    } else if ("null" != countryId && "null" != cityId) {
                        var addressCode = provId + "," + countryId + "," + cityId;
                        var address = prov + "," + country + "," + city;
                    }

                    $("input[name='areaCode']").val(addressCode);
                    $("input[name='areaName']").val(address);
                }

                $.ajax({
                    url:"/personnel/savePersonnel.do",
                    type:"post",
                    data:$(form).serialize(),
                    success:function(data){

                        if(userIdentity ==4){
                            if (data.resCode == "303") {
                                dialogs._confirm(data.resMsg,"添加咨询师",function(){
                                    addCounselor();
                                },"");
                            }else{
                                loadCounselorData(1);//咨询师
                            }
                        }

                        if(common.checkResponse(data) == false){
                            $("#password").val("");
                            return;
                        }

                        if(userIdentity ==0){
                            loadTeachData(1);//老师
                        }else if(userIdentity ==1){
                            loadUniStuData(1);//大学生
                        }
                        dialogs._timer("添加成功",1,2,function(){
                            $("#pushNotice_add").dialog("close");
                        });
                    }
                });
            },
            rules: {
                phoneNumber: {
                    required: true,
                    isAccount:true
                },
                password  : {
                    required: true,
                    isPassword:true,
                    minlength: 6,
                    maxlength:20
                },
                checkNum: {
                    required: true
                },
                name: {
                    required: true,
                    stringCheck:true
                },
                trainCourseType:{
                    required:true
                },
                trainTypeId:{
                    required:true
                },
                prov:{
                    min:1
                },
                country:{
                    min:1
                },
                city:{
                    min:1
                },
                code:{
                    isPassword:true,
                    required: true,
                    remote: {
                        url: "/register/isCode.do",     //后台处理程序
                        type: "post",               //数据发送方式
                        dataType: "json",           //接受数据格式
                        data: {                     //要传递的数据
                            account: function() {
                                return $("#code").val();
                            }
                        }
                    }
                }
            },
            messages: {
                phoneNumber: {
                    required: "<i></i>手机号不能为空<b></b>",
                    remote:"<i></i>已有机构或身份不符<b></b>"
                },
                password: {
                    required: "<i></i>密码不能为空<b></b>"
                },
                checkNum: "<i></i>短信验证码不能为空<b></b>",
                name:{
                    required:"<i></i>姓名不能为空<b></b>",
                    stringCheck:"<i></i>只包含中文,字母,数字,_<b></b>"
                },
                code:{
                    required:"<i></i>请先填写图片验证<b></b>",
                    remote:"<i></i>图片验证码错误<b></b>"
                },
                prov:{min:"<i></i>请选择完整所在地<b></b>"},
                country:{min:"<i></i>请选择完整所在地<b></b>"},
                city:{min:"<i></i>请选择完整所在地<b></b>"}
            },
            focusCleanup:true,
            errorElement :"em",
            errorPlacement: function(error, element) { //指定错误信息位置
                error.appendTo(element.parents(".error_show").find(".error_message"));
            }
        });

        var interval;
        var oldText;
        $("#sendCheckCode").click(function(){

            var obj = $(this);

            if("true"==obj.attr("sended")){
                $("#code").val("");
                common.changeImg('imgObj');
                obj.attr("sended","false");
                return;
            }

            if( !$("#phoneNumber").valid()){
                return;
            }
            if( !$("#code").valid()){
                return;
            }

            $("#phoneNumber").attr("readonly","true");
            $("#phoneNumber").css("background","#bfbfbf");

            oldText = obj.text();
            interval = obj.countdown(60);
            $.ajax({
                type:"post",
                url:"/personnel/sendCode.do",
                data:{phoneNumber:$("#phoneNumber").val(),code:$("#code").val()},
                success:function(data){
                    if(common.checkResponse(data) == false){
                        obj.removeAttr("disabled").text(oldText);
                        window.clearInterval(interval);
                        $("#password").val("");
                        common.changeImg('imgObj');
                        $("#phoneNumber").removeAttr("readonly");
                        $("#phoneNumber").css("background","");
                        return;
                    }
                    obj.attr("sended","true");
                },
                error:function(data) {
                    obj.removeAttr("disabled").text(oldText);
                    window.clearInterval(interval);
                    $("#phoneNumber").removeAttr("readonly");
                    $("#phoneNumber").css("background","");
                }
            });
        });

        function loadTeachData(page){
            var queryItem = "";
            if($("#queryTea").val()){
                queryItem = $("#queryTea").val();
            }
            var totalPages = 0;
            $.ajax({
                url: "/personnel/listPersonnelTeaData.do",
                type: "post",
                data:{page:page,queryItem:queryItem},
                dataType: "json",
                success: function (data) {
                    countSize = data.data.countSize;
                    $("tbody").eq(0).empty();
                    $(".countRow").eq(0).text("共有"+countSize+"条结果");
                    $.each(data.data.list ,function(index){
                        var src ="/front/sanhai/images/person.png";
                        if(this.ppResId){
                            src = '/file/loadImage/'+this.ppResId+'.r';
                        }

                        var tr = "<td class='tl'><img src='"+src+"' width='60px' height='60px'/>"+this.name+"</td>" +
                            "<td>" + this.phoneNumber + "</td>" +
                            "<td>" + getProfessional(this.professionalTitle) + "</td>" +
                            "<td>"+this.seniority+"</td>" +
                            "<td>"+ getDegree(this.highestDegree) +"</td>" +
                            "<td class='ope_td'><a href='javascript:;' onclick='relieveBind(this)' userId='"+this.userId+"' role='teacher' class='pushBtnJs'>解绑</a> <span>|</span> <a href='/site/theacher/" + this.userId +"/toTeacherIndex.htm' class='reject'>详情</a> </td>" +
                            "</tr>";

                        if(index ==0 ){
                            tr = "<tr class='firstTr'>" + tr;
                        }else{
                            tr = "<tr>" + tr ;
                        }

                        $("tbody").eq(0).append(tr);
                    });
                    totalPages = data.data.totalPages;
                    pageBar.showPageBar(page,totalPages,loadTeachData);
                },
                error: function () {}
            });

        }

        function loadCounselorData(page){
            var queryItem = "";
            if($("#queryCounse").val()){
                queryItem = $("#queryCounse").val();
            }
            var totalPages = 0;
            $.ajax({
                url: "/personnel/listPersonnelCounData.do",
                type: "post",
                data:{page:page,queryItem:queryItem},
                dataType: "json",
                success: function (data) {
                    countSize = data.data.countSize;
                    $("tbody").eq(1).empty();
                    $(".countRow").eq(1).text("共有"+countSize+"条结果");

                    $.each(data.data.list ,function(index){
                        var src ="/front/sanhai/images/person.png";
                        if(this.ppResId){
                            src = '/file/loadImage/'+this.ppResId+'.r';
                        }
                        var tr = "<td class='tl'><img src='"+src+"' width='60px' height='60px'/>"+this.name+"</td>" +
                            "<td>" + this.phoneNumber + "</td>" +
                            "<td class='ope_td'><button class='btn w80 deleteJs' onclick='delAdviser(this)' userId='"+this.userId+"' userName='"+this.name+"'>删除</button></td>" +
                            "</tr>";

                        if(index ==0 ){
                            tr = "<tr class='firstTr'>" + tr;
                        }else{
                            tr = "<tr>" + tr ;
                        }

                        $("tbody").eq(1).append(tr);

                        /* $("<option value='"+this.userId+"'>'"+this.name+"'</option>").appendTo("#receive_person");*/

                    });
                    totalPages = data.data.totalPages;
                    pageBar.showPageBar(page,totalPages,loadCounselorData);
                },
                error: function () {}
            });

        }

        function loadUniStuData(page){
            var queryItem = "";
            if($("#queryUniStu").val()){
                queryItem = $("#queryUniStu").val();
            }
            $.ajax({
                url: "/personnel/listPersonnelUniStuData.do",
                type: "post",
                data:{page:page,queryItem:queryItem},
                dataType: "json",
                success: function (data) {
                    countSize = data.data.countSize;
                    $("tbody").eq(2).empty();
                    $(".countRow").eq(2).text("共有"+countSize+"条结果");
                    $.each(data.data.list ,function(index){
                        var src ="/front/sanhai/images/person.png";
                        if(this.ppResId){
                            src = '/file/loadImage/'+this.ppResId+'.r';
                        }
                        var tr = "<td class='tl'><img src='"+src+"' width='60px' height='60px'/>"+this.name+"</td>" +
                            "<td>" + this.phoneNumber + "</td>" +
                            "<td>" + this.school + "</td>" +
                            "<td>" + this.major + "</td>" +
                            "<td class='ope_td'> <a href='javascript:;' onclick='relieveBind(this)' userId='"+this.userId+"' role='uniStu' class='pushBtnJs'>解绑</a> <span>|</span> <a href='/site/theacher/" + this.userId +"/toTeacherIndex.htm' class='reject'>详情</a></td>" +
                            "</tr>";

                        if(index ==0 ){
                            tr = "<tr class='firstTr'>" + tr;
                        }else{
                            tr = "<tr>" + tr ;
                        }

                        $("tbody").eq(2).append(tr);
                    });
                    pageBar.showPageBar(page,data.data.totalPages,loadUniStuData);
                },
                error: function () {}
            });
        }

        function loadStuData(page){
            var queryItem = "";
            if($("#queryStu").val()){
                queryItem = $("#queryStu").val();
            }
            $.ajax({
                url: "/personnel/listPersonnelStuData.do",
                type: "post",
                data:{page:page,queryItem:queryItem},
                dataType: "json",
                success: function (data) {
                    countSize = data.data.countSize;
                    $("tbody").eq(3).empty();
                    $(".countRow").eq(3).text("共有"+countSize+"条结果");
                    $.each(data.data.list ,function(index){
                        var src ="/front/sanhai/images/person.png";
                        if(this.ppResId){
                            src = '/file/loadImage/'+this.ppResId+'.r';
                        }
                        var tr = "<td class='tl'><img src='"+src   +"' width='60px' height='60px'/>"+this.nickName+"</td>" +
                            "<td>" + this.phoneNumber + "</td>" +
                            "<td>" + this.course + "</td>" +
                            "<td class='ope_td'> <a href='javascript:;' onclick='relieveBind(this)' userId='"+this.userId+"' role='student' class='pushBtnJs'>解绑</a> <span>|</span> <a href='/personnel/"+""+this.userId+""+"/studentDetail.htm' class='reject'>详情</a></td>" +
                            "</tr>";

                        if(index ==0 ){
                            tr = "<tr class='firstTr'>" + tr;
                        }else{
                            tr = "<tr>" + tr ;
                        }

                        $("tbody").eq(3).append(tr);
                    });
                    pageBar.showPageBar(page,data.data.totalPages,loadStuData);
                },
                error: function () {}
            });
        }

        function loadPotentialData(page){

            var totalPages = 0;
            $.ajax({
                url: "/personnel/listPersonnelPotentialData.do",
                type: "post",
                data:{page:page},
                dataType: "json",
                success: function (data) {
                    countSize = data.data.countSize;
                    var userIdentity = data.data.userIdentity;
                    $("table").eq(4).empty();
                    var table_head = "";
                    var table_body = "";
                    // 4:课程顾问 3:机构创建者
                    if(userIdentity == 4){
                        table_head = '<colgroup>'+
                            '<col width="270px" />'+
                            '<col width="210px" />'+
                            '<col width="80px" />'+
                            '</colgroup>'+
                            '<tr>'+
                            '<th>客户详细</th>'+
                            '<th>咨询内容</th>'+
                            '<th>操作</th>'+
                            '</tr>';
                        $.each(data.data.list ,function(index){
                            if(index ==0 ){
                                table_body += "<tr class='firstTr'>";
                            }else{
                                table_body += "<tr>";
                            }
                            var userPhone = this.userPhone != ''? '(手机：'+this.userPhone+')':'';
                            table_body += '<td>'+this.userName + userPhone + '</td>'+
                                '<td style="text-align:left">' + this.consultContent + '</td>'+
                                '<td class="ope_td">'+
                                '<a href="javascript:;" class="pushBtnJs_pot" onclick="potentialComment(this,\''+this.id+'\')">备注</a>'+
                                '<span>|</span>'+
                                '<a href="javascript:;" class="reject" onclick="potentialEdit(this,\''+this.id+'\')">编辑</a>'+
                                '</td>'+
                                '</tr>';
                        });
                    }else if(userIdentity == 3){
                        table_head = '<colgroup>'+
                            '<col width="270px" />'+
                            '<col width="210px" />'+
                            '<col width="150px" />'+
                            '<col width="130px" />'+
                            '<col width="80px" />'+
                            '</colgroup>'+
                            '<thead><tr>'+
                            '<th>客户详细</th>'+
                            '<th>咨询内容</th>'+
                            '<th>所属客服编号</th>'+
                            '<th>客服姓名</th>'+
                            '<th>操作</th>'+
                            '</tr></thead>';
                        $.each(data.data.list ,function(index){
                            if(index ==0 ){
                                table_body += "<tr class='firstTr'>";
                            }else{
                                table_body += "<tr>";
                            }
                            var userPhone = this.userPhone != ''? '(手机：'+this.userPhone+')':'';
                            table_body += '<td>'+this.userName + userPhone + '</td>'+
                                '<td style="text-align:left">' + this.consultContent + '</td>'+
                                '<td>' + this.serviceUserId + '</td>'+
                                '<td>' + this.serviceUserName + '</td>'+
                                '<td class="ope_td">'+
                                '<a href="javascript:;" class="pushBtnJs_pot" onclick="potentialComment(this,\''+this.id+'\')">备注</a>'+
                                '<span>|</span>'+
                                '<a href="javascript:;" class="reject" onclick="potentialEdit(this,\''+this.id+'\')">编辑</a>'+
                                '</td>'+
                                '</tr>';
                        });
                    }

                    $("table").eq(4).append(table_head);
                    $("table").eq(4).append(table_body);

                    totalPages = data.data.totalPages;
                    pageBar.showPageBar(page,totalPages,loadPotentialData);
                },
                error: function () {}
            });
        };

        //潜在客户备注
        this.potentialComment = function(obj,id){
            $("#notice_textarea").val($(obj).parents("tr").children("td").eq(1).text());
            $("#potential_customers").dialog("open");

            $("#potential_customers .determineBtn").unbind('click');
            $("#potential_customers .determineBtn").bind('click',function(){
                var consultContent = $("#notice_textarea").val();
                $.ajax({
                    url: "/personnel/savePotentialData.do",
                    type: "post",
                    data:{
                        id:id,
                        consultContent:consultContent
                    },
                    success:function(data){
                        if(data.resCode == '000'){
                            $("#potential_customers").dialog("close");
                            loadPotentialData(1);
                        }
                    }
                });
            });
        };

        //潜在客户编辑
        this.potentialEdit = function(obj,customer_id){
            window.location.href = "/personnel/" + customer_id + "/editCustomer.htm";
        };

        //解绑
        this.relieveBind = function(obj){
             var userId = $(obj).attr("userId");
             var role = $(obj).attr("role");

             if(role == 'teacher'){
                $("#bundling_text").text("解绑后此教师将于本校失去合作关系，请慎重！");
             }else if(role == 'student'){
                $("#bundling_text").text("解绑后此学生将于本校失去关联关系，请慎重！");
             }else if(role == 'uniStu'){
                $("#bundling_text").text("解绑后此教师将于本校失去合作关系，请慎重！");
             }

             $("#tch_bundling").dialog("open");
             $("#tch_bundling_enter").unbind('click');
             $("#tch_bundling_enter").bind('click',function(){
                 $.ajax({
                     url:"/personnel/relieveBind.do",
                     type:"get",
                     data:{userId:userId,role:role},
                     success:function(data){
                         $("#tch_bundling").dialog("close");
                         if(data.resCode == '000'){
                             dialogs._timer("解绑成功",1,2,function(){
                                 $(obj).parents("tr").remove();
                             });
                         }else if(data.resCode == '103'){
                             if(role == 'student'){
                                 $("#bundling_alert_text").text("此学生还有未完成的课程，暂时不能解绑！");
                             }else{
                                 $("#bundling_alert_text").text("此教师还有未完成的课程，暂时不能解绑！");
                             }
                             $("#tch_bundling_alert").dialog("open");
                         }else{
                             $("#bundling_alert_text").text(data.resMsg);
                             $("#tch_bundling_alert").dialog("open");
                         }
                     }
                 });
             });
        }

        this.delAdviser=function(obj){

            var userId = $(obj).attr("userId");
            var userName = $(obj).attr("userName");

            $("#consultant_delete").dialog("open");
            $("#receive_person").parent().children("em").text("");
            $("#receive_person option").show();
            $("#receive_person option[value='" + userId + "']").hide();

            $("#consultant_enter").unbind("click");
            $("#consultant_enter").bind('click',function(){
                var receive_person = $("#receive_person").val();
                if(receive_person == ''){
                    return;
                }else{
                    $.ajax({
                        type:"get",
                        url:"/personnel/delAdviser.do",
                        data:{userId:userId,toUserId:receive_person,userName:userName},
                        success:function(data){
                            if(data.resCode == '000'){
                                $("#consultant_delete").dialog("close");
                                $(obj).parents("tr").remove();
                            }
                        }
                    });
                }
            });
        }

        var phoneNumberOld;
        this.getAccount=function(){
            var phoneNumber = $("#phoneNumber").val();
            if(phoneNumber == '' || phoneNumber == null){
                return;
            }

            //失去焦点验证的时候 如果没有变化就不触发了
            if( phoneNumberOld != "" && phoneNumberOld != null){
                if( phoneNumberOld == phoneNumber ){
                    return;
                }else{
                    phoneNumberOld = phoneNumber;
                }
            }else{
                phoneNumberOld=phoneNumber;
            }

            //每次打开弹框的时候，清空错误信息。
            $('.error_message').each(function(){
                $(this).html("");
            });

            var identity = $("input:radio[name=userIdentity]:checked").val();
            $.ajax({
                url:"/personnel/getAccount.do",
                type:"get",
                data:{phoneNumber:phoneNumber,identity:identity},
                success:function(data){
                    var data = data.data;

                    if(data.name){
                        $("#name").val(data.name);
                        $("#name").attr("readonly","true");
                        $("#div_password_checkNum").addClass("hide");
                    }else if(data.account){
                        $("#div_password_checkNum").addClass("hide");
                        $("#name").val(data.accountName);
                        $("#name").removeAttr("readonly");
                    } else{
                        $("#name").val('');
                        $("#password").val('');
                        $("#name").removeAttr("readonly");
                        $("#div_password_checkNum").removeClass("hide");
                    }
                }
            });
        }

        this.addCounselor = function() {
            $("#password").val($.md5($("#password").val()).toUpperCase());
            $.ajax({
                url:"/personnel/addCounselor.do",
                type:"post",
                data:$("#personnelForm").serialize(),
                success:function(data){
                    if(common.checkResponse(data) == false){
                        $("#password").val("");
                        return;
                    }
                    loadCounselorData(1);//咨询师
                    dialogs._timer("添加成功",1,2,function(){
                        $("#pushNotice_add").dialog("close");
                    });
                }
            });
        }

        var professional = [
            {"code":"51305","value":"正高级教师"},
            {"code":"51304","value":"高级教师"},
            {"code":"51303","value":"一级教师"},
            {"code":"51302","value":"二级教师"},
            {"code":"51301","value":"三级教师"}
        ];

        var highestDegree = [
            {"code":"51201","value":"初中"},
            {"code":"51202","value":"高中"},
            {"code":"51203","value":"大专"},
            {"code":"51204","value":"本科"},
            {"code":"51205","value":"硕士"},
            {"code":"51206","value":"博士"}
        ];

        function getProfessional(code){
            var pro = "";
            if( code != ""){
                $(professional).each(function(index,value){
                    if(this.code == code){
                        pro =  this.value;
                        return;
                    }
                });
            }
            return pro;
        }

        function getDegree(code){
            var pro = "";
            if( code != ""){
                $(highestDegree).each(function(index,value){
                    if(this.code == code){
                        pro =  this.value;
                        return;
                    }
                });
            }
            return pro;
        }

        //刷新页面清空form表单
        window.onload=function() {
            $("#sendCheckCode").removeAttr("disabled");
            document.forms[0].reset();
        }
    });