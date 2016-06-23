define(["jquery","common","pageBar","dialogs","qrcode"],
    function($,common,pageBar,dialogs){
        jQuery('#qrcode').qrcode({
            //  render	: "table",
            width:140,
            height:140,
            text: "http://192.168.1.91:9703/m/register.htm?school="+encodeURI(encodeURI("v三国杀"))
            /*text: "http://kehai.com/reg/register.htm?invitationCode="+${sessionScope.SESSION_KEY_USERID}*/

        });

        //加载邀请的人员
   //     invitePersonsLoad(1);
        inviteOrgLoad(1);
       /* /!*tab切换*!/
        $('.invite_warp').hide();
        if($('.invite_warp:hidden')){
            $('.go_invite').click(function(){
                $('.invite_warp').show();
            })
        }
        $('.tab .tabList li').click(function() {
            var index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
            if(index==0){
                $('.go_invite').show()
                    .click(function(){
                        $('.invite_warp').show();
                    })
            }else if(index==1){
                $('.go_invite').hide();
            }
        });
*/
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


        /*打开邀请框*/
        $('.push_btn_js').click(function() {
            $("#push_notice").dialog("open");
            return false;
        });
        //关闭弹框
        $('.cancelBtn').click(function() {
            $("#push_notice").dialog("close");
        });

        $('.send_message').click(function(){
            dialogs._timer('发送成功',1,2,"");
        });
        $('.determineBtn').click(function() {
            dialogs._timer("分享成功",1,2,function(){
                $("#push_notice").dialog("close");
            });
        });


        $('.determineBtn').click(function() {
            dialogs._timer("创建成功",1,2,function(){
                $("#push_notice").dialog("close");
            });
        });

        $(".sel_body").change(function(){
            invitePersonsLoad(1,$(this).val());
        });

         joinOrg =function(obj){
            var orgId =  $(obj).attr("orgId");
            var status = $(obj).attr("status");
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "/personnel/agreeJoinOrg.do",
                data: {
                    orgId: orgId,
                    status:status
                },
                success: function (data) {
                    if (common.checkResponse(data) == false) {
                        return;
                    }
                    if(status ==1){
                        dialogs._timer("解绑成功",1,1,"");
                        $(obj).text("同意");
                        $(obj).attr("status",2);
                        $("td.aflag a").each(function(){
                            $(this).attr("onClick","joinOrg(this)");
                            $(this).attr("class","agree blue");
                        });
                    }else{
                        dialogs._timer("加入成功",1,1,"");
                        $(obj).text("解绑");
                        $(obj).attr("status",1);
                        $(".agree").each(function(){
                            if(this != obj){
                                $(this).removeAttr("onClick");
                                $(this).attr("class","adisable");
                            }
                        });
                    }

                }
            });
        }

        function invitePersonsLoad(page){
            var obj = $(".sel_body");
            var userIdentity = 0;
            if(obj.val()){
                userIdentity  = obj.val();
            }
            obj.siblings().text(obj.find("option:selected").text());
            $.ajax({
                url: "/personnel/invitePersons.do",
                type: "post",
                data:{userIdentity:userIdentity,page:page},
                dataType: "json",
                success: function (data) {
                    countSize = data.data.countSize;
                    $("tbody").eq(0).empty();
                    $("#totalInvite").text("共有"+countSize+"条结果");
                    $.each(data.data.list ,function(){
                        var userIdentity = ""
                        switch(this.userIdentity){
                            case "0" :{
                                userIdentity = "老师";
                                break;
                            }
                            case "1" :{
                                userIdentity = "大学生";
                                break;
                            }
                            case "2" :{
                                userIdentity = "学生";
                                break;
                            }
                            case "3" :{
                                userIdentity = "机构";
                                break;
                            }
                        }
                        var tr = "<tr>" +
                            "<td>" + this.name + "</td>" +
                            "<td>" + this.phoneNumber + "</td>" +
                            "<td>" + userIdentity + "</td>" +
                            "<td>" + (new Date(parseFloat(this.createTime)).format("yyyy-MM-dd")) + "</td>" +
                            "</tr>";
                        $("tbody").eq(0).append(tr);
                    });
                    pageBar.showPageBar(page,data.data.totalPages,invitePersonsLoad);
                },
                error: function () {}
            });
        }

        function inviteOrgLoad(page){
            $.ajax({
                url: "/personnel/inviteOrgPersons.do",
                type: "post",
                data:{page:page,orgId:-1,userIdentity:-1,type:0},
                dataType: "json",
                success: function (data) {
                    countSize = data.data.countSize;
                    $("tbody").eq(1).empty();
                    $("#boundTitle").text("共有"+countSize+"条结果");
                    $.each(data.data.list ,function(){
                        var tr = "<tr>" +
                            "<td>" + this.inviteeName + "</td>" +
                            "<td>" + this.invitePhoneNumber + "</td>" +
                            "<td>" + (new Date(parseFloat(this.inviteTime)).format("yyyy-MM-dd")) + "</td>" +
                            "<td class='aflag'><a href='javascript:;' onClick = 'joinOrg(this);' orgId='"+this.inviteOrgId+"' status='"+this.status+"' class='agree blue'>"+(this.status ==1 ? "解绑":"同意")+"</a></td>" +
                            "</tr>";
                        $("tbody").append(tr);
                    });

                    $(".agree").each(function(){
                        var status = $(this).attr("status");
                        if(status==1){
                            $(".agree").each(function(){
                                status = $(this).attr("status");
                                if(status ==0 || status==2 ){
                                    $(this).removeAttr("onClick");
                                    $(this).attr("class","adisable");
                                }
                            });
                            return;
                        }
                    });

                    pageBar.showPageBar(page,data.data.totalPages,inviteOrgLoad);
                },
                error: function () {}
            });
        }
    });

