/**
 * Created by 蒋淼 on 2016/2/19.
 */
define("videoCardDo", ["jquery", "dialogs", "pageBar", "base", "jquery_md5", "jquery_ui_min"], function ($, dialogs, pageBar) {

    var currentDate = "";
    var expireDate = "";

    var video = function () {

        $('.activationBtn').click(function () {
            dialogs._activateVideoCard(cardType, balanceType, null);
        });

        /**
         * 充值卡充值
         */
        function cardType() {
            dialogs._cardVideoCard(function () {
                $.ajax({
                    type: "post",
                    url: "/video/videoChargeCard.do",
                    data: {
                        "cardNo": $("#cardNo").val(),
                        //"cardPwd": $.md5($("#cardPwd").val()).toUpperCase()
                        "cardPwd": $("#cardPwd").val()
                    },
                    beforeSend: function () {

                        var reg = /^[A-Za-z0-9]+$/;

                        if (null == $("#cardNo").val() || "" == $("#cardNo").val()) {
                            dialogs._timer("随听卡卡号不能为空", 2, 2, null);
                            return false;
                        } else if (!reg.test($("#cardNo").val())) {
                            dialogs._timer("随听卡卡号只能由数字和字母组成", 2, 2, null);
                            return false;
                        }
                        if (null == $("#cardPwd").val() || "" == $("#cardPwd").val()) {
                            dialogs._timer("随听卡密码不能为空", 2, 2, null);
                            return false;
                        } else if (!reg.test($("#cardPwd").val())) {
                            dialogs._timer("随听卡密码只能由数字和字母组成", 2, 2, null);
                            return false;
                        }
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            videoExpireDate();                  // 加载有效期
                            videoCardChargeLog(1);              // 加载充值日志
                            $('._cardVideoCard').remove();
                        } else {
                            dialogs._timer(response.resMsg, 2, 2, null);
                        }
                    },
                    fail: function () {

                    }
                });
            }, null, expireDate);
        }

        /**
         * 余额充值
         */
        function balanceType() {
            dialogs._balanceVideoCard(function () {
                $.ajax({
                    type: "post",
                    url: "/video/videoChargeBalance.do",
                    data: {
                        "password": $.md5($("#password").val()).toUpperCase()
                    },
                    beforeSend: function () {
                        var reg = /^[0-9]+$/;

                        String.prototype.trim = function () {
                            return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
                        };

                        if ("" == $("#password").val().trim() || null == $("#password").val()) {
                            dialogs._timer("支付密码不能为空", 2, 2, null);
                            return false;
                        } else if (!reg.test($("#password").val())) {
                            dialogs._timer("支付密码只能由数字构成", 2, 2, null);
                            return false;
                        }
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            videoExpireDate();              // 加载有效期
                            videoCardChargeLog(1);          // 加载充值记录
                            $('._balanceVideoCard').remove();
                        } else if ("4003" == response.resCode) {
                            dialogs._insufficientPayment(function () {
                                self.location = "/businessPath/balanceCharge.htm";
                            }, null);
                            $('._balanceVideoCard').remove();
                        } else {
                            dialogs._timer(response.resMsg, 2, 2, null);
                        }
                    },
                    fail: function (response) {

                    }
                });
            }, null);
        }
    };

    /**
     * 视频卡有效期
     */
    var videoExpireDate = function () {
        $.ajax({
            url: "/video/videoCardExpireDate.do",
            type: "post",
            dataTye: "json",
            success: function (response) {
                if ("000" == response.resCode) {
                    if (0 == response.data.videoDate[0]) {
                        $("#videoCardInfo").empty();
                        $("#videoCardInfo").html("<i></i>没有激活随听卡，快去购买吧");

                        currentDate = response.data.videoDate[1];
                        expireDate = response.data.videoDate[2];        // 没有视频卡将有效期获得传递到下一个对话框
                    } else {

                        currentDate = response.data.videoDate[1];
                        expireDate = response.data.videoDate[2];        // 有视频卡将有效期获得传递到下一个对话框

                        // 有效期
                        var a = currentDate.replace("-","");
                        var b = a.replace("-","");

                        // 当前日期
                        var mydate = new Date();
                        var str = "" + mydate.getFullYear();
                        str += (mydate.getMonth()+1);
                        str += mydate.getDate();

                        if (str > b) {
                            //alert("过去");
                            $("#videoCardInfo").empty();
                            $("#videoCardInfo").html("<i></i>没有激活随听卡，快去购买吧");
                        } else {
                            //alert("有效");
                            $("#videoCardInfo").empty();
                            $("#videoCardInfo").html("随听卡已激活，有效期至：" + response.data.videoDate[1]);
                        }

                        //currentDate = response.data.videoDate[1];
                        //expireDate = response.data.videoDate[2];        // 有视频卡将有效期获得传递到下一个对话框
                    }
                }
            },
            fail: function (response) {

            }
        });
    };

    /**
     * 视频卡充值记录
     */
    var videoCardChargeLog = function (currentPage) {
        $.ajax({
            url: "/video/videoChargeLog.do",
            dateType: "json",
            type: "post",
            data: {
                currentPage: currentPage
            },
            success: function (response) {
                if (response.resCode == "000") {
                    var totalRows = response.data.videoCardLog.totalRows;
                    if (0 == totalRows) {

                    } else {
                        $("<span>(共" + totalRows + "条)</span>").appendTo(".all_record");

                        $("table tbody").empty();

                        $.each(response.data.videoCardLog.data, function (index, value) {
                            var status;
                            switch (this.status) {
                                case "1" :
                                    status = "交易成功";
                                    break;
                                case "0" :
                                    status = "交易失败";
                                    break;
                            }
                            var tr = "<tr><td>" + (new Date(parseFloat(this.dealTime)).format("yyyy-MM-dd hh:mm:ss")) + "</td>" +
                                "<td>" + this.dealDes + "</td>" +
                                "<td class='green'>" + this.dealMoney / 100 + "元</td>" +
                                "<td>" + status + "</td>" +
                                "</tr>";

                            $("table tbody").append(tr);
                        });
                        var params = new Array();
                        pageBar.setBasePageBar(response.data.videoCardLog.totalPages, response.data.videoCardLog.currPage, videoCardChargeLog, params);

                    }
                } else {
                    alert("错误" + response.resMsg)
                }
            },
            fail: function (response) {

            }
        });
    }

    return {
        video: video,
        videoExpireDate: videoExpireDate,
        videoCardChargeLog: videoCardChargeLog
    };
});