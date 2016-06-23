/**
 * Created by slg on 2016/4/25.
 */
define('orgPTSeatDo', ['jquery', 'dialogs', 'pageBar', 'money', 'base', 'lib/jquery_validate/jquery.validate'], function ($, dialogs, pageBar, money) {

    var seat = function () {
        /*tab切换*/
        $('.tab .tabList li').click(function () {
            var index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');

            if ('使用' == ($(this).text())) {
                $("#ptSeatBuy").hide();
                $("#ptSeatUse").show();
                loadPTSeatUseLog(1);
            }

            if ('购买' == ($(this).text())) {
                $("#ptSeatUse").hide();
                $("#ptSeatBuy").show();
                loadPTSeatBuyLog(1);
            }
        });

        $('.buySeatBtn').click(function () {
            dialogs._attendSeat();

            $("#ptSeatTime").keyup(function (e) {
                // 数字键
                if (48 == e.keyCode || 49 == e.keyCode || 50 == e.keyCode || 51 == e.keyCode || 52 == e.keyCode ||
                    53 == e.keyCode || 54 == e.keyCode || 55 == e.keyCode || 56 == e.keyCode || 57 == e.keyCode) {
                    $("#ptSeatMoney").html(Number($("#ptSeatTime").val()) * 1);     // 价格 = 席位 * 单价1元
                }

                // 小键盘
                if (96 == e.keyCode || 97 == e.keyCode || 98 == e.keyCode || 99 == e.keyCode || 100 == e.keyCode ||
                    101 == e.keyCode || 102 == e.keyCode || 103 == e.keyCode || 104 == e.keyCode || 105 == e.keyCode) {
                    $("#ptSeatMoney").html(Number($("#ptSeatTime").val()) * 1);     // 价格 = 席位 * 单价1元
                }
            });

            $("#btnSubmit").click(function () {
                $("#PTSeatForm").validate({
                    submitHandler: function (form) {
                        var ptSeatTime = $("#ptSeatTime").val();
                        reg = /^[0-9]*[1-9][0-9]*$/;
                        if (!reg.test(ptSeatTime)) {
                            dialogs._timer("旁听坐席位必须由正整数构成", 2, 2, null);
                        } else {
                            form.action = "/alipayweb/alipayWebPTSeatSubmit.do";
                            form.submit();
                        }
                    }
                });
            });

            $("#btnClose").click(function () {
                $(".popBox").dialog("close");
            });

            $('.seatvalue').blur().placeholder({value: '请输入您要购买的旁听时长'})
        });
    };

    /**
     * 加载机构可用旁听席位（单位小时）
     */
    var loadFreePTSeat = function () {
        $.ajax({
            url: "/ptseat/feePTSeatByOrgId.do",
            type: "post",
            dataType: "json",
            success: function (response) {
                if ("000" == response.resCode) {
                    $("#freePtSeat").empty();
                    $("#freePtSeat").html(response.resMsg + "（小时）");
                }
            },
            fail: function (response) {
                dialogs._timer("请勿重复刷新", 2, 2, null);
            }

        });
    };

    /**
     * 加载机构购买旁听席位日志
     * @param currentPage
     */
    var loadPTSeatBuyLog = function (currentPage) {
        $.ajax({
            url: "/ptseat/loadPTSeatBuyLog.do",
            type: "post",
            dataType: "json",
            data: {
                currentPage: currentPage
            },
            success: function (response) {
                if ("000" == response.resCode) {
                    if (0 != response.data.ptSeatBuyLog.totalRows) {
                        $(".page ").empty();
                        $("#ptSeatBuyContent").empty();
                        $("#ptSeatBuy").find("h5").text("共" + response.data.ptSeatBuyLog.totalRows + "条记录");

                        $.each(response.data.ptSeatBuyLog.data, function (index, value) {
                            var content = "<tr>" +
                                "<td>" + value.seat + "</td>" +
                                "<td>" + value.startTime + "</td>" +
                                "<td>" + money.fmoney(Number(value.money/100), 2) + "</td>" +
                                "</tr>";

                            $("#ptSeatBuyContent").append(content);
                        });

                        var params = new Array();
                        pageBar.setBasePageBar(response.data.ptSeatBuyLog.totalPages, response.data.ptSeatBuyLog.currPage, loadPTSeatBuyLog, params);
                    }
                }
            },
            fail: function (response) {
                dialogs._timer("请勿重复刷新", 2, 2, null);
            }
        })
    };

    /**
     * 加载机构使用旁听席位日志
     * @param currentPage 当前页
     */
    var loadPTSeatUseLog = function (currentPage) {
        $.ajax({
            url: "/ptseat/loadPTSeatUseLog.do",
            type: "post",
            dataType: "json",
            data: {
                currentPage: currentPage
            },
            success: function (response) {
                if ("000" == response.resCode) {
                    if (0 != response.data.ptSeatBuyLog.totalRows) {
                        $(".page ").empty();
                        $("#ptSeatUseContent").empty();
                        $("#ptSeatUse").find("h5").text("共" + response.data.ptSeatBuyLog.totalRows + "条记录");

                        $.each(response.data.ptSeatBuyLog.data, function (index, value) {

                            var content = "<tr>" +
                                "<td>" + value.ptTitle + "</td>" +
                                "<td>" + value.startTime + "</td>" +
                                "<td>" + value.seat + "</td>" +
                                "</tr>";

                            $("#ptSeatUseContent").append(content);
                        });

                        var params = new Array();
                        pageBar.setBasePageBar(response.data.ptSeatBuyLog.totalPages, response.data.ptSeatBuyLog.currPage, loadPTSeatUseLog, params);
                    }
                }
            },
            fail: function (response) {
                dialogs._timer("请勿重复刷新", 2, 2, null);
            }
        });
    };

    return {
        seat: seat,
        loadFreePTSeat: loadFreePTSeat,
        loadPTSeatBuyLog: loadPTSeatBuyLog
    }
});