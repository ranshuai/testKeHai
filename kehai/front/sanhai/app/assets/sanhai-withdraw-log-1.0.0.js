define(["pageBar", "dialogs", "money"], function (pagebar, dialog, money) {
    function loadUserWithdrawals(currentPage) {
        $.ajax({
            //url: "/withdrawals/stu/" + currentPage + "/withdrawalsLog.do",
            url: "/fund/user/" + currentPage + "/cash.do",
            type: "post",
            dateType: "json",
            success: function (response) {
                var data = response.data.list;
                if (null != data) {

                    $("#withdrawTotalRows").html("共有" + response.data.countSize + "条记录");
                    $("#withdrawLog").empty();
                    $("#pageBar").empty();

                    var content = "";

                    $.each(data, function (index, value) {
                        content += "<tr>";
                        content += "<td>" + value.dealTime + "</td>";
                        content += "<td class='orange_d'>" + money.fmoney(Number(value.money) / 100) + "</td>";

                        if (0 == value.status) content += "<td>失败</td></tr>";
                        if (1 == value.status) content += "<td>成功</td></tr>";
                        if (9 == value.status) content += "<td>申请中</td></tr>";
                    });

                    $("#withdrawLog").append(content);

                    // 页码
                    var params = new Array();
                    pagebar.setBasePageBar(response.data.totalPages, response.data.currPage, loadUserWithdrawals, params);

                } else {
                    $("#withdrawTotalRows").html("共有0条记录"); // 清除数量
                    $("#withdrawLog").empty();                  // 清除记录
                    $("#pageBar").empty();             // 清除分页
                }
            },
            error: function (response) {
                dialog._wait("网络异常请求失败，稍后再试", 2, null);
            }
        });
    }

    return {
        loadUserWithdrawals: loadUserWithdrawals
    }

});