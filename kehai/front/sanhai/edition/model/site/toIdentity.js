/*切换身份模块*/
define(function () {
    var common = require('../../vendors/libs/common');
    /*切换身份接口*/
    function toIdentity (identity) {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/perfectInfo/toIdentity.do",
            data: {identity: identity},
            success: function (data) {
                if (common.checkResponse(data) == false) {
                    return;
                }
                 location.reload();
            },
            error: function (data) {
            }
        });
    }

    return toIdentity
});

