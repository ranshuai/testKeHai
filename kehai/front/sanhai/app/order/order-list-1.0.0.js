/**
 * Created by boys on 2015/9/17.
 * 操作订单列表的js
 * @Author Tian Jiayuan
 */

/**
 * 获取订单列表信息
 * @param resp
 */

/**
 *
 * @param url
 * @param data
 * @param currPage
 */
define(['jquery'], function ($) {
    function orderListInfo4Page(url, data, currPage) {
        var a = data;
        data += "currPage=" + currPage;
        $.ajax({
            url: url,
            data: data,
            type: "post",
            beforeSend: function () {
                showLoading();
            },
            success: function (resp) {
                $("div.main_Cont30").removeClass("loading_page");
                if (common.checkResponse(resp) == false) return;
                if (resp.resCode == "000") {
                    appendDetail(resp);
                    var params = new Array();
                    params.push("/orderDeal/list.do");
                    params.push(a);
                    setBasePageBar(resp.data.totalPages, resp.data.currPage, orderListInfo4Page, params);
                }
            },
            error: function (resp) {
                $("div.main_border").removeClass("loading_page");
                //alert("错误" +resp.resMsg);
            }
        });
    }

    /**
     * 订单列表信息展示方法
     * @param resp
     */
    var appendDetail = function (resp) {
        //获取返回数据
        if (false == common.checkResponse(resp)) return;
        var data = resp.data;
        if (typeof data == "undefined")
            return;
        var list = data.list;
        if (typeof list == "undefined") {
            list = data.rows;
        }
        //统计数
        var count = data.countSize;
        if ((typeof count == "undefined")) {
            count = 0;
        }
        if (count > 0) {
            $(".tabItem:eq(0)").hide();
            $(".tabItem:eq(1)").show();
        }
        //用户身份识别 0 老师 1 大学生 2 学生 3 机构
        var userFlag = data.userFlag;
        var orderStatus;
        $("#count").replaceWith("<h5 id=\"count\">&nbsp;&nbsp;&nbsp;共有" + count + "条记录</h5>");
        //添加分页
        $("table:eq(0) tbody").html("");
        if (count > 0) {
            //判断用户身份
            switch (userFlag) {
                case "0":
                case "1":
                    $("table:eq(0) tbody").append("<tr class=\"table_head\"><th style=\"text-align: center;\">订单名称</th><th>价格</th><th>状态</th><th>购买人</th><th>操作</th></tr>");
                    break;
                case "2":
                    $("table:eq(0) tbody").append("<tr class=\"table_head\"><th style=\"text-align: center;\">订单名称</th><th>价格</th><th>教师</th><th>状态</th><th>操作</th></tr>");
                    break;
                case "3":
                case "4":
                    $("table:eq(0) tbody").append("<tr class=\"table_head\"><th style=\"text-align: center;\">订单名称</th><th>价格</th><th>教师</th><th>状态</th><th>购买人</th><th>操作</th></tr>");
                    break;
            }
        } else {
            $("table:eq(0) tbody").html("");
        }
        if (typeof list != "undefined" && list.length > 0) {

            $.each(list, function (index, value) {
                /**每一行的头**/
                var content = "<tr class=\"order_num\"></tr>";
                var date = new Date(parseFloat(value.orderGenerateTime)).format("yyyy-MM-dd hh:mm:ss");
                if (userFlag == "3" || userFlag == "4") {
                    content += "<th colspan='6'>订单号:" + value.id + "&nbsp;&nbsp;&nbsp;" + date + "</th>";
                } else {
                    content += "<th colspan='5'>订单号:" + value.id + "&nbsp;&nbsp;&nbsp;" + date + "</th>";
                }
                /***每一行的具体内容**/
                content += "<tr class=\"order_name\">";
                content += "<td><div class=\"ellipsis\">" + value.courseTitle + "&nbsp;(" + df.coursesType(value.courseMode, 0) + ")</div></td>";
                content += "<td class='tc'>" + money.fmoney(value.orderActualPrice / 100, 2) + "</td>";
                var type = value.orderStatus + value.assignTeacherFlag;
                var path = "/orderDeal/find/" + value.id + ".htm?type=" + type;
                var teacher = "无";
                if (value.orderStatus == 0) {
                    content += "<td align='center'>" + teacher + "</td>";
                } else if (value.orderStatus == 2) {
                    if (userFlag == "2") {//学生用户显示老师名
                        if (value.assignTeacherFlag == "3") {
                            teacher = value.teacher.name;
                        }
                        content += "<td align='center'>" + teacher + "</td>";
                    } else if ("3" == userFlag || "4" == userFlag) {
                        if (type == "23") { //老师确认后
                            teacher = list[i].teacher.name;
                        }
                        else if ((type == "20" || type == "22") && value.coursesStatus == 0) { //机构匹配老师
                            teacher = "<a href='" + path + "' class='tc blue'>匹配老师</a>";
                        } else if (type = "21" && value.coursesStatus == 0) {//老师确认中
                            path = "/orderDeal/find/" + value.id + ".htm?type=20";
                            teacher = "<a href='" + path + "' class='tc blue'>重新匹配</a>";
                        }
                        content += "<td align='center'>" + teacher + "</td>";
                    }
                }
                orderStatus = df.orderPayType(value.orderStatus, 0);
                if (value.orderStatus == 2) {
                    orderStatus = df.orderStatus(value.assignTeacherFlag + value.coursesStatus + value.isRetireCourses, 0);
                }
                content += "<td align='center'>" + orderStatus + "</td>";
                //非学生用户
                if (userFlag != "2") {
                    content += "<td align='center'>" + value.user.name + "</td>";
                }
                var pathDetail = "/orderDeal/find/" + value.id + ".htm?type=0";
                var oper = "<a href='" + pathDetail + "' class='tc blue'>查看详情</a><br/><input type='hidden' name='orderId' value='" + value.id + "' />";
                //学生对应的操作按钮
                if (userFlag == "2") {
                    //支付后的操作
                    if (value.orderStatus == 2 && value.coursesStatus == 0) {
                        oper += "<br/><a href='#1' class='tc blue ajax'>退课</a>";
                        if (value.courseMode == 0 && value.assignTeacherFlag == 3 && value.isRetireCourses != 30) { //一对一
                            oper += "<a href='#30' class='tc blue ajax'>&nbsp;&nbsp;换老师</a>";
                        }//未支付的操作
                    } else if (value.orderStatus == 0) {
                        //2015-09-07 蒋淼修改 只传递订单ID
                        var orderInfo = value.id;
                        var data = encode64("1&" + value.orderActualPrice + "&" + orderInfo);
                        var linkPath = "/shopping/PayMoney.htm?cousTitle=" + encodeURI(encodeURI(value.courseTitle)) + "&data=" + data;
                        oper += "<br/><a href='" + linkPath + "' class='tc blue'>去支付</a>";
                    }
                    // 订单已结课 未评价
                    if (value.coursesStatus == 1 && value.evaluteFlag == 0) {
                        oper += "<a href='#0' class='tc blue ajax'>待评价</a>"
                    }
                }
                //机构
                else if (userFlag == "3" || userFlag == "4") {
                    if (value.orderStatus == 0) {
                        oper += "<a href='#40' class='tc blue ajax'>编辑</a>";
                    }
                } else {
                    if (value.coursesStatus == 1 && value.evaluteFlag == 0) {
                        oper += "<a href=" + pathDetail + " class='tc blue ajax'>待评价</a>";
                    }
                }
                content += "<td class='tc blue'>";
                content += "<input type='hidden' value='" + value.coursesId + "'/>";
                content += "<input type='hidden' value='" + value.courseTitle + "'/>";
                content += "<input type='hidden' value='" + value.id + "'/>";
                content += "<input type='hidden' value='" + value.schoolId + "'/>";
                content += "<input type='hidden' value='" + value.teacherId + "'/>" + oper + "</td>";
                content += "</tr>";

                $("table:eq(0) tbody").append(content);
            });
        }
    };

    return {

    }
});