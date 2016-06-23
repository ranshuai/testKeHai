import $ from 'jquery';
import _ from 'underscore';
import backbone from 'backbone';

var utils = {
    request: function (params) {
        $.ajax({
            type: params.type || 'get',
            url: params.url,
            data: params.data || {},
            dataType: "json",
            success: params.success,
            error: params.error || function () {
                console.log("页面请求失败");
            },
            beforeSend: params.before || function () {
                console.log("页面请求中...");
            }
        });
    },

    getQueryString: function (name) {
        var params = location.search.substring(1).toLowerCase();
        var paramList = [];
        var param = null;
        var parami;
        if (params.length > 0) {
            if (params.indexOf("&") >= 0) {
                paramList = params.split("&");
            } else {
                paramList[0] = params;
            }
            for (var i = 0, listLength = paramList.length; i < listLength; i++) {
                parami = paramList[i].indexOf(name + "=");
                if (parami >= 0) {
                    param = paramList[i].substr(parami + (name + "=").length);
                }
            }
        }
        return param;
    },

    /*随机数*/
    getRandomNum: function (min, max) {
        var range = max - min;
        var rand = Math.random();
        return (min + Math.round(rand * range));
    },

    checkReponse: function (response,callback) {
        var statusCode = {
          '000': 'success'
        };
        if(callback){
            callback(statusCode[response.resCode]);
        }
    }
}

module.exports = utils;