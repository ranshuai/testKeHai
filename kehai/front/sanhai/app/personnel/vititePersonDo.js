define(["jquery","pageBar"],
    function($,pageBar){

        //加载数据
        loadVititePerson(1);

        $(".sel_body").change(function(){
            loadVititePerson(1);
        });

        function loadVititePerson(page){

            var obj = $(".sel_body");
            var userIdentity = 0;
            if(obj.val()){
                userIdentity  = obj.val();
            }
            obj.siblings().text(obj.find("option:selected").text());
            $.ajax({
                url: "/personnel/inviteOrgPersons.do",
                type: "post",
                data:{page:page,userId:-1,userIdentity:userIdentity,type:1},
                dataType: "json",
                success: function (data) {
                    countSize = data.data.countSize;
                    $("tbody").eq(0).empty();
                    $("#boundTitle").text("共有"+countSize+"条结果");
                    $.each(data.data.list ,function(){

                        var statusText = "";
                        if(this.status == 0) statusText = "待同意";
                        if(this.status == 1) statusText = "已同意";
                        if(this.status == 2) statusText = "已解除";
                        var role;
                        if(this.inviteeIdentity == 0) role="老师";
                        if(this.inviteeIdentity == 1) role="大学生";
                        if(this.inviteeIdentity == 4) role="咨询师";
                        var tr = "<tr>" +
                            "<td>" + this.inviteName + "</td>" +
                            "<td>" + this.inviteePhoneNumber + "</td>" +
                            "<td>" + role + "</td>" +
                            "<td>"+statusText+"</td>" +
                            "<td>" + (new Date(parseFloat(this.inviteTime)).format("yyyy-MM-dd")) + "</td>" +
                            "</tr>";
                        $("tbody").eq(0).append(tr);
                    });
                    pageBar.showPageBar(page,data.data.totalPages,loadVititePerson);
                },
                error: function () {}
            });
        }
    });