define(["jquery","pageBar"],
    function($,pageBar){
        //加载数据
        loadApplyPerson(1);

        $(".sel_body").change(function(){
            loadApplyPerson(1);
        });

        function loadApplyPerson(page){

            var obj = $(".sel_body");
            var userIdentity = 0;
            if(obj.val()){
                userIdentity  = obj.val();
            }
            obj.siblings().text(obj.find("option:selected").text());
            $.ajax({
                /* url: "/personnel//applyPersonData.do",
                 data:{page:page,userId:-1,userIdentity:userIdentity},*/
                url: "/personnel/inviteOrgPersons.do",
                data:{page:page,userId:-1,userIdentity:userIdentity,type:2},
                type: "post",
                dataType: "json",
                success: function (data) {
                    countSize = data.data.countSize;
                    $("tbody").eq(0).empty();
                    $("#boundTitle").text("共有"+countSize+"条结果");
                    $.each(data.data.list ,function(){

                        var userIdentity = "";
                        var action = "";
                        switch(this.inviteeIdentity){
                            case "0" :{
                                userIdentity = "老师";
                                action = "<a href='/site/theacher/" + this.inviteeUserId +"/toTeacherIndex.htm' class='reject'>详情</a>";
                                break;
                            }
                            case "1" :{
                                userIdentity = "大学生";
                                action = "<a href='/site/theacher/" + this.inviteeUserId +"/toTeacherIndex.htm' class='reject'>详情</a>";
                                break;
                            }
                            case "2" :{
                                userIdentity = "学生";
                                action = "<a href='/personnel/"+this.inviteeUserId+"/studentDetail.htm' class='reject'>详情</a>";
                                break;
                            }
                        }
                        var tr = "<tr>" +
                            "<td>" + this.inviteName + "</td>" +
                            "<td>" + this.inviteePhoneNumber + "</td>" +
                            "<td>" + userIdentity + "</td>" +
                            "<td class='ope_td'>"+action+"</td>" +
                            "</tr>";
                        $("tbody").eq(0).append(tr);
                    });
                    pageBar.showPageBar(page,data.data.totalPages,loadApplyPerson);
                },
                error: function () {}
            });
        }
    });