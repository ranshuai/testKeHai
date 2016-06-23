/**
 * Created by mahuihuang on 15/11/28.
 */
define("response", ["jquery"],  function ($) {
    /**
     * 校验返回参数
     * @param jsonStr 返回的json字符串
     */
    var checkResponse = function (jsonStr) {
        if (jsonStr == null || jsonStr == "") {
            return false;
        }
        var json;
        if (typeof (jsonStr) == 'string') {
            json = $.parseJSON(jsonStr);
        } else {
            json = jsonStr;
        }
        if ($.isEmptyObject(json)) {
            return false;
        }
        if (json.resCode == null || json.resCode == "") {
            //common.onMessage("数据格式错误" + obj.resCode +" " + objStr);
            if(dialogs)dialogs._alert('数据格式错误');
            return false;
        }
        if (json.resCode == "000") {
            return true;
        } else if (json.resCode == '101') {
            if(dialogs)dialogs._wait('已经存在：'+ json.resMsg,3);
            return false;
        } else if (json.resCode == '102') {
            if(dialogs)dialogs._wait('不存在：'+ json.resMsg,3);
            return false;
        } else if (json.resCode == '103') {
            if(dialogs)dialogs._wait('失败：'+ json.resMsg,3);
            return false;
        } else if (json.resCode == '104') {
            if(dialogs)dialogs._alert('参数不能为空：'+json.resMsg);
            return false;
        } else if (json.resCode == '105') {
            if(dialogs)dialogs._alert('参数错误：'+json.resMsg);
            return false;
        } else if (json.resCode == '200') {
            if(dialogs)dialogs._alert('您的登录已经超时，需要重新登录！');
            window.location.href = "/login.htm";
            /*common.alertForward('您的登陆已经超时，需要重新登陆！','login.ui');*/
            return false;
        } else if (json.resCode == '300') {
            if(dialogs)dialogs._wait('没有权限：'+ json.resMsg,3);
            return false;
        } else if (json.resCode == '301') {
            if(dialogs)dialogs._wait('激活失败：'+ json.resMsg,3);
            return false;
        } else if (json.resCode == '500') {
            if(dialogs)dialogs._wait('系统错误：'+ json.resMsg,3);
            return false;
        } else if (json.resCode == '505') {
            if(dialogs)dialogs._wait('未审核课程：'+ json.resMsg,3);
            return false;
        } else if (json.resCode == '506') {
            if(dialogs)dialogs._wait('未审核机构：'+ json.resMsg,3);
            return false;
        } else if (json.resCode == '601') {
            if(dialogs)dialogs._alert('绑定银行卡失败：'+ json.resMsg);
            return false;
        } else if (json.resCode == '704') {
            if(dialogs)dialogs._alert('登录信息不完整：'+ json.resMsg);
            return false;
        }
        return false;
    }
    return {
        checkResponse: checkResponse
    }
});