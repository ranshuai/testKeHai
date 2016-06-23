/**
 * Created by boys on 2015/11/19.
 */


define(['jquery', 'dialogs','jquery_ui_min','jquery_md5'],

    function ($,dialogs) {

        function intoPtCourse(){

        }


        buyPtCard=function () {
            window.location = "/pt/auditCardPage.htm";
        }

        /**
         * 旁听课程详情页进入购买
         * @param tag
         * @param ptId
         */
        intoPtCourse.prototype.intoPtCourse=function (tag, ptId) {
            var t=this;
            $(tag).click(function() {
                var ptId = $(this).attr("data");
                var classStartTime = $(this).attr("time");
                var time = new Date().getTime();
                //console.log("ptId-->" + ptId);
                //console.log("classStartTime-->" + classStartTime);
                //console.log("time-->" + time);
                if (time >= classStartTime) {
                    dialogs._audit_paytwo(function () {
                        t.timeIntoClass(ptId)
                    }, null);
                } else {
                    dialogs._audit_payone(function () {
                        t.timeIntoClass(ptId)
                    }, null);
                }
            });
        }

        /**
         * 根据订单ID加载课程的计划任务
         * @param orderId
         */
        intoPtCourse.prototype.loadPlanPtCourse=function (orderId, currPage) {
            var t=this;
            var $orderId = orderId;
            var $currPage = currPage;
            var url = "/site/ptcourse/plan/" + $orderId + "/" + $currPage + "/list.do";
            $.post(url, function(resp){
                if (resp.resCode == "000"){
                    if (resp.data.list != null && resp.data.list.length > 0){
                        $("table.com_course_detail_table tbody").empty();
                        var first = "<td align=\"right\"><h3 class=\"mar_r_30 font16\">节次</h3></td>";
                        var second = "<td align=\"right\"><h3 class=\"mar_r_30 font16\">上课时间</h3></td>";
                        $.each(resp.data.list, function(index, value){
                            first += "<td class='tc'>第"+value.courseIndex+"节</td>";
                            second += "<td class='tc'>"+ new Date(parseFloat(value.classStartTime)).format("MM-dd hh:mm")+"</td>";
                        });
                        $("table.com_course_detail_table tbody").append("<tr>"+first+"</tr>");
                        $("table.com_course_detail_table tbody").append("<tr>"+second+"</tr>");
                        var params = new Array();
                        params.push(orderId);
                        setBackAndNextBar(resp.data.totalPages, resp.data.currPage, t.loadPlanPtCourse, params);
                    }
                }
            }, "json");
        }

        /**
         * 简单的前后分页
         * @param totalPage
         * @param currPage
         * @param callback
         * @param params
         */
        setBackAndNextBar=function (totalPage, currPage, callback, params){
            var count = parseInt(totalPage);
            var pageIndex = parseInt(currPage);

            $("a.back").click(function(){
                pageIndex = pageIndex -1;
                //console.log("pageIndex-->" + pageIndex);
                if (pageIndex == 0) return;
                params.push(pageIndex);
                callback.apply(this, params);
                return false;
            });

            $("a.next").click(function(){
                pageIndex += 1;
                //console.log("pageIndex-->" + pageIndex);
                if (pageIndex > count) return;
                params.push(pageIndex);
                callback(this, params);
                return false;
            })
        }

        /**
         * 购买旁听课程
         * @param classId
         */
        intoPtCourse.prototype.timeIntoClass=function (classId) {
//        $.post("/ptcourse/" + $(this).attr("data") + "/intoClass.do", '', function (resp) {
            if ($("#paytwo").is(":checked")){
                var url = "/ptcourse/" + classId + "/intoClass.do";
                $.post(url, '', function (resp) {
                    if (resp.resCode == "000"){
                        var url = resp.data.url;
                        //console.log(url);
                        if (typeof url == "undefined") return false;
                        var text_num =10;
                        var timer = null;
                        dialogs._confirm('马上进入教室，准备好了吗？还有 '+text_num+' 秒自动关闭','操作提示',function(){
                            openWindow(url);
                        },function(){
                            clearInterval(timer);
                        });
                        clearInterval(timer);
                        timer = setInterval(function(){
                            text_num --;
                            $('.confirm_dialog_box .popbox_item p').text('马上进入教室，准备好了吗？还有 '+text_num+'  秒自动关闭');
                            if(text_num<=0){
                                clearInterval(timer);
                                $('.popBox ').remove();
                            }
                        },1000);
                    }else if(resp.resCode == '2000'){
                        dialogs._audit_card_Inactive(buyPtCard, null);
                    }
                    else{
                        var msg = resp.resMsg.substring(resp.resMsg.indexOf("：")+1);
                        dialogs._wait(msg, 2);
                    }
                });
            }else if ($("#payone").is(":checked")){
                var pwd = $("#pwd").val();
                //console.log($.md5(pwd).toUpperCase());
                var url = "/ptcourse/" + classId + "/buy.do";
                $.post(url, {'pwd': $.md5(pwd).toUpperCase()}, function(resp){
                    var code = resp.resCode;
                    switch (code) {
                        //余额账户不存在
                        case '4000': dialogs._confirm(resp.resMsg, '设置余额账户', function(){changLocation("/businessPath/setBalanceChargePassword.htm");}, null);break;
                        //账户余额不足
                        case '4003': dialogs._confirm(resp.resMsg, '余额账户充值', function(){changLocation("/businessPath/balanceCharge.htm");}, null);break;
                        //账户密码错误
                        case '4002': dialogs._confirm(resp.resMsg, '失败', function(){changLocation("/businessPath/balanceCharge.htm");}, null);;break;
                        case '000':
                            var url = resp.data.url;
                            //console.log("url-->" + url);
                            if (url != null){
                                var text_num =10;
                                var timer = null;
                                dialogs._confirm('马上进入教室，准备好了吗？还有 '+text_num+' 秒自动关闭','操作提示',function(){
                                    openWindow(url);
                                },function(){
                                    clearInterval(timer);
                                });
                                clearInterval(timer);
                                timer = setInterval(function(){
                                    text_num --;
                                    $('.confirm_dialog_box .popbox_item p').text('马上进入教室，准备好了吗？还有 '+text_num+'  秒自动关闭');
                                    if(text_num<=0){
                                        clearInterval(timer);
                                        $('.popBox ').remove();
                                    }
                                },1000);
                            }else{
                                dialogs._confirm(resp.resMsg, '成功', function(){changLocation("/orderDeal/list.htm");}, null);break;
                            }
                            break;
                        //账户密码未设置
                        case '4001': dialogs._confirm(resp.resMsg, '失败', function(){changLocation("/businessPath/balanceCharge.htm");}, null);break;
                        default : dialogs._wait(resp.resMsg, 2);
                    }
                    var code = resp.resCode;
                })
            }
        }



        intoPtCourse.prototype.buyClass=function (classIds) {
            var pwd = $("#pwd").val();
            $.ajax({
                url: "/site/ptcourse/buyPtCourse.do",
                type: "post",
                dataType: "json",
                data: {
                    classIds: classIds,
                    pwd: $.md5(pwd).toUpperCase()
                },
                success: function (response) {
                    /* if (!common.checkResponse(response)) {
                     return false;
                     }*/

                    var code = response.resCode;
                    if(code=='000'){
                        dialogs._wait(response.resMsg, 2);
                    }else{
                        dialogs._wait(response.resMsg, 2);
                    }



                }
            });
        }


        /**
         * 设置余额账户
         */
        changLocation=function (url) {
            location.href = url;
        }
        return intoPtCourse;

    })













