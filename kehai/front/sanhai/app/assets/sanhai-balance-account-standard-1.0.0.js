/**
 * Created by 蒋淼 on 2015/8/12.
 * 依赖 sanhai-validata-cid-standard-1.0.0.js 验证证件号码
 * 依赖 jquery.md5.js MD5加密
 */
//define(["jquery","common","money","base_dialog_standard","dialogs","sendCode","sanhai-stu-fund-log-1.0.0","lib/jquery_validate/jquery.validate.min","validata-cid", "jquery_md5"],
define(["jquery", "common", "money", "dialogs", "sendCode", "sanhai-stu-fund-log-1.0.0", "lib/jquery_validate/jquery.validate", "validata-cid", "jquery_md5"],
    function ($, common, money, dialogs, sendCode, fund) {

        var bankNameJSON = "{\"bankNames\":[{\"key\":\"中国工商银行\",\"val\":\"中国工商银行\"},{\"key\":\"中国农业银行\",\"val\":\"中国农业银行\"},{\"key\":\"中国银行\",\"val\":\"中国银行\"},{\"key\":\"中国建设银行\",\"val\":\"中国建设银行\"},{\"key\":\"交通银行\",\"val\":\"交通银行\"},{\"key\":\"中信实业银行\",\"val\":\"中信实业银行\"},{\"key\":\"中国光大银行\",\"val\":\"中国光大银行\"},{\"key\":\"华夏银行\",\"val\":\"华夏银行\"},{\"key\":\"中国民生银行\",\"val\":\"中国民生银行\"},{\"key\":\"招商银行\",\"val\":\"招商银行\"},{\"key\":\"福建兴业银行\",\"val\":\"福建兴业银行\"},{\"key\":\"广东发展银行\",\"val\":\"广东发展银行\"},{\"key\":\"深圳发展银行\",\"val\":\"深圳发展银行\"},{\"key\":\"上海浦东发展银行\",\"val\":\"上海浦东发展银行\"}]}";

        /**
         * 加载银行卡信息
         * @param targetDiv
         */
        function loadBankName(targetDiv) {
            var bankObject = jQuery.parseJSON(bankNameJSON);

            $.each(bankObject.bankNames, function (index, value) {
                var key = value.key;
                var val = value.val;
                var opt = "<option value='" + key + "'>" + val + "</option>";
                targetDiv.append(opt);
            });

            // 绑定事件
            targetDiv.change(function () {
                $(this).parent().find("em").html($(this).find("option:selected").text());
            });
        }

        /**
         * 账户中心 判断 是否绑定银行卡
         * @param bindDiv       绑定银行卡DIV
         * @param unBindDiv     解绑银行卡DIV
         */
        function isBankCard(phone) {
            $.ajax({
                url: "/business/findBindBankCardContent.do",
                type: "post",
                dataType: "json",
                success: function (response) {
                    if ("000" == response.resCode) {
                        var isBind = response.data.bankCard;
                        if ("bind" == isBind) {
                            $("#cardContent").empty();

                            var bindDiv = "<h5>尚未绑定银行卡</h5><div id='bind' class='add_card'><a><i></i><span>绑定银行卡</span></a></div>";
                            $("#cardContent").append(bindDiv);

                            $("#bind").find("a").on("click", function () {
                                location.href = "/businessPath/bindCardPage.htm";
                            });
                        } else {
                            $("#cardContent").empty();

                            var unbindDiv = "<h5>当前绑定银行卡</h5><div id='unbind' class='cancel_card'><span><em>" + isBind.cardNumber + "</em></span><button type='button' class='c_btn_size1 c_bg_color5 pushbtnJs' style='margin-left:80px'>解除绑定</button></div>";
                            $("#cardContent").append(unbindDiv);

                            $("#unbind").find("button").on("click", function () {
                                // 初始化对话框
                                dialogs._unbundling(null, null);

                                // 设置对话框发送验证码事件
                                $("#getCode").on("click", function () {
                                    sendCode.sendCheckCode(phone, $("#getCode"), "/business/sendCheckCode.do");
                                });

                                // 设置关闭按钮
                                $("#cancelBtn").on("click", function () {
                                    $(".unbundling_dialog").remove();
                                });

                                $("#unbindBtn").on("click", function () {
                                    $.ajax({
                                        url: "/business/unbindBankCard.do",
                                        type: "post",
                                        data: {
                                            checkCode: $("#code").val()
                                        },
                                        success: function (response) {
                                            if ("000" == response.resCode) {
                                                $(".unbundling_dialog").remove();
                                                isBankCard(null);
                                            } else {
                                                $("#code").val("");
                                                dialogs._timer(response.resMsg, 2, 2, null);
                                            }
                                        },
                                        error: function () {
                                            dialogs._timer(response.resMsg, 2, 2, null);
                                        }
                                    });
                                });

                            });
                        }
                    }
                },
                error: function () {
                    dialogs._timer("请求失败稍后再试", 2, 2, null);
                }
            });
        }

        /**
         * 绑定银行卡
         */
        function submitBindCard(phone) {

            jQuery.validator.addMethod("isIdCardNo", function (value, element) {
                return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
            }, "<i></i>请输入有效身份证号<b></b>");

            $("#bindCardForm").validate({
                rules: {
                    userName: {
                        required: true
                    },
                    IDCard: {
                        required: true,
                        isIdCardNo: true
                    },
                    bankName: {
                        required: true,
                        remote: {
                            url: "/business/validateBankName.do",
                            type: "post",
                            data: {
                                bankName: function () {
                                    return $("#bankName").val();
                                }
                            }
                        }
                    },
                    cardNumber: {
                        required: true,
                        creditcard: true
                    },
                    prov: {
                        min: 1
                    },
                    //phoneNumber: {
                    //    required: true
                    //},
                    code: {
                        required: true,
                        remote: {
                            url: "/business/validateCheckCode.do",
                            type: "post",
                            data: {
                                phoneNumber: function () {
                                    //return $("#phoneNumber").val();
                                    return phone;
                                },
                                checkCode: function () {
                                    return $("#code").val();
                                }
                            }
                        }
                    }
                },
                messages: {
                    userName: {
                        required: "<i></i>请输入持卡人真实姓名<b></b>"
                    },
                    IDCard: {
                        required: "<i></i>请输入持卡人身份证号<b></b>",
                        isIdCardNo: "<i></i>请输入有效身份证号<b></b>"
                    },
                    bankName: {
                        required: "<i></i>请输入银行详细名称<b></b>",
                        remote: "<i></i>输入银行名称错误<b></b>"
                    },
                    cardNumber: {
                        required: "<i></i>请输入银行卡卡号<b></b>",
                        creditcard: "<i></i>请输入有效的银行卡卡号<b></b>"
                    },
                    prov: {
                        min: "<i></i>请选择所在省<b></b>"
                    },
                    //phoneNumber: {
                    //    required: "<i></i>请输入手机号码<b></b>"
                    //},
                    code: {
                        required: "<i></i>请输入验证码<b></b>",
                        remote: "<i></i>请输入有效验证码<b></b>"
                    }
                },
                errorElement: "em",
                errorPlacement: function (error, element) { //指定错误信息位置
                    error.appendTo(element.parents(".error_show").find(".error_message"));
                }
            });

            if ($('#bindCardForm').valid()) {
                var userName = $("#userName").val();
                var IDCard = $("#IDCard").val();
                var bankName = $("#bankName").val();
                var cardNumber = $("#cardNumber").val();

                var provId = $("#provEM").attr("code");
                var prov = $("#provEM").text();
                var countryId = $("#countryEM").attr("code");
                var country = $("#countryEM").text();
                var cityId = $("#cityEM").attr("code");
                var city = $("#cityEM").text();

                if ("null" == countryId && "null" == cityId) {
                    var addressCode = provId;
                    var address = prov;
                } else if ("null" != countryId && "null" == cityId) {
                    var addressCode = provId + "," + countryId;
                    var address = prov + "," + country;
                } else if ("null" != countryId && "null" != cityId) {
                    var addressCode = provId + "," + countryId + "," + cityId;
                    var address = prov + "," + country + "," + city;
                }

                //var phoneNumber = $("#phoneNumber").val();
                var code = $("#code").val();

                $.ajax({
                    url: "/business/bindBankCard.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        userName: userName,
                        IDCard: IDCard,
                        bankName: bankName,
                        cardNumber: cardNumber,
                        address: address,
                        addressCode: addressCode,
                        phoneNumber: phone // 这个对象在controller中重新从session中赋值，传递是因为controller接受的是ICardDomain对象，需要提供这个属性
                    },
                    beforeSend: function () {
                        $("button[name='bindCard']").attr("disabled", true);
                    },
                    complete: function () {
                        $("button[name='bindCard']").attr("disabled", false);
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            dialogs._timer(response.resMsg, 1, 2, function () {
                                location.href = "/businessPath/accountCenter.htm";
                            });
                        } else {
                            dialogs._timer(response.resMsg, 2, 2, null);
                        }
                    },
                    error: function () {
                        dialogs._timer("请求失败稍后再试", 2, 2, null);
                    }
                })
            }
        }

        /**
         * 加载银行卡信息
         * @param nameDiv   用户名渲染DIV
         * @param idDiv     身份证渲染DIV
         * @param bankDiv   银行渲染DIV
         * @param cardDiv   银行卡渲染DIV
         * @TODO 这个方法是因为之前有页面显示绑定银行卡信息，现在没有独立的页面显示银行卡信息
         */
        function loadBindCard(nameDiv, idDiv, bankDiv, cardDiv, areaDiv) {
            $.ajax({
                url: "/business/findBindBankCardContent.do",
                type: "post",
                dataType: "json",
                success: function (response) {
                    nameDiv.text(response.data.bankCard.userName);
                    idDiv.text(response.data.bankCard.IDCard);
                    bankDiv.text(response.data.bankCard.bankName);
                    cardDiv.text(response.data.bankCard.cardNumber);
                    areaDiv.text(response.data.bankCard.address);
                },
                error: function () {

                }
            })
        }

        /* ---------------------------------------------------[银行卡操作]---------------------------------------------------*/

        /**
         * 机构是否设置台时费充值密码
         */
        function isSetBalancePassword() {
            $.ajax({
                url: "/business/isSetBalancePassword.do",
                type: "post",
                dataType: "json",
                success: function (response) {
                    if ("000" == response.resCode) {
                        if ("set" == response.resMsg)    location.href = "/businessPath/setBalanceChargePassword.htm";
                        if ("charge" == response.resMsg) location.href = "/businessPath/balanceCharge.htm";
                    }
                },
                error: function () {
                    dialogs._timer("请求失败稍后再试", 2, 2, null);
                }
            });
        }

        /**
         * 获得余额账户总金额
         * @param targetDiv
         */
        function loadBalanceAccountTotalMoney(targetDiv) {
            $.ajax({
                url: "/business/balanceAccountMoney.do",
                type: "post",
                dataType: "json",
                data: {
                    scope: "total"
                },
                success: function (response) {
                    if ("000" == response.resCode) {
                        var balance = money.fmoney(Number(response.resMsg) / 100, 2);
                        targetDiv.text(balance);
                    } else {
                        dialogs._timer(response.resMsg, 2, 2, null);
                    }
                },
                error: function () {
                    dialogs._timer("请求失败稍后再试", 2, 2, null);
                }
            });
        }

        /**
         * 获得余额账户可提现金额
         * @param trageDiv
         */
        function loadBalanceWithdrawalsMoney(targetDiv) {
            $.ajax({
                url: "/business/balanceAccountMoney.do",
                type: "post",
                dataType: "json",
                data: {
                    scope: "withdrawals"
                },
                success: function (response) {
                    if ("000" == response.resCode) {
                        var balance = money.fmoney(Number(response.resMsg) / 100, 2);
                        targetDiv.text(balance);
                    } else {
                        dialogs._timer(response.resMsg, 2, 2, null);
                    }
                },
                error: function () {
                    dialogs._timer("请求失败稍后再试", 2, 2, null);
                }
            });
        }

        /**
         * 获得余额账户冻结金额
         * @param targetDiv
         */
        function loadBalanceFreezeMoney(targetDiv) {
            $.ajax({
                url: "/business/balanceAccountMoney.do",
                type: "post",
                dataType: "json",
                data: {
                    scope: "freeze"
                },
                success: function (response) {
                    if ("000" == response.resCode) {
                        var balance = money.fmoney(Number(response.resMsg) / 100, 2);
                        targetDiv.text(balance);
                    } else {
                        dialogs._timer(response.resMsg, 2, 2, null);
                    }
                },
                error: function () {
                    dialogs._timer("请求失败稍后再试", 2, 2, null);
                }
            });
        }

        /**
         * 余额账户设置支付密码
         */
        function submitPayPassword(phone) {
            $("#setPayPassword").validate({
                rules: {
                    payPassword: {
                        required: true,
                        rangelength: [6, 12]
                    },
                    cpayPassword: {
                        required: true,
                        rangelength: [6, 12],
                        equalTo: "#payPassword"
                    },
                    //phoneNumber: {
                    //    required: true
                    //},
                    code: {
                        required: true,
                        remote: {
                            url: "/business/validateCheckCode.do",
                            type: "post",
                            data: {
                                phoneNumber: function () {
                                    //return $("#phoneNumber").val();
                                    return phone;
                                },
                                checkCode: function () {
                                    return $("#code").val();
                                }
                            }
                        }
                    }
                },
                messages: {
                    payPassword: {
                        required: "<i></i>请输入支付密码<b></b>",
                        rangelength: "<i></i>密码长度6~12位<b></b>"
                    },
                    cpayPassword: {
                        required: "<i></i>请输入确认支付密码<b></b>",
                        rangelength: "<i></i>密码长度6~12位<b></b>",
                        equalTo: "<i></i>支付密码与确认密码不一致<b></b>"
                    },
                    //phoneNumber: {
                    //    required: "<i></i>请输入手机号码<b></b>"
                    //},
                    code: {
                        required: "<i></i>请输入手机验证码<b></b>",
                        remote: "<i></i>请输入有效验证码<b></b>"
                    }
                },
                errorElement: "em",
                errorPlacement: function (error, element) { //指定错误信息位置
                    error.appendTo(element.parents(".error_show").find(".error_message"));
                }
            });

            if ($('#setPayPassword').valid()) {
                var payPassword = $("#cpayPassword").val();
                //var phone = $("#phoneNumber").val();
                var checkCode = $("#code").val();

                var _payPassword = $.md5(payPassword).toUpperCase();

                $.ajax({
                    url: "/business/setBalanceAccountPayPassword.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        //phone: phone,
                        checkCode: checkCode,
                        payPassword: _payPassword
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            dialogs._timer(response.resMsg, 1, 2, function () {
                                location.href = "/businessPath/balanceCharge.htm";
                            });
                        } else {
                            dialogs._timer(response.resMsg, 2, 2, null);
                        }
                    },
                    error: function (response) {
                        dialogs._timer("请求失败稍后再试", 2, 2, null);
                    }
                });
            }
        };

        /**
         * 查询当前机构台时费
         */
        function loadPlatformAccountMoney(targetDiv) {
            $.ajax({
                url: "/business/platformAccountMoney.do",
                type: "post",
                dataType: "json",
                success: function (response) {
                    if ("000" == response.resCode) {
                        var balance = money.fmoney(Number(response.resMsg) / 100, 2);
                        targetDiv.text(balance);
                    } else {
                        dialogs._timer(response.resMsg, 2, 2, null);
                    }
                },
                error: function () {
                    dialogs._timer("请求失败稍后再试", 2, 2, null);
                }
            });
        }

        /**
         * 机构是否设置台时费充值密码
         */
        function isSetPlatformFeePassword() {
            $.ajax({
                url: "/business/isSetPlatformFeePassword.do",
                type: "post",
                dataType: "json",
                success: function (response) {
                    if ("000" == response.resCode) {
                        if ("set" == response.resMsg)    location.href = "/businessPath/setPlatformFeeChargePassword.htm";
                        if ("charge" == response.resMsg) location.href = "/businessPath/platformFeeCharge.htm";
                    }
                },
                error: function () {
                    dialogs._timer("请求失败稍后再试", 2, 2, null);
                }
            });
        }

        /**
         * 机构设置充值密码
         */
        function submitChargePassword() {
            $("#setchargePassword").validate({
                rules: {
                    chargePassword: {
                        required: true,
                        rangelength: [6, 12]
                    },
                    cchargePassword: {
                        required: true,
                        rangelength: [6, 12],
                        equalTo: "#chargePassword"
                    },
                    phoneNumber: {
                        required: true
                    },
                    code: {
                        required: true,
                        remote: {
                            url: "/business/validateCheckCode.do",
                            type: "post",
                            data: {
                                phoneNumber: function () {
                                    return $("#phoneNumber").val();
                                },
                                checkCode: function () {
                                    return $("#code").val();
                                }
                            }
                        }
                    }
                },
                messages: {
                    chargePassword: {
                        required: "<i></i>请输入充值密码<b></b>",
                        rangelength: "<i></i>密码长度6~12位<b></b>"
                    },
                    cchargePassword: {
                        required: "<i></i>请输入确认充值密码<b></b>",
                        rangelength: "<i></i>密码长度6~12位<b></b>",
                        equalTo: "<i></i>充值密码与确认密码不一致<b></b>"
                    },
                    phoneNumber: {
                        required: "<i></i>请输入手机号码<b></b>"
                    },
                    code: {
                        required: "<i></i>请输入手机验证码<b></b>",
                        remote: "<i></i>请输入有效验证码<b></b>"
                    }
                },
                errorElement: "em",
                errorPlacement: function (error, element) { //指定错误信息位置
                    error.appendTo(element.parents(".error_show").find(".error_message"));
                }
            });

            if ($('#setchargePassword').valid()) {
                var chargePassword = $("#cchargePassword").val();
                var phone = $("#phoneNumber").val();
                var checkCode = $("#code").val();

                var _chargePassword = $.md5(chargePassword).toUpperCase();

                $.ajax({
                    url: "/business/setPlatformAccountChargePassword.do",
                    type: "post",
                    dataTyep: "json",
                    data: {
                        phone: phone,
                        checkCode: checkCode,
                        chargePassword: _chargePassword
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            dialogs._timer(response.resMsg, 1, 2, function () {
                                location.href = "/businessPath/platformFeeCharge.htm";
                            });
                        } else {
                            dialogs._timer(response.resMsg, 2, 2, null);
                        }
                    },
                    error: function (response) {
                        dialogs._timer("请求失败稍后再试", 2, 2, null);
                    }
                });

            }
        }

        /**
         * 禁用提交按钮防止重复提交
         * @param target    表单提交按钮
         * @returns
         * @注意
         * @1、这个方法只能在没有jquery.validate.js的情况下使用。
         * @2、在有jquery.validate.js的情况下，提交一次后就禁用了按钮，如果表单校验失败无法下次提交
         */
        function doSafeSubmit(target) {
            target.attr({"disabled": "disabled"});
            return true;
        }

        // 余额充值操作
        function balanceChargeOperation() {
            $("#balanceCharge").validate({
                rules: {
                    chargeMoney: {
                        required: true,
                        digits: true,
                        range: [1, 50000]
                    },
                    chargeWay: {
                        required: true
                    }
                },
                messages: {
                    chargeMoney: {
                        required: "<i></i>输入充值金额<b></b>",
                        digits: "<i></i>金额必须是正整数<b></b>",
                        range: "<i></i>非法金额范围（1~50000）<b></b>"
                    },
                    chargeWay: {
                        required: "<i></i>请选择充值方式<b></b>"
                    }
                },
                errorElement: "em",
                errorPlacement: function (error, element) { //指定错误信息位置
                    error.appendTo(element.parents(".error_show").find(".error_message"));
                },
                submitHandler: function (form) {
                    // 禁用提交按钮
                    $(form).find(":submit").attr({"disabled": "disabled"});

                    // 等待对话框
                    //baseWaitDialog("努力处理中请稍后 ......");

                    if (2 == $("input[type='radio']:checked").val()) alert("暂时不支持此方式充值");
                    if (1 == $("input[type='radio']:checked").val()) form.action = "/alipayweb/alipayWebChargeSubmit.do";
                    if (0 == $("input[type='radio']:checked").val()) form.action = "/cash/balanceAccountCharge.do";

                    form.submit();
                }
            });
        }

        // 台时费充值操作
        function platformChargeOperation() {

            $("#platformCharge").validate({
                rules: {
                    chargeMoney: {
                        required: true,
                        digits: true,
                        range: [1, 50000]
                    },
                    chargeWay: {
                        required: true
                    }
                },
                messages: {
                    chargeMoney: {
                        required: "<i></i>输入充值金额<b></b>",
                        digits: "<i></i>金额必须是正整数<b></b>",
                        range: "<i></i>非法金额范围（1~50000）<b></b>"
                    },
                    chargeWay: {
                        required: "<i></i>请选择充值方式<b></b>"
                    }
                },
                errorElement: "em",
                errorPlacement: function (error, element) { //指定错误信息位置
                    error.appendTo(element.parents(".error_show").find(".error_message"));
                },
                submitHandler: function (form) {

                    // 禁用提交按钮
                    $(form).find(":submit").attr({"disabled": "disabled"});

                    // 等待对话框
                    // dialog.baseWaitDialog("努力处理中请稍后 ......");

                    if (2 == $("input[type='radio']:checked").val()) alert("暂时不支持此方式充值");
                    if (1 == $("input[type='radio']:checked").val()) form.action = "/alipay/alipayPlatformSubmit.do";
                    if (0 == $("input[type='radio']:checked").val()) form.action = "/business/platformAccountCharge.do";

                    form.submit();
                }
            });
        }

        /**
         * 余额账户提现申请
         */
        function balanceWithdrawals(btn, money) {
            btn.on("click", function () {
                $.ajax({
                    url: "/withdrawals/balanceWithdrawals.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        money: Number(money) * 100
                    }, beforeSend: function () {
                        btn.attr("disabled", true);
                        //dialog.baseWaitDialog("努力处理中请稍后 ......");
                    },
                    complete: function () {
                        $(".eject_warpper_wait").addClass("hide");
                        btn.attr("disabled", false);
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            dialogs._timer("提现申请成功，请等待系统审核", 1, 2, null);

                            // 刷新提现记录
                            fund.loadUserFundFlowLog(1)
                        } else {
                            dialogs._timer(response.resMsg, 2, 2, null);
                        }
                    },
                    fail: function () {
                        dialogs._timer("请求失败稍后再试", 2, 2, null);
                    }
                });
            });
        }

        return {
            loadBalanceAccountTotalMoney: loadBalanceAccountTotalMoney,
            loadBalanceWithdrawalsMoney: loadBalanceWithdrawalsMoney,
            loadBalanceFreezeMoney: loadBalanceFreezeMoney,
            isBankCard: isBankCard,
            balanceWithdrawals: balanceWithdrawals,
            isSetBalancePassword: isSetBalancePassword,
            isSetPlatformFeePassword: isSetPlatformFeePassword,
            loadPlatformAccountMoney: loadPlatformAccountMoney,
            platformChargeOperation: platformChargeOperation,
            loadBankName: loadBankName,
            submitBindCard: submitBindCard,
            balanceChargeOperation: balanceChargeOperation,
            submitPayPassword: submitPayPassword,
            submitChargePassword: submitChargePassword
        }
    });