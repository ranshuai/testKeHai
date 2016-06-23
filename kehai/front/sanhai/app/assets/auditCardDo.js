/**
 * Created by Administrator on 2015/12/17.
 */

define(['jquery', 'common', 'pageBar', 'jquery_md5', 'base'], function ($, common, pageBar) {


    getAuditCardLog(1);

    /*弹窗初始化*/
    $('.popBox').dialog({
        autoOpen: false,
        width: 400,
        height: 250,
        modal: true,
        resizable: false,
        close: function () {
            $(this).dialog("close")
        }
    });


    $(".payButton").click(function () {
        var context = $("#coursesTypeEm").text();
        $(".showDetail").html("").text("旁听卡充值：" + context);

        $("#pay_auditCard").dialog("open");
    });

    $(".payMoney").click(function () {
        $.ajax({
            type: "post",
            url: "/pt/payAuditCard.do",
            data: {
                "amountMonth": $("#coursesType").val(),
                "password": $.md5($("#password").val()).toUpperCase()
            },
            success: function (data) {
                if (common.checkResponse(data) == false) {
                    $("#pay_auditCard").dialog("close");
                    $("#password").val("");
                    return;
                }
                $("#pay_auditCard").dialog("close");
                $("#password").val("");
                clickSuccess("充值成功");
                location.reload();
            },
            error: function (data) {
                $("#password").val("");
            }
        });
    });


    function getAuditCardLog(currPage) {
        $.ajax({
            url: "/pt/getAuditCardLog.do",
            dataType: "json",
            type: "post",
            data: {currentPage: currPage},
            success: function (resp) {
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    var auditCard = resp.data.auditCard;
                    $(".audit_card_cont_l").html("");
                    if (auditCard != null && auditCard.expireTime != 0) {
                        $("<p>有效时间：至 " + new Date(parseFloat(auditCard.expireTime)).format("yyyy-MM-dd") + "</p>").appendTo(".audit_card_cont_l");
                    } else {
                        $("<p class='red'>暂未激活，请充值激活</p>").appendTo(".audit_card_cont_l");
                    }

                    $("<span>(共" + resp.data.countSize + "条)</span>").appendTo(".all_record");

                    $("table tbody").empty();
                    $.each(resp.data.list, function (index) {
                        var status;
                        switch (this.status) {
                            case "0" :
                                status = "交易成功";
                                break;
                            case "1" :
                                status = "交易失败";
                                break;
                            case "2" :
                                status = "其他";
                                break;
                        }
                        var tr = "<tr><td>" + (new Date(parseFloat(this.dealTime)).format("yyyy-MM-dd")) + "</td>" +
                            "<td>" + this.dealDes + "</td>" +
                            "<td class='green'>" + this.dealMoney / 100 + "元</td>" +
                            "<td>" + status + "</td>" +
                            "</tr>";

                        $("table tbody").append(tr);
                    });
                    var params = new Array();
                    pageBar.setBasePageBar(resp.data.totalPages, resp.data.currPage, getAuditCardLog, params);
                }
            },
            error: function (resp) {

            }
        });
    }

});
