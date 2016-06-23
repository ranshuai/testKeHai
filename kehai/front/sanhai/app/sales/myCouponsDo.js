define(['jquery', 'dialogs', 'common'], function ($, dialogs, common) {

    var lenNum =0;
    $(function () {
        $('.tabItem .tabTow .tabList li').click(function () {
            tabL($(this), 2);
        });
        $('.tabOne').children('.tabList').children('li').click(function () {
            tabL($(this), 1);
        });
        var tabL = function (obj, tabNum) {
            var index = obj.index();
            obj.children('a').addClass('ac').parent('li').siblings().children('a').removeClass('ac')
            obj.parent('.tabList').next().children('.tabItem').addClass('hide')
            obj.parent('.tabList').next().children('.tabItem').eq(index).removeClass('hide');

            if (tabNum == 1 && index == 1) {
                //旁听换主听的信息
                ptExchangeZt();
            } else {
                myCouponsType(index);
            }
        };

        $('#subjectNumExChange').click(function () {
            if(lenNum ==0){
                return;
            }
            dialogs._subjectNumExChange(lenNum, '旁听换主听券', function () {

                $.ajax({
                    type: "post",
                    url: "/coupons/ptExchangeZt.do",
                    data:{lenNum:lenNum},
                    success: function (data) {
                        if (common.checkResponse(data) == false) {
                            return;
                        }
                        ptExchangeZt();
                        dialogs._timer('兑换成功',1,2,null);
                    },
                    error: function (data) {

                    }
                });
            })
        });

        myCouponsType(0);
    });

    function myCouponsType(index) {
        $.ajax({
            type: "post",
            url: "/coupons/myCouponsType.do",
            data: {status: index},
            success: function (data) {
                if (common.checkResponse(data) == false) {
                    return;
                }
                $(".clearfix").eq(index + 1).html("");
                $.each(data.data.list, function () {

                    var validTime = this.validTime;
                    validTime = validTime.substring(0,4)+"年"+validTime.substring(4,6)+"月"+validTime.substring(6,8)+"日";
                    if (this.couponsType == 0) {
                        var li = '<li class="fl">' +
                            '<div class="coupon_item_t pr">' +
                            '<span class="coupon_item_t_bg1 pa"></span>' +
                            '<spa coupon_item_t_bg2 pa></spa>' +
                            '<span class="coupon_item_t_bg3 pa hide"></span>' +
                            '<p class="font24 font_fff">主听券</p><p class="font_fff">【全平台专用】</p>' +
                            '</div>' +
                            '<div class="coupon_item_b">' +
                            '<p class="coupon_item_b_con">' +
                            '<span class="font12">发行单位: </span><span class="gray_999 font12">北京三海教育科技</span>' +
                            '</p>' +
                            '<p class="coupon_item_b_con">' +
                            '<span class="font12">使用条件: </span><span class="gray_999 font12">换取任意一节课程</span>' +
                            '</p>' +
                            '<p class="coupon_item_b_con">' +
                            '<span class="font12">有效期至: </span><span class="gray_999 font12">'+validTime+'</span>' +
                            '</p>' +
                            '</div></li>';
                    }

                    $(".clearfix").eq(index + 1).append(li);

                });
                if (index != 0) {
                    $(".coupon_item_t_bg3").removeClass("hide");
                }
                //console.log(data);
            },
            error: function (data) {

            }

        });
    }

    function ptExchangeZt() {
        $.ajax({
            type: "post",
            url: "/coupons/ptExchangeZtPage.do",
            success: function (data) {
                if (common.checkResponse(data) == false) {
                    return;
                }

                $(".subject_numL_have").text("您有" + data.data.couponsNum + "张主听券");
                lenNum = ptExchangeZtSize(data.data.exchangeNum, data.data.finishPtCourseList.length);
               
                if( lenNum > 0 ){
                    $("#isExchange").removeClass("no");
                    $('#isExchangeShow').html('您可以兑换主听券了，请尽快兑换！');
                }else{
                    $('#subjectNumExChange').attr('disabled', "disabled");
                    $('#subjectNumExChange').addClass('disBtn')

                    $("#isExchange").addClass("no");
                    $('#isExchangeShow').html('您暂时还不能兑换主听券，快去 <a href="/site/ptcourse/selectCourse.htm" class="a_link font16">积累旁听</a> 吧！');
                    
                }


                $("tbody").html("");
                //渲染旁听课程列表
                $.each(data.data.finishPtCourseList, function (index) {
                    var tr = "<tr><td>" + this.theme + "</td>" +
                        "<td>" + (new Date(parseFloat(this.classStartTime)).format("yyyy-MM-dd hh:mm:ss")) + "</td></tr>";
                    $("tbody").append(tr);
                });
            },
            error: function (data) {
            }
        });
    }

    //计算能兑换多少券
    function ptExchangeZtSize(num, ptSzie) {
        switch (Number(num)) {
            case 0 :
                var lenNum = 5;
                break;
            case 1 :
                var lenNum = 10;
                break;
            default :
                var lenNum = 15;
                break;
        }
        if (ptSzie >= lenNum) {
            return 1 + ptExchangeZtSize(num + 1, ptSzie - lenNum);
        } else {
            return 0;
        }
    }

});