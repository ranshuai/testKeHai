
var common = require('../../vendors/libs/common');


define(function(){
    function enterOrganization() {

    }

    $.fn.extend({
        'rOrganizationBanner': function () {
            var oDiv = $(this);
            var oUl = $('.organization_banner_list');
            var aLi = oUl.children();  //15
            var W = aLi[0].offsetWidth * 6;
            var prev = $('.prev');
            var next = $('.next');
            var num2 = 12 / 6 - 1;
            var num = 0;
            next.click(function () {
                num++;
                if (num > num2) {
                    num = num2;
                    return false;
                } else {
                    oUl.stop().animate({'left': -W * num}, {'duration': 1000});
                }

                //oUl.stop().animate({'left': -W * num}, {'duration': 1000})
            });

            prev.click(function () {
                num--;
                if (num <= 0) {
                    num = 0;
                    oUl.stop().animate({'left': -W * num}, {'duration': 1000});
                } else {
                    oUl.stop().animate({'left': -W * num}, {'duration': 1000});
                }

            });
        }
    });


    enterOrganization.prototype.Organization = function () {
        $.ajax({
            url: "/site/newJoinOrg.r",
            dataType: "json",
            success: function (res) {
                if (common.checkResponse(res)) {
                    var htmlStr = "";
                    $.each(res.data.list, function (index, item) {
                        if (item.ppResId) {
                            htmlStr += '<li><a href="/site/shool/' + item.orgId + '/findCourseByorgId.htm"><img STYLE="width:120px; height: 80px;" src="/file/loadImage/' + item.ppResId + '/120/80.r" alt="' + item.orgName + '" title="' + item.orgName + '"></a></li>';
                        } else {
                            htmlStr += '<li><a href="/site/shool/' + item.orgId + '/findCourseByorgId.htm"><img STYLE="width:120px; height: 80px;" src="/front/sanhai/images/schoollogo.png" alt="' + item.orgName + '" title="' + item.orgName + '"></a></li>';
                        }
                    });
                    if (htmlStr.length > 0) {
                        $(".organization_banner_list").html(htmlStr);
                    }
                    // /!*入驻机构切换*!/
                    if ($('.organization_banner_list').children().size())$('.organization_banner').rOrganizationBanner();
                }
            }
        });
    };


    return new enterOrganization();
});