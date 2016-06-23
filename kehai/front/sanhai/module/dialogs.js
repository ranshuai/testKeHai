/*
 *弹框实现
 * _init                                      弹框框架生成
 * _confirm(txt,tit,trueFn,falseFn)           类似confirm
 * _alert(txt,trueFn)                         类似alert
 * _wait(txt,time)                            计时提示框
 * _timer(txt,or,time,tureFn)                 悬浮框【第二个参数：1成功  2失败】
 *表单各类弹框
 * _form_normal(trueFn,falseFn)               普通框【目标时间、持续时长】
 * _form_reject(trueFn,falseFn)               驳回理由框  换师，调课期框
 * _form_time(trueFn,falseFn)                 填写时间【课时、日期、开课时间】
 * _class_adjust(trueFn,falseFn)              调课申请【申请课时、目标时间、申请理由】
 * _class_cancel(trueFn,falseFn)              退课申请【退课理由】
 * _teacher_change(trueFn,falseFn)            换师申请【换师理由】
 * _order_edit(trueFn,falseFn)                菜单编辑
 * _agree_refund(trueFn,falseFn)              同意申请【退款金额】
 * _agree_change(trueFn,falseFn)              同意申请【老师调课】
 * _class_summary(trueFn,falseFn)             课程总结【总结内容】
 * _form_assess(trueFn,falseFn)               评价
 * _student_assess(trueFn,falseFn)            评价【学生】
 * _take_cash(trueFn,falseFn)                 提现
 * _unbundling(trueFn,falseFn)                解绑
 * _shoppingcar(trueFn,falseFn)               购物车
 * _remarks_shopcar(trueFn,falseFn)           添加备注【购物车】
 * _record_add(trueFn,falseFn)                添加考试【考试名称，考试类型】
 * _news_add(trueFn,falseFn)                  添加消息
 * _news_push(trueFn,falseFn)                 推送消息
 * _audit_payone(trueFn,falseFn)              旁听【余额支付】
 * _audit_paytwo(trueFn,falseFn)              旁听【余额支付，旁听卡】
 * _audit_card_Inactive(trueFn,falseFn)       旁听卡未激活
 * _audit_no_money(trueFn,falseFn)            余额不足，去充值
 * _change_teacher_agree(trueFn,falseFn)      换教师记录【同意、不同意】
 *  _BHTransfer                                               班海迁移【填写昵称】
 *  _ptCoursePreview                                       排新课里面的预览弹窗
 * _subjectNumExChange                                兑换主听券弹窗
 *_waitDialog                                              具有等待提示gif的弹出对话框
 * */
define(['jquery', 'jquery_ui_min'], function ($) {
    /**
     * 是否数字
     * @param str
     * @returns
     */
    function isNumber(str) {
        if (!str) return false;
        var regu = /^(\d+)$/;
        return regu.test(str);
    }

    function isMoneyNumber(str) {
        if (!str) return false;
        //if (str.indexOf('.') > 1 && str[0] == 0) return false;
        //if (str.indexOf('.') < 0 && str[0] == 0) return false;
        //var regu = /^\d+(\.?\d+)?$/;
        var regu = /^(([1-9][0-9]{0,7}\.[0-9]{1,2})|([0]\.[0-9]{1,2})|([1-9][0-9]{0,7})|([0]{1}))$/;
        try {
            if (parseFloat(str) != str) return false;
        } catch (ex) {
            return false;
        }
        return regu.test(str);
    }

    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    return {
        //弹框框架生成
        '_init': function () {
            return $('<div class="popBox show pushNotice">' +
                '<div class="popCont sure_del">' +
                '<div class="popbox_item">' +
                '<p></p>' +
                '</div>' +
                '</div>' +
                '</div>').appendTo('body');
        },
        //类似confirm
        '_confirm': function (txt, tit, trueFn, falseFn) {
            var d = this._init();
            d.addClass('confirm_dialog').attr({'title': tit});
            d.find('p').html(txt);
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    if (falseFn)falseFn();
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.confirm_dialog').parent().addClass('dialogs_box confirm_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //类似alert
        '_alert': function (txt, trueFn) {
            var d = this._init();
            d.addClass('alert_dialog');
            d.find('p').text(txt);
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.alert_dialog').parent().addClass('dialogs_box alert_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //计时提示框
        '_wait': function (txt, time, trueFn) {
            var d = this._init();
            d.addClass('wait_dialog');
            d.find('p').text(txt);
            d.dialog({
                autoOpen: true,
                modal: true,
                width: 500,
                resizable: false,
                close: function () {
                    $(this).remove();
                }
            });
            $('.wait_dialog').parent().addClass('dialogs_box wait_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');

            setTimeout(function () {
                d.dialog('close');
                if (trueFn) trueFn();
            }, time * 1000);
        },
        //悬浮窗口
        '_timer': function (txt, or, time, tureFn) {//or参数：1成功 2失败
            var d = $('<div class="eject_warpper establish_success" style="width: 100%; height: 100%; position: fixed; top: 0px; left: 0px;">' +
                '<div class="warp_opacity" style="width: 100%; height: 100%; opacity: 0.3; background: rgb(0, 0, 0);"></div>' +
                '<div class="box" style="padding: 12px; position: absolute; left: 50%; top: 50%; border-radius: 6px;">' +
                '<div class="box_content" style="width: auto;max-width: 400px;min-width: 100px; border-radius: 6px; padding: 36px 24px 36px 94px; position: relative; background: rgb(255, 255, 255);">' +
                '<i></i><p></p>' +
                '</div>' +
                '</div>' +
                '</div>');

            d.appendTo('body');
            d.find('p').text(txt);
            var a = $('.eject_warpper .box').height() / 2;
            var b = $('.eject_warpper .box').width() / 2;
            $('.eject_warpper .box_content').css({'margin-left': '-' + b + 'px', 'margin-top': '-' + a + 'px'});

            if (or == 2) {
                d.find('i').addClass('fail');
            }

            setTimeout(function () {
                $('.eject_warpper').remove();
                if (tureFn) tureFn();

            }, time * 1000);

        },

        //普通框【目标时间、持续时长】
        '_form_normal': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('normal_dialog').attr({'title': '填写时间'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\">" +
                "<label>目标时间：</label>&nbsp;&nbsp;" +
                "<input type=\"text\" class=\"text jcDate\" onclick=\"laydate({istime: true, format: 'YYYY-MM-DD hh:mm'})\" readonly=\"true\"/>" +
                "</div>" +
                "<div class=\"popbox_item tl\">" +
                "<label>持续时长：</label>&nbsp;&nbsp;" +
                "<span class=\"select_plus\">" +
                "<em>1 小时：</em>" +
                "<select class=\"sel_body\">" +
                "<option value='60' selected=\"selected\">1 小时</option>" +
                "<option value='120'>2 小时</option>" +
                "<option value='180'>3 小时</option>" +
                "</select>" +
                "</span> " +
                "</div>" +
                "<p class=\"reason hide\" style='color:orange;margin-left: 150px;'></p>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.normal_dialog').parent().addClass('dialogs_box normal_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');

        },

        /**
         * 具有等待提示gif的弹出对话框
         * @param text
         * @param src
         */
        '_waitDialog': function (text, src) {

            if ($('.establish_success_wait').length != 0) {
                $('.eject_warpper_wait').removeClass('hide');
            } else {

                $("<div class='eject_warpper_wait establish_success_wait'>" +
                    "<div class='warp_opacity_wait'></div>" +
                    "<div class='box_wait'>" +
                    "<div class='box_content_wait'>" +
                    "<div style='margin:0 auto;width:62px; height:62px'>" +
                    "<img src='/front/sanhai/images/loading.gif' width='56px' height='50px' />" +
                    "</div>" +
                    "<div style='margin:10px auto'>" +
                    "<p>" + text + "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                ).appendTo($("body"));

                $('.establish_success_wait').css({
                    'width': '100%',
                    'height': '100%',
                    'position': 'fixed',
                    'top': '0',
                    'left': '0'
                });
                $('.warp_opacity_wait').css({
                    'width': '100%',
                    'height': '100%',
                    'background': '#000',
                    'opacity': '0.3',
                    'filter': 'alpha(opacity=30)'
                });

                $('.box_wait').css({
                    'padding': '12px',
                    'position': 'absolute',
                    'left': '50%',
                    'top': '50%',
                    'border-radius': '6px'
                });

                $('.box_content_wait').css({
                    'width': 'auto',
                    'max-width': '400px',
                    'background': '#fff',
                    'border-radius': '6px',
                    'padding': '45px',
                    'position': 'relative'
                });
                var num1 = parseInt($('.box_wait').css('width'));
                var num2 = parseInt($('.box_wait').css('height'));
                $('.box_wait').css({'margin-left': -num1 / 2 + 'px', 'margin-top': -num2 / 2 + 'px'});
            }
        },

        //设置旁听价格
        '_setPriceJsBox': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('setPriceJsBox').attr({'title': '设置价格'});
            d.find('p').append($(
                "<div class=\"popbox_item tc\">" +
                "<p style=\"padding-bottom: 20px;color: red;\">设置旁听课程价格(保留两位小数)</p>" +
                "<span>旁听价格：</span>" +
                "<input type=\"text\" class=\"text jcDate w140 setPrice\" placeholder='不低于xx元，保留两位小数'/>" +
                "<span style=\"padding-left: 14px\">元/小时</span>" +
                "<p style=\"margin-top: 5px;color: red;\" class=\"hide reason\"></p>" +
                "</div>"
            ));
            //alert(isMoneyNumber("0.1"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (!isMoneyNumber($(".setPrice").val())) {
                            if ($(".setPrice").val().indexOf('.') > 8 || $(".setPrice").val().length > 8) {
                                $(".reason").text("旁听价格过高").show();
                                return false;
                            }
                            $(".reason").text("格式错误").show();
                            return false;
                        }
                        //console.log(parseFloat($(".setPrice").data("price")));
                        //console.log(parseFloat($(".setPrice").val()));
                        if (parseFloat($(".setPrice").data("price")) > parseFloat($(".setPrice").val())) {
                            $(".reason").text("价格不得低于底价").show();
                            return false;
                        }
                        /*if (parseFloat($(".setPrice").val()) >= 1000){
                         $(".reason").text("价格设置过高").show();
                         return false;
                         }*/
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.setPriceJsBox').parent().addClass('dialogs_box setPriceJsBox_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $(".setPrice").focus(function () {
                $(".reason").hide();
            });
        },

        //激活视频卡
        '_activateVideoCard': function (cardFun, balanceFun, falseFn) {
            var d = this._init();
            d.addClass('activateVideoCard').attr({'title': '激活随听卡'});
            d.find('p').append($(
                "<div class=\"popbox_item\" style=\"padding-left: 150px;\">" +
                "<p style=\"padding-bottom: 20px;\">请选择激活方式：</p>" +
                "<p style=\"padding-bottom: 20px;padding-left: 35px;\">" +
                "<input type=\"radio\" id=\"radio1\" name=\"buy\" checked=\"checked\" value='balance' />" +
                "<label for=\"radio1\">&nbsp;余额账户购买随听卡（200元/年）</label>" +
                "</p>" +
                "<p style=\"padding-left: 35px;\">" +
                "<input type=\"radio\" id=\"radio2\" name=\"buy\" value='card' />" +
                "<label for=\"radio2\">&nbsp;激活已有的随听卡</label>" +
                "</p>" +
                "</div>"
            ));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        //if ((trueFn)trueFn()){


                        var type = $('input[name="buy"]:checked').val();
                        //alert(type);
                        if ("card" == type) {
                            $(this).remove();
                            cardFun();
                        }

                        if ("balance" == type) {
                            $(this).remove();
                            balanceFun();
                        }

                        //}

                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });

            $('._activateVideoCard').parent().addClass('dialogs_box _activateVideoCard');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');

        },

        //购买旁听席位
        '_attendSeat': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('attendSeat').attr({'title': '购买旁听席位'});
            d.find('p').append($(
                "<form id='PTSeatForm' name='PTSeatForm' method='post'>" +
                "<div class=\"seatBox\">" +
                "<div class=\"form_list\">" +
                "<div class=\"row\">" +
                "<div class=\"formL\">请设置时长：</div>" +
                "<div class=\"formR\"><input type=\"text\" id='ptSeatTime' name='ptSeatTime' class=\"seatvalue\" maxlength='5'/>小时</div>" +
                "</div>" +
                "<div class=\"row\" style='padding-bottom:0'>" +
                "<div class=\"formL\">共需花费：</div>" +
                "<div class=\"formR\"><em id='ptSeatMoney'></em>元</div>" +
                "</div>" +
                "<div class=\"tc\">" +
                "<button id='btnSubmit' type='submit' class='determineBtn'>确定</button>" +
                "<button id='btnClose' type='button' class='cancelBtn' >取消</button>" +
                "</div>" +
                "</div>" +
                "</div></form>"
            ))
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $("#ptSeatId").val("");
                    $("#ptTime").text("0");
                    $(this).remove();
                    $("#ptSeatId").val("");
                    $("#ptTime").text("0");
                }
                //buttons: [
                //    {
                //        text: "确定", click: function () {
                //        if (trueFn)trueFn();
                //        $(this).remove()
                //    }
                //    },
                //    {
                //        text: "取消", click: function () {
                //        if (falseFn)falseFn();
                //        $(this).remove()
                //    }
                //    }
                //]
            });

            $('._attendSeat').parent().addClass('dialogs_box _attendSeat');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },

        //联系客服
        '_customerService': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('attendSeat').attr({'title': '客服电话'});
            d.find('p').append($(
                "<div class=\"popBox seatBox\">" +
                "<p class=\'tc\'>客服电话为：400-010-8383</p>" +
                "</div>"
            ))
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "我知道了", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    }
                ]
            });

            $('._customerService').parent().addClass('dialogs_box _customerService');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');

        },
        //匹配主讲人
        '_matchingSpeaker': function (trueFn, falseFn, or) {
            var d = this._init();
            d.addClass('_matchingSpeaker').attr({'title': or});
            d.find('p').append($(
                "<div class=\"popBox\" style=\"padding-left:50px\">" +
                "<div class=\"form_list\">" +
                "<div class=\"row\">" +
                "<div class=\"formL\">" +
                "<p>主讲人：</p>" +
                "</div>" +
                "<div class=\"formR\">" +
                "<input type=\"text\" class=\"w180\" id='courseTeacher'/>" +
                "</div>" +
                "</div>" +
                "<div class=\"row\">" +
                "<div class=\"formL\">" +
                "<p>课酬：</p>" +
                "</div>" +
                "<div class=\"formR lessonMoney\">" +
                "<input type=\"text\" class=\"w180\"/><em class=\"orange hide\">200</em>元/小时" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"
            ))
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "提交", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });

            $('._matchingSpeaker').parent().addClass('dialogs_box _matchingSpeaker');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            if (or == '匹配主讲人') {
                $('.lessonMoney').children('input').removeClass('hide').siblings('em').addClass('hide')
            } else {
                $('.lessonMoney').children('em').removeClass('hide').siblings('input').addClass('hide')
            }


        },

        //输入视频卡号
        '_cardVideoCard': function (trueFn, falseFn, content) {
            var d = this._init();
            d.addClass('_cardVideoCard').attr({'title': '激活随听卡'});
            d.find('p').append($(
                "<div class=\"popbox_item\">" +
                "<div class=\"form_list\">" +
                "<div class=\"row\">" +
                "<div class=\"formL\">" +
                "<p>请输入卡号：</p>" +
                "</div>" +
                "<div class=\"formR\">" +
                "<input id=\"cardNo\" type=\"text\" class=\"w270\"/>" +
                "</div>" +
                "</div>" +
                "<div class=\"row\">" +
                "<div class=\"formL\">" +
                "<p>请输入密码：</p>" +
                "</div>" +
                "<div class=\"formR\" style=\"\">" +
                "<input id=\"cardPwd\" type=\"text\" class=\"w270\"/>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<p class=\"tc\"/>卡激活后可以立即使用，有效期至：" + content + " 24:00:00</p>" +
                "</div>"
            ));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确认激活", click: function () {
                        if (trueFn)trueFn();
                        //$(this).remove()
                    }
                    }
                ]
            });

            $('._cardVideoCard').parent().addClass('dialogs_box _cardVideoCard');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');

        },

        // 余额账户充值弹出对话框
        '_balanceVideoCard': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('_balanceVideoCard').attr({'title': '激活随听卡'});
            d.find('p').append($(
                "<div class=\"popbox_item\">" +
                "<div class=\"form_list\" style=\"\">" +
                "<div class=\"formL\">" +
                "<p style=\"padding-bottom: 20px;\">支付密码：</p>" +
                "</div>" +
                "<div class=\"formR\" style=\"\">" +
                "<input id=\"password\" type=\"password\" class=\"w270 btn36\"/>" +
                "&nbsp;<a href=\"/businessPath/resetBalanceChargePassword.htm\" class='forget_password blue'>忘记密码？</a>" +
                "</div>" +
                "</div>" +
                    //"<p class=\"tc\"/>卡激活后可以立即使用，截止日期是2016年3月15日24:00:00</p>"+
                "</div>"
            ));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确认支付", click: function () {
                        if (trueFn)trueFn();
                        //$(this).remove()
                    }
                    }
                ]
            });

            $('._balanceVideoCard').parent().addClass('dialogs_box _balanceVideoCard');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');

        },


        //驳回理由框  换师，调课期框
        '_form_reject': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('reject_dialog').attr({'title': '驳回申请'});
            d.find('p').append($(
                "<div class=\"popCont form_list\">" +
                "<label>驳回理由：</label>" +
                "<input type=\"hidden\" name=\"oper\" />" +
                "<input type=\"hidden\" name=\"id\"/> " +
                "<textarea class=\"textarea\" id=\"notice_textarea\" name=\"detail\"></textarea>" +
                "<p class=\"reason hide tc\" style='color:orange;'>请输入驳回理由</p>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trim($("#notice_textarea").val()) == "") {
                            $("p.reason").show();
                            return;
                        }
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.reject_dialog').parent().addClass('dialogs_box reject_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $("#notice_textarea").focus(function () {
                $("p.reason").hide();
            });
        },
        //填写时间【课时、日期、开课时间】
        '_form_time': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('time_dialog').attr({'title': '填写时间'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\">" +
                "<label>目标时间</label>&nbsp;&nbsp;" +
                "<input type=\"text\" class=\"text jcDate datetimepicker\"  readonly=\"true\"/>" +
                "</div>" +
                "<div class=\"popbox_item tl\">" +
                "<label>持续时长</label>&nbsp;&nbsp;" +
                "<span class=\"select_plus\">" +
                "<em>1 小时</em>" +
                "<select class=\"sel_body\">" +
                "<option value='60' selected=\"selected\">1 小时</option>" +
                "<option value='120'>2 小时</option>" +
                "<option value='180'>3 小时</option>" +
                "</select>" +
                "</span> " +
                "</div>" +
                "<div class=\"popbox_item tl\">" +
                "<label>课堂主题</label>&nbsp;&nbsp;" +
                "<textarea class=\"textarea\" id=\"theme\" placeholder='请输入本次课的主讲内容'></textarea>" +
                "<p class=\"reason hide\" style='color:orange;padding-left:150px;'></p>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if ($(".jcDate").val() == "") {
                            $("p.reason").text("时间不能为空").show();
                            return;
                        }
                        if (trim($("#theme").val()) == "") {
                            $("p.reason").text("课程主题不能为空").show();
                            return;
                        }
                        if (trim($("#theme").val()).length > 99) {
                            $("p.reason").text("确保主题内容在100字以内").show();
                            return;
                        }
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.time_dialog').parent().addClass('dialogs_box time_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $("input, textarea").live("click", function () {
                $("p.reason").hide();
            });

        },
        //调课申请【申请课时、目标时间、申请理由】
        '_class_adjust': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('classaj_dialog').attr({'title': '调课申请'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\">" +
                "<label>申请课时：</label>" +
                "<input type=\"text\" id=\"index\" readonly=\"true\"/>" +
                "</div>" +
                "<div class=\"popbox_item tl\">" +
                "<label>目标时间：</label>" +
                "<input type=\"text\" id= 'datetimepicker' class=\"text toTime \" readonly=\"true\" placeholder=''\">" +
                "</div>" +

                "<div class=\"popbox_item tl\">" +
                "<label>申请理由：</label>" +
                "<textarea class=\"textarea\" id=\"notice_textarea\" placeholder='请输入调课理由'></textarea>" +
                "<p class=\"reason hide\" style='color:orange;margin-left: 170px;'>申请理由不能为空</p>" +
                "<div class=\"\">" +
                "<input type=\"hidden\" class=\"oper\" />" +
                "<input type=\"hidden\" class=\"orderId\"/>" +
                "<input type='hidden' class='recordId' /></div>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if ($(".toTime").val() == "") {
                            $("p.reason").text("请填写目标时间").show();
                            return;
                        }
                        if (trim($("textarea").val()) == "") {
                            $("p.reason").text("申请理由不能为空").show();
                            return;
                        }
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.classaj_dialog').parent().addClass('dialogs_box classaj_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $("textarea").click(function () {
                $("p.reason").hide();
            });
            $(".toTime").click(function () {
                $("p.reason").hide();
            });
        },
        //退课申请【退课理由】
        '_class_cancel': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('classcc_dialog').attr({'title': '退课申请'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\">" +
                "<label>退课理由：</label>" +
                "<input type=\"hidden\" class=\"oper\" />" +
                "<input type=\"hidden\" class=\"orderId\"/>" +
                "<textarea class=\"textarea\" id=\"notice_textarea\" name=\"detail\"></textarea>" +
                "<p class=\"reason hide\" style='color:orange; padding-left: 200px;'>退课理由不能为空</p>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trim($("#notice_textarea").val()) == "") {
                            $("p.reason").show();
                            return;
                        }
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.classcc_dialog').parent().addClass('dialogs_box classcc_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $("#notice_textarea").click(function () {
                $("p.reason").hide();
            })
        },
        //换师申请【换师理由】
        '_teacher_change': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('teachercg_dialog').attr({'title': '换师申请'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\">" +
                "<label>换师理由：</label>" +
                "<input type=\"hidden\" class=\"oper\" />" +
                "<input type=\"hidden\" class=\"orderId\"/>" +
                "<textarea class=\"textarea\" id=\"notice_textarea\" name=\"detail\"></textarea>" +
                "<p class=\"reason hide\" style='color:orange;padding-left: 200px;'>换师理由不能为空</p>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trim($("#notice_textarea").val()) == "") {
                            $("p.reason").show();
                            return;
                        }
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.teachercg_dialog').parent().addClass('dialogs_box teachercg_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $("#notice_textarea").click(function () {
                $("p.reason").hide();
            })
        },
        //订单编辑
        '_order_edit': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('order_dialog').attr({'title': '订单编辑'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\">" +
                "<div class=\"popbox_item\">" +
                "<label>课程时长：</label>&nbsp;&nbsp;" +
                "<input type=\"text\" class=\"text\" id=\"times\"><span>小时</span>" +
                "</div>" +
                "<div class=\"popbox_item\">" +
                "<label>课程价格：</label>&nbsp;&nbsp;" +
                "<input type=\"text\" class=\"text\" id=\"price\"><span>元</span>" +
                "</div>" +
                "<div class=\"popbox_item\">" +
                "<p class='reason tc'></p>" +
                "</div></div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        var text = $("#orderId").text().split(' ');
                        var price = $("#price").val();
                        var times = $("#times").val();
                        if (price == "" || times == "") {
                            $("p.reason").html("<span class='orange'>参数不能为空</span>");
                            return;
                        } else if (!isMoneyNumber(price) || !isNumber(times)) {
                            $("p.reason").html("<span class='orange'>参数格式不正确，请输入正确的数字</span>");
                            return;
                        } else if (price < 0 || times < 0) {
                            $("p.reason").html("<span class='orange'>参数不能为负数</span>");
                            return;
                        }
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.order_dialog').parent().addClass('dialogs_box order_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $("div.popbox_item input").click(function () {
                $("p.reason").empty();
            });
        },
        //退旁听
        '_pt_agree_refund': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('refund_dialog').attr({'title': '退课处理'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\" style='padding-left:120px;'>" +
                "<p class=\"notice\">此学生已上课2次,所退金额还有1000元</p>" +
                "<input type=\"hidden\" name=\"oper\" />" +
                "<input type=\"hidden\" name=\"orderId\"/>" +
                "<input type=\"hidden\" name=\"money\"/>" +
                "</div>" +
                "</div></div>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确认退课", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消退课", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //同意申请【退款金额】
        '_agree_refund': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('refund_dialog').attr({'title': '退课处理'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\">" +
                "<p class=\"notice\">此学生已上课2次,所退金额还有1000元</p>" +
                "<div class=\"form_list \">" +
                "<div class=\"row\">" +
                "<div class=\"formL\">请输入要退金额：</div>" +
                "<div class=\"formR clearfix\">" +
                "<input type=\"hidden\" name=\"oper\" />" +
                "<input type=\"hidden\" name=\"orderId\"/>" +
                "<input type=\"hidden\" name=\"money\"/>" +
                "<input type=\"text\"  id='backMoney' placeholder=\"\" /> <br/><span class=\"reason hide\" style='color:orange;'>请输入退课金额</span>" +
                "</div>" +
                "</div></div>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        var val = trim($(".refund_dialog input[type='text']").val());
                        //console.log("val-->" + val);
                        if (val == "") {
                            $(".popBox span.reason").show();
                            return;
                        } else {
                            if (!isMoneyNumber(val)) {
                                $(".popBox span.reason").text("金额格式不正确").show();
                                return;
                            }
                            else if (parseFloat(val) > parseFloat($("[name='money']").val()) / 100) {
                                $(".popBox span.reason").text("退款金额不得大于" + parseFloat($("[name='money']").val()) / 100 + "元").show();
                                return;
                            }
                        }
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.refund_dialog').parent().addClass('dialogs_box refund_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $(".popbox_item input[type='text']").click(function () {
                $(".refund_dialog_box span.reason").hide();
            })
        },
        //同意申请【老师调课】
        '_agree_change': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('change_dialog').attr({'title': '同意申请'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\">" +
                "<label>课　　时：</label>" +
                "<input type=\"text\" class=\"text index\" placeholder=\"\" readonly=\"true\">" +
                "</div>" +
                "<div class=\"popbox_item tl\">" +
                "<label>调整时间：</label>" +
                "<input type=\"text\" class=\"text target\" placeholder=\"\" readonly=\"true\"> " +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.change_dialog').parent().addClass('dialogs_box change_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //课程总结【总结内容】
        '_class_summary': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('summary_dialog').attr({'title': '课程总结'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\">" +
                "<label>总结内容：</label>" +
                "<textarea class=\"textarea\" id=\"notice_textarea\" name=\"detail\"></textarea>" +
                "<p class=\"reason hide\" style='color:orange; padding-left: 180px;'>内容不能为空</p>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trim($("#notice_textarea").val()) == "") {
                            $("p.reason").show();
                            return;
                        } else if (trim($("#notice_textarea").val()).length > 500) {
                            $("p.reason").text("输入的内容字数不得超过500").show();
                            return;
                        }
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.summary_dialog').parent().addClass('dialogs_box summary_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $("#notice_textarea").click(function () {
                $("p.reason").hide();
            });
        },
        //评价
        '_form_assess': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('assess_dialog').attr({'title': '评价'});
            d.find('p').append($(
                "<div class=\"tl\">" +
                "<div>" +
                "<label>评价内容：</label>" +
                "<textarea class=\"textarea\" id=\"notice_textarea\" placeholder=\"请输入评价内容，不得超过300字\"></textarea>" +
                "<p class=\"reason hide\" style='color:orange; padding-left: 150px;'>请输入评价内容，不得超过300字</p>" +
                "</div><p id=\"wrong_text\" class=\"red hide\">评价内容不能为空！</p>" +
                "<p id=\"wrong_text_length\" class=\"red hide\">评价内容最多300字！</p><div>" +
                "<input type=\"hidden\" value=\"\" id=\"coursesId\"/>" +
                "<input type=\"hidden\" value=\"\" id=\"courseTitle\"/>" +
                "<input type=\"hidden\" value=\"\" id=\"coursesRecordId\"/>" +
                "<input type=\"hidden\" value=\"\" id=\"id\"/>" +
                "<input type=\"hidden\" value=\"\" id=\"schoolId\"/>" +
                "<input type=\"hidden\" value=\"\" id=\"teacherId\"/>" +
                "<input type=\"hidden\" value=\"\" id=\"userId1\"/>" +
                "<input type=\"hidden\" value=\"\" id=\"username\"/>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        $('#wrong_text').addClass('hide');
                        $('#wrong_text_length').addClass('hide');
                        var result_org = $("#result_org").text();
                        var result_tea = $("#result_tea").text();
                        var result_sou = $("#result_sou").text();
                        var des = trim($('#notice_textarea').val());
                        if (des == "") {
                            $('#wrong_text').removeClass('hide');
                            return;
                        }
                        if (des.length > 300) {
                            $('#wrong_text_length').removeClass('hide');
                            return;
                        }
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.assess_dialog').parent().addClass('dialogs_box assess_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $("#notice_textarea").click(function () {
                $("p.reason").hide();
            })
        },
        //评价【学生】
        '_student_assess': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('stuassess_dialog').attr({'title': '评价'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\">" +
                "<div class=\"pop_evaluation\" style=\"text-align: left;\">" +
                "<p class=\"p_right\">" +
                "<em><label>对服务的评价</label> <i></i><i></i><i></i><i></i><i></i><span id=\"result_org\">0</span>分 <strong id=\"org_wrong\" style=\"color: red;\" class=\"hide\">需要对服务评分</strong></em>" +
                "<em><label>对课程的评价</label> <i></i><i></i><i></i><i></i><i></i><span id=\"result_sou\">0</span>分 <strong id=\"sou_wrong\" style=\"color: red;\" class=\"hide\">需要对课程评分</strong></em>" +
                "<em><label>对教师的评价</label>  <i></i><i></i><i></i><i></i><i></i><span id=\"result_tea\">0</span>分<strong id=\"tea_wrong\" style=\"color: red;\" class=\"hide\">需要对教师评分</strong><strong id=\"text_wrong\" style=\"color: red;\" class=\"hide\">请输入评论!</strong><strong id=\"text_length_wrong\" style=\"color: red;\" class=\"hide\">最多输入300字!</strong></em>" +
                "</p>" +
                "</div>" +
                "<div class=\"\" style=\"text-align: left;\">" +
                "<label>评价内容：</label>" +
                "<textarea class=\"textarea evaluation_text\" id=\"notice_textarea\" placeholder=\"请输入评价内容，不得超过300字\"></textarea>" +
                "<p class=\"reason hide\" style='color:orange; padding-left: 150px;'>请输入评价内容，不得超过300字</p>" +
                "</div>" +
                "<div>" +
                "<input type=\"hidden\" value=\"\" id=\"coursesId\"/>" +
                "<input type=\"hidden\" value=\"\" id=\"courseTitle\"/>" +
                "<input type=\"hidden\" value=\"\" id=\"id\"/>" +
                "<input type=\"hidden\" value=\"\" id=\"schoolId\"/>" +
                "<input type=\"hidden\" value=\"\" id=\"teacherId\"/></div>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        $('#org_wrong').addClass('hide');
                        $('#tea_wrong').addClass('hide');
                        $('#sou_wrong').addClass('hide');
                        $('#text_wrong').addClass('hide');
                        $('#text_length_wrong').addClass('hide');
                        var result_org = $("#result_org").text();
                        var result_tea = $("#result_tea").text();
                        var result_sou = $("#result_sou").text();
                        var des = trim($('#notice_textarea').val());
                        if (result_org == 0) {
                            $('#org_wrong').removeClass('hide');
                            return;
                        }

                        if (result_sou == 0) {
                            $('#sou_wrong').removeClass('hide');
                            return;
                        }
                        if (result_tea == 0) {
                            $('#tea_wrong').removeClass('hide');
                            return;
                        }
                        if (des == "") {
                            $('#text_wrong').removeClass('hide');
                            return;
                        }
                        if (des.length > 300) {
                            $('#text_length_wrong').removeClass('hide');
                            return;
                        }
                        /*if (trim($("#notice_textarea").val()) == "") {
                         $("p.reason").show();
                         return;
                         }*/
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.stuassess_dialog').parent().addClass('dialogs_box stuassess_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $("#notice_textarea").click(function () {
                $("p.reason").hide();
            })
        },
        //错误提示
        '_form_wrong': function (trueFn) {
            var d = this._init();
            d.addClass('wrong_dialog').attr({'title': '评价'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\">" +
                "<label class=\"reason\"></label>" + "</div>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.wrong_dialog').parent().addClass('dialogs_box wrong_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn');
        },
        //提现
        '_take_cash': function (trueFn) {
            var d = this._init();
            d.addClass('cash_dialog').attr({'title': '提示信息'});
            d.find('p').append($(
                "<div class=\"popbox_item tl\">" +
                "<p class='tc'>我们已向您的手机发送了验证码，请输入验证码，提现成功！</p>" +
                "<div class='tc'><label>验证码：</label><input type='text' class='text'/><button class='get_password w120 c_bg_color5'>重新获取验证码</button></div>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "提现", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.cash_dialog').parent().addClass('dialogs_box cash_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //解绑
        '_unbundling': function (trueFn, falseFn) {
            var diglog = this._init();
            diglog.addClass('unbundling_dialog').attr({'title': '解绑银行卡'});
            diglog.find('p').append($(
                "<div class='popbox_item tl' >" +
                "<p class='tc'>点击“获取验证码”将向手机发送验证码，输入验证码完成解绑操作！</p>" +
                "<div class='tc' style='padding-top: 20px'>" +
                "<label>验证码：</label>" +
                "<input type='text' id='code' class='text' maxlength='6' style='height:36px'/>&nbsp;&nbsp;" +
                "<button type='button' id='getCode' class='btn c_bg_color2 c_btn_size4'>获取验证码</button>" +
                "</div>" +
                "<div class='tc' style='padding: 40px'>" +
                "<button type='button' id='unbindBtn' class='btn w110 bg_blue binDingBtn'>解绑</button>&nbsp;&nbsp;&nbsp;&nbsp;" +
                "<button type='button' id='cancelBtn' class='btn w110 bg_gray binDingBtn'>取消</button>" +
                "</div>" +
                "</div>"));
            diglog.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                }
                //buttons: [
                //    {
                //        text: "解绑", click: function () {
                //        if (trueFn)trueFn();
                //        //console.log(trueFn);
                //        $(this).remove()
                //    }
                //    },
                //    {
                //        text: "取消", click: function () {
                //        if (falseFn)falseFn();
                //        $(this).remove()
                //    }
                //    }
                //]
            });
            //$('.unbundling_dialog').parent().addClass('dialogs_box unbundling_dialog_box');
            //$('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //购物车
        '_shoppingcar': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('shopcar_dialog').attr({'title': '提示信息'});
            d.find('p').append($(
                "<div class='popbox_item tl' >" +
                "<p class='tc'><i class='right_green'></i>您已经成功加入购物车！</p>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "继续选课", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "去购物车结算", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.shopcar_dialog').parent().addClass('dialogs_box shopcar_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn c_bg_color2');
        },
        //添加备注
        '_remarks_shopcar': function (val, trueFn, falseFn) {
            var d = this._init();
            d.addClass('shopcar_dialog').attr({'title': '添加备注'});
            d.find('p').append($(
                "<div class='popbox_item pr tl' >" +
                "<label>备注：</label>" +
                "<input type=\"hidden\" name=\"oper\" />" +
                "<input type=\"hidden\" name=\"id\"/> " +
                "<textarea class=\"textarea\" id=\"notice_textarea\" name=\"detail\">" + val + "</textarea><span class='red pa font14 noticeTextareaPrompt' style='bottom:-32px; left:18px'>还可以输入<strong>100</strong>字</span></div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.shopcar_dialog').parent().addClass('dialogs_box shopcar_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn c_bg_color2');
            _remarks($('.noticeTextareaPrompt strong'), $('#notice_textarea')); //两个参数 1.字数限制 2.文本域
            function _remarks() {
                var strongN = $('.noticeTextareaPrompt strong').text(); //数字
                var textN = Number($('#notice_textarea').val().length); //textval de 长度
                var num = Number(strongN) - Number(textN);
                showNum(strongN, textN)
                var timer = null;
                if (window.navigator.userAgent.indexOf('MSIE 9.0') != -1) {
                    $('#notice_textarea').focus(function () {
                        timer = setInterval(function () {

                            var textN = Number($('#notice_textarea').val().length);
                            showNum(strongN, textN);
                        }, 100);
                    });
                    $('#notice_textarea').blur(function () {
                        clearInterval(timer)
                    })
                }
                $('#notice_textarea').on('input propertychange', function () {
                    var textN = Number($('#notice_textarea').val().length);
                    showNum(strongN, textN);
                });
                function showNum(strongN, textN) {
                    if ((strongN - textN) >= 0) {
                        $('.noticeTextareaPrompt').html('还可以输入<strong>' + (strongN - textN) + '</strong>字');
                        $('.ui-dialog-buttonpane').find('button').eq(0).removeAttr('disabled');
                        if ($('#notice_textarea').val() == '') {
                            $('.ui-dialog-buttonpane').find('button').eq(0).attr('disabled', 'disabled');
                            $('.noticeTextareaPrompt').html('内容不能为空');
                        }
                    } else {
                        $('.noticeTextareaPrompt').html('您已超出<strong>' + Math.abs(strongN - textN) + '</strong>字');
                        $('.ui-dialog-buttonpane').find('button').eq(0).attr('disabled', 'disabled')
                        return
                    }
                }
            }
        },

        //添加考试
        '_record_add': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('recordadd_dialog').attr({'title': '添加考试'});
            d.find('p').append($(
                "<div class='popbox_item tl' >" +
                "<div class=\"popbox_item tl\"><label>考试名称：</label>" +
                "<input type='text' id='text_name' /></div>" +
                "<div class=\"popbox_item tl\"><label>考试类型：</label>" +
                "<input type='text' id='text_style' /></div> " +
                "</div>"));

            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.recordadd_dialog').parent().addClass('dialogs_box recordadd_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //添加信息
        '_news_add': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('newsadd_dialog').attr({'title': '添加考试'});
            d.find('p').append($(
                "<div class='popbox_item tl' >" +
                "<div class=\"popbox_item tl\"><label>科目：</label>" +
                "<span><input type='radio' checked name='subject' value='语文' />语文</span>" +
                "<span><input type='radio' name='subject' value='数学' />数学</span>" +
                "<span><input type='radio' name='subject' value='英语' />英语</span>" +
                "<span><input type='radio' name='subject' value='地理' />地理</span>" +
                "</div>" +
                "<div class=\"popbox_item tl\"><label>成绩：</label>" +
                "<input type='text' name='mark' /></div> " +
                "</div>"));

            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.newsadd_dialog').parent().addClass('dialogs_box newsadd_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //推送信息
        '_news_push': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('newspush_dialog').attr({'title': '推送信息'});
            d.find('p').append($(
                "<div class='popbox_item tl' >" +
                "<div class='search_wrap pr'>" +
                "<div class='input_wrap pa'>" +
                "<input type='text' id='critera' placeholder='请输入课程名称和订单号'>" +
                "</div>" +
                "<button type='btn' class='pa' name='search'><i></i></button>" +
                "</div>" +
                "<h4>咨询师列表</h4>" +
                "<ul><li>张梅梅</li><li>张梅梅</li><li>张梅梅</li><li>张梅梅</li><li>张梅梅</li>" +
                "<li>张梅梅</li><li>张梅梅</li><li>张梅梅</li><li>张梅梅</li><li>张梅梅</li>" +
                "<li>张梅梅</li><li>张梅梅</li><li>张梅梅</li><li>张梅梅</li><li>张梅梅</li></ul>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.newspush_dialog').parent().addClass('dialogs_box newspush_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //旁听支付一种方式
        '_audit_payone': function (trueFn, falseFn) {

            var d = this._init();
            d.addClass('auditpayo_dialog').attr({'title': '旁听'});
            d.find('p').append($(
                "<div class='popbox_item tl' >" +
                "<div class=\"popbox_item tl\"><label>请选择支付方式：</label>" +
                "<input type='radio' id='payone' name='pay' value='余额支付' checked='checked' /><label>余额支付</label></div>" +
                "<div class=\"popbox_item tl pay_check \"><label>请输入您的支付密码：</label>" +
                "<input type='password' id='pwd' maxlength='6'/><span id='reason' class='hide red'></span></div> " +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {

                        var $this = $(this);
                        if ($("#payone").is(":checked")) {
                            if ($("#pwd").val().length < 6) {
                                $("#reason").text('密码错误').show();
                                return;
                            }
                            if (!isNumber($("#pwd").val())) {
                                $("#reason").text('密码错误').show();
                                return;
                            }
                            if (trueFn)trueFn();
                            $this.remove();

                        }

                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.auditpayo_dialog').parent().addClass('dialogs_box auditpayo_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $("#pwd").focus(function () {
                $("#reason").hide();
            });

        },
        //旁听支付二中方式
        '_audit_paytwo': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('auditpayt_dialog').attr({'title': '旁听'});
            d.find('p').append($(
                "<div class='popbox_item tl' >" +
                "<div class=\"popbox_item tl\"><label>请选择支付方式：</label>" +
                "<input type='radio' id='payone' name='pay' /><label>余额支付</label>" +
                "<input type='radio' id='paytwo' name='pay' checked='checked' /><label>旁听卡</label></div>" +
                "<div class=\"popbox_item tl pay_password hide \"><label>请输入您的支付密码：</label>" +
                "<input type='password' id='pwd' maxlength='6'/><span id='reason' class='hide red'></span></div> " +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if ($("#payone").is(":checked")) {
                            if ($("#pwd").val().length < 6) {
                                $("#reason").text('密码错误').show();
                                return;
                            }
                            if (!isNumber($("#pwd").val())) {
                                $("#reason").text('密码错误').show();
                                return;
                            }
                        }
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.auditpayt_dialog').parent().addClass('dialogs_box auditpayt_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
            $('#payone').click(function () {
                $('.pay_password').show();
            });
            $('#paytwo').click(function () {
                $('.pay_password').hide();

            });
            $("#pwd").focus(function () {
                $("#reason").hide();
            });

        },
        //旁听卡未激活
        '_audit_card_Inactive': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('auditcard_dialog').attr({'title': '消息提示'});
            d.find('p').append($(
                "<div class='popbox_item tc' >您的旁听卡未激活，请充值！" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 500,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "去购买", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.auditcard_dialog').parent().addClass('dialogs_box auditcard_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //余额不足
        '_audit_no_money': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('auditcard_dialog').attr({'title': '余额不足'});
            d.find('p').append($(
                "<div class='popbox_item tc' >您的账户余额已不足，无法抢旁听课程，请尽快充值！" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 500,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "去充值", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.auditcard_dialog').parent().addClass('dialogs_box auditcard_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },

        //支付余额不足
        '_insufficientPayment': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('_insufficientPayment').attr({'title': '支付'});
            d.find('p').append($(
                "<div class='popbox_item tc' >您的账户余额已不足，请及时充值！" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 500,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "去充值", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('._insufficientPayment').parent().addClass('dialogs_box _insufficientPayment');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //换教师记录【同意、不同意】
        '_change_teacher_agree': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('cta_dialog').attr({'title': '提示'});
            d.find('p').append($(
                "<div class=\"popbox_item tr fl\">" +
                "<img src='../front/sanhai/images/careful.png'></div>" +
                "<div class=\"popbox_item tl fl\">" +
                "<p style='padding-top: 20px'>点击“确定”同意申请，点击“取消”放弃操作！</p>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.cta_dialog').parent().addClass('dialogs_box cta_dialog_box');
            $('.ui-dialog-buttonset button').parent().parent().css('clear', 'both');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //班海迁移【填写昵称】
        '_BHTransfer': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('cta_dialog').attr({'title': '提示'});
            d.find('p').append($(
                "<div id='BHTransfer'>" +
                "<div><p>为了让您的信息更加真实可用，我们将会把您在班海的姓名、所在地、就读学校、年级迁移到课海中。快来先给自己取一个有趣的昵称吧！</p></div>" +
                "<div class='form_list'>" +
                "<div class='row'>" +
                "<div class='formL'>" +
                "<label>" +
                "昵称" +
                "</label>" +
                "</div>" +
                "<div class='formR'>" +
                "<input type='text' class='w150' id='nickname' placeholder='班海学生' style='color: #cccdcc'>" +
                "<span id='errorName' class='hide red'></span>" +
                "</div></div>" +
                "</div>" +
                "<p class='userAgreement'>授权后表明您已接受《课海用户协议》</p>" +
                "</div>"));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    var nickName = $('#nickname').val() == '' ? '班海学生' : $('#nickname').val();
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        url: "/use/updateNickName.do",
                        data: {
                            nickName: nickName
                        },
                        success: function (data) {

                        },
                        error: function (data) {
                        }
                    });
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {

                        /*if($('#nickname').val()==''){

                         $('#errorName').text('昵称不能为空')
                         .removeClass('hide')
                         //if (trueFn)trueFn();
                         $('#nickname').focus(function(){
                         $('#errorName').addClass('hide')
                         })
                         return;
                         }

                         if($('#nickname').val().length>10){
                         $('#errorName').text('昵称最大长度为10个字符')
                         .removeClass('hide')
                         $('#nickname').focus(function(){
                         $(this).val('');
                         $('#errorName').addClass('hide')
                         })
                         return;
                         }*/

                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.cta_dialog').parent().addClass('dialogs_box cta_dialog_box');
            $('.ui-dialog-buttonset button').parent().parent().css('clear', 'both');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        /*排新课里面的预览弹窗*/
        _ptCoursePreview: function () {
            var d = function () {
                return $('<div class=\"popBox determineBox\" style=\"padding: 0px 0px 0px 30px;\" title=\"预览\" id=\"determineBox\">' +
                    '<div class=\"popCont form_list\"  style=\"max-height: 600px;overflow: auto;\"></div></div>'
                ).appendTo('body')
            }();
            //d.addClass('cta_dialog').attr({'title': '预览'});
            d.find("div.popCont").append($(
                <!-- 预览弹窗-->
                //"<div class=\"popCont form_list\"  style=\"max-height: 600px;overflow: auto\">"+
                "<div class=\" main oneToneBox\">" +
                "<div class=\"introduce\">" +
                "<div class=\"fl\">" +
                "<h2 title=\"\" class=\"courseTitle\" ><span id=\"courseTitle\"></span>" +
                "<div class=\"ico\"><i class=\"Teachers\"></i>" +
                "</div>" +
                "</h2>" +
                "<div class=\"classes_sel fl\">" +
                "<img id=\"fileImg\" class=\"fl\" width=\"350\" height=\"220\">" +
                "</div>" +
                "<div class=\"fl center\">" +
                "<table id=\"content\" class=\"noBorder\">" +
                "<colgroup>" +
                "<col width=\"130px\">" +
                "<col width=\"450px\">" +
                "</colgroup>" +
                "<tbody>" +
                "<tr>" +
                "<td class=\"tr\">年级：</td>" +
                "<td class=\"tl\" id=\"grade\"></td>" +
                "</tr>" +
                "<tr>" +
                "<td class=\"tr\">科目：</td>" +
                "<td class=\"tl\" id=\"subject\"></td>" +
                "</tr>" +
                "<tr>" +
                "<td class=\"tr\">上课时间：</td>" +
                "<td class=\"tl\" id=\"classStartTime\">" +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td class=\"tr\">旁听价格：</td>" +
                "<td class=\"tl\"><a href=\"javascript:;\" id=\"ptPrice\"></a>" +
                "</td> " +
                "</tr>" +
                " </tbody>" +
                "</table>" +
                "</div>" +
                " <div class=\"clearfix\" style=\"height: 76px;\">" +
                "<a class=\"btn buy fl ac\">购买旁听</a> </div> </div> </div> </div> <div class=\"frame_l_l main_l\">" +
                "<div class=\"tab detail\">" +
                "<ul class=\"ul_nav tabList\">" +
                "<li><a href=\"javascript:;\" class=\"ac\">知识点</a></li>" +
                "<li><a href=\"javascript:;\">题目讲解</a></li>" +
                "<li><a href=\"javascript:;\">课件展示</a></li>" +
                "<li><a href=\"javascript:;\">课程介绍</a></li>" +
                "<li><a href=\"javascript:;\">系列课程安排</a></li>" +
                "</ul>" +
                "<div class=\"tabCont noBorder\">" +
                "<div class=\"tabItem\"> " +
                "<ul class=\"ul_main\"> " +
                "<li class=\"pr\">" +
                "<i class=\"pa\"></i>" +
                "<h2 id=\"preIDs\"></h2>" +
                "</li>" +
                "<li class=\"pr\">" +
                "<i class=\"pa\"></i> " +
                "<h2 id=\"1_2\">题目讲解</h2>" +
                "<div id=\"topics\"> </div> " +
                "</li> " +
                "<li class=\"pr\"> <i class=\"pa\">" +
                "</i>" +
                "<h2 id=\"1_3\">课件展示</h2>" +
                "<table class=\"comTable\">" +
                "<colgroup>" +
                "<col width=\"680px\">" +
                "<col width=\"190px\">" +
                "</colgroup>" +
                "<tbody>" +
                "<tr>" +
                "<td>" +
                "<div>" +
                "<img id='ware' alt=\"图片\"/>" +
                "<strong class=\"font18\" id='wareText'>课件</strong>" +
                "</div>" +
                "</td>" +
                "<td>" +
                "<div class=\"tr\">" +
                " <em class=\"loadFile\"></em>" +
                "<strong class=\"blue\">下载</strong>" +
                "</div>" +
                "</td>" +
                "</tr>" +
                "</tbody>" +
                "</table>" +
                "</li>" +
                "<li class=\"pr\">" +
                "<i class=\"pa\"></i>" +
                "<h2 id>课程介绍</h2>" +
                "<div id=\"editor\"></div>" +
                "</li>" +
                "<li class=\"pr noBorder\">" +
                "<i class=\"pa\"></i>" +
                "<h2 id=\"1_5\">系列课程安排</h2>" +
                "<table class=\"comTable\">" +
                "<colgroup>" +
                "<col width=\"290px\">" +
                "<col width=\320px\">" +
                "<col width=\"280px\">" +
                "</colgroup>" +
                "<thead>" +
                "<tr>" +
                "<th>" +
                "<div class=\"gray_333 tc\">节次主题</div>" +
                "</th>" +
                "<th>" +
                "<div class=\"gray_333 tc\">上课时间</div>" +
                "</th>" +
                "<th>" +
                "<div class=\"gray_333 tc\">知识点</div>" +
                "</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody id=\"planClass\">" +
                "<tr>" +
                "</tr>" +
                "</tbody>" +
                "</table>" +
                "</li>" +
                "</ul>" +
                "</div>" +
                "</div>" +
                "</div>"
            ));
            d.dialog({
                autoOpen: true,
                width: 850,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                }
            });
        },

        //兑换主听券弹窗
        '_subjectNumExChange': function (txt, tit, trueFn, falseFn) {
            var d = $('<div class="popBox show pushNotice">' +
                '<div class="popCont sure_del">' +
                '<div class="popbox_item">' +
                '<p><span style=" display:inline-block;width:40px; height:40px; background:url(../images/ico.png) no-repeat -320px -1000px; vertical-align:middle;"></span> 恭喜！您本次可兑换<span class="orange"><span class="exchange_num">2</span>张主听券</span>。</p>' +
                '</div>' +
                '</div>' +
                '</div>').appendTo('body');
            d.addClass('confirm_dialog').attr({'title': tit});
            d.find('p .exchange_num').text(txt);
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.confirm_dialog').parent().addClass('dialogs_box confirm_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //兑换主听券弹窗结束
        //匹配老师弹窗初始化只有在匹配老师时使用
        '_initBaseDialog': function (callback) {
            $(".popBox").dialog({
                autoOpen: false,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    callback && callback();
                    $(this).dialog("close");
                    $(this).find("button").unbind("click");
                }
            });
        },
        '_problem_remove': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('pr_dialog').attr({'title': '删除'});
            d.find('p').append($(
                '<div class="tc"><i class="fail"></i>你确定要删除吗？删除后不可恢复哦！</div>'
            ));
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "确定", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.pr_dialog').parent().addClass('dialogs_box pr_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //购买旁听席位
        '_buy_ptcourse': function (trueFn, falseFn) {
            var d = this._init();
            d.addClass('ptcourse_dialog').attr({'title': '购买旁听席位'});
            d.find('p').text('抱歉，您的旁听席位已不足，是否立即去购买？');
            d.dialog({
                autoOpen: true,
                width: 600,
                modal: true,
                resizable: false,
                close: function () {
                    if (falseFn)falseFn();
                    $(this).remove();
                },
                buttons: [
                    {
                        text: "立即购买", click: function () {
                        if (trueFn)trueFn();
                        $(this).remove()
                    }
                    },
                    {
                        text: "取消", click: function () {
                        if (falseFn)falseFn();
                        $(this).remove()
                    }
                    }
                ]
            });
            $('.ptcourse_dialog').parent().addClass('dialogs_box ptcourse_dialog_box');
            $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');
        },
        //题目预览
        '_topic_preview': function () {
            var d = $('<div class="popBox previewBox hide" title="题目预览" id="previewBox">' +
                '<div class="popCont form_list">' +
                '<div class="content tl"></div>' +
                '</div>' +
                '</div>').appendTo('body');
            d.dialog({
                autoOpen: true,
                width: 850,
                modal: true,
                resizable: false,
                close: function () {
                    $(this).remove();
                }
            });

        }


    }

});




