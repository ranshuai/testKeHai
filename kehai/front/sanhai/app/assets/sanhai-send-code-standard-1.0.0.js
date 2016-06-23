/**
 * Created by 蒋淼 on 2015/8/13.
 */


define(["jquery","common", 'dialogs'],function($,common, dialog){
    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount;//当前剩余秒数


//timer处理函数
    function SetRemainTime(sendBtn) {
        if (curCount == 0) {
            window.clearInterval(InterValObj);//停止计时器
            sendBtn.removeAttr("disabled");//启用按钮
            sendBtn.text("获取验证码");
        }
        else {
            curCount--;
            sendBtn.text(curCount + "秒后重发");
        }
    }

    return {
        sendCheckCode:function(phone, sendBtn, url) {
            if (null != phone && "" != phone) {
                curCount = count;

                //设置button效果，开始计时
                sendBtn.attr("disabled", "true");
                sendBtn.text(curCount + "秒后重发");
                InterValObj = window.setInterval(function () {
                    SetRemainTime(sendBtn);
                }, 1000); //启动计时器，1秒执行一次

                $.ajax({
                    type: "post",
                    url: url,
                    data: {phone: phone},
                    success: function (data) {
                        if (common.checkResponse(data) == false) {
                            window.clearInterval(InterValObj);              //停止计时器
                            sendBtn.removeAttr("disabled");                 //启用按钮
                            sendBtn.text("获取验证码");
                            return;
                        }
                    },
                    error: function (data) {
                        window.clearInterval(InterValObj);                  //停止计时器
                        sendBtn.removeAttr("disabled");                     //启用按钮
                        sendBtn.text("获取验证码");
                    }
                });
            } else {
                dialog._wait("请输入手机号码", 2, null);
            }
        }
    }
});

