define(["jquery", "loadAreaAndMatch", "sendCode", "balance_account"],
    function ($, loadAreaAndMatch, sendCode, balanceAccount) {

        // 菜单高亮
        $("#accountCenter").attr("class", "cur");

        // 加载银行卡
        balanceAccount.loadBankName($("#banksName"));

        $("#userName").placeholder({value: "请输入持卡人真实姓名"});
        $("#IDCard").placeholder({value: "请输入持卡人身份证编号"});
        $("#cardNumber").placeholder({value: "请输入银行卡卡号"});
        $("#phoneNumber").placeholder({value: "请输入手机号码"});
        $("#bankName").placeholder({value: "请输入银行详细名称"});

        loadAreaAndMatch.loadAreaAndMatch($("#prov"), $("#country"), $("#city"), null, null);

        $("#getCode").on("click", function () {
            //sendCode.sendCheckCode($("#phoneNumber").val(), $("#getCode"), "/business/sendCheckCode.do");
            sendCode.sendCheckCode(sessionPhone, $("#getCode"), "/business/sendCheckCode.do");
        });

        $("button[name='bindCard']").on("click", function () {
            balanceAccount.submitBindCard(sessionPhone);
        });
    });