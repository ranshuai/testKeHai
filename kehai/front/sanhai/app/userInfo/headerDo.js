/*顶部导航菜单*/
define(["jquery", "common", "base", "app/userInfo/changeIdentity","dialogs"],
    function ($, common, base, changeIdentity,dialogs) {
        return {
            init: function () {
                //客服中心hover效果
                $('.serviceList').rNavhover();
                //切换身份hover效果
                $('.tabRole').rNavhover();
                //联系客服弹窗
                $('.customerBtn').click(function(){
                    dialogs._customerService()
                });
                if (account&&account != '') {
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        url: "/perfectInfo/changeIdentity.do",
                        data: {},
                        success: function (data) {
                            if (common.checkResponse(data) == false) {
                                return;
                            }
                            var hasProp = 0;
                            $.each(data.data, function () {
                                if (this == 0) {
                                    $('<li><a class="changeId" data="0" href="javascript:void(0);">切换到教师身份</a></li>').appendTo(".changeIdentity");
                                } else if (this == 1) {
                                    $('<li><a class="changeId" data="1" href="javascript:void(0);">切换到大学生身份</a></li>').appendTo(".changeIdentity");
                                } else if (this == 2) {
                                    $('<li><a class="changeId" data="2" href="javascript:void(0);">切换到学生身份</a></li>').appendTo(".changeIdentity");
                                } else if (this == 3) {
                                    $('<li><a class="changeId" data="3" href="javascript:void(0);">切换到学校身份</a></li>').appendTo(".changeIdentity");
                                }
                                /*else if(this == 4){
                                $('<li><a href="javascript:void(0);" onclick="changeIdentity(4)">切换到咨询师身份</a></li>').appendTo(".changeIdentity");
                                }*/
                                hasProp++;
                            });
                            if (hasProp > 0) {
                                $(".tabRole").removeClass('hide');
                            }
                            $('.changeId').click(function () {
                                var data = $(this).attr("data");
                                changeIdentity.changeIdentity(data);
                            });
                        },
                        error: function (data) {}
                    });
                };
            }
        }
    });

