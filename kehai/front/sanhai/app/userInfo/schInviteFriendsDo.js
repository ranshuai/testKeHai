define(["jquery","common","pageBar","dialogs","qrcode"],
    function($,common,pageBar){
        jQuery('#qrcode').qrcode({
            //  render	: "table",
            width:150,
            height:150,
            text: "http://kehai.com/reg/register.htm?invitationCode="

        });

        //加载邀请的人员
        invitePersonsLoad(1);

        $(".sel_body").change(function(){
            invitePersonsLoad(1,$(this).val());
        });

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
    });

