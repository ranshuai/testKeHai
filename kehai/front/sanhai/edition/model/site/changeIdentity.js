define(function () {
    var toIdentity = require('./toIdentity.js');
    var common = require('../../vendors/libs/common');

    function changeIdentity() {
   
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
                    } else {
                        $(".tabRole").addClass('hide');
                    }

                    $('.changeId').click(function () {
                        var data = $(this).attr("data");
                        toIdentity(data);
                    });

                }
            });
        }
    return changeIdentity
});