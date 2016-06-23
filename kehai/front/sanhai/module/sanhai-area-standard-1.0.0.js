/**
 * Created by 蒋淼 on 2015/6/30.
 */

define('loadAreaAndMatch',['jquery'],function($){

var prov = "{\"prov\":[{\"areaId\":\"001\",\"areaName\":\"北京\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"002\",\"areaName\":\"天津\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"003\",\"areaName\":\"河北\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"004\",\"areaName\":\"山西\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"005\",\"areaName\":\"内蒙古\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"006\",\"areaName\":\"辽宁\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"007\",\"areaName\":\"吉林\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"008\",\"areaName\":\"黑龙江\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"009\",\"areaName\":\"上海\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"010\",\"areaName\":\"江苏\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"011\",\"areaName\":\"浙江\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"012\",\"areaName\":\"安徽\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"013\",\"areaName\":\"福建\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"014\",\"areaName\":\"江西\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"015\",\"areaName\":\"山东\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"016\",\"areaName\":\"河南\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"017\",\"areaName\":\"湖北\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"018\",\"areaName\":\"湖南\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"019\",\"areaName\":\"广东\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"020\",\"areaName\":\"广西\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"021\",\"areaName\":\"海南\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"022\",\"areaName\":\"重庆\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"023\",\"areaName\":\"四川\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"024\",\"areaName\":\"贵州\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"025\",\"areaName\":\"云南\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"026\",\"areaName\":\"西藏\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"027\",\"areaName\":\"陕西\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"028\",\"areaName\":\"甘肃\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"029\",\"areaName\":\"青海\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"030\",\"areaName\":\"宁夏\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"031\",\"areaName\":\"新疆\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"032\",\"areaName\":\"台湾\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"033\",\"areaName\":\"香港\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"},{\"areaId\":\"034\",\"areaName\":\"澳门\",\"areaNo\":\"0\",\"areaPId\":\"\",\"buyCount\":\"0\",\"buyName\":\"\",\"levels\":\"0\"}]}";

/**
 * 加载区域信息并绑定事件
 * @param provDiv       省渲染目标DIV
 * @param countryDiv    市渲染目标DIV
 * @param cityDiv       区渲染目标DIV
 * @注意
 * @1 区域信息使用JSON字符串
 */
var loadAreaAndMatch = function (provDiv, countryDiv, cityDiv, addressCode, address) {

    var provCode, countryCode, cityCode = null;

    // 默认禁用 地区和市SELECT
    countryDiv.attr("disabled", true);
    cityDiv.attr("disabled", true);

    //console.log("---------------------------------------------");
    //console.log("addressCode    -> " + addressCode);
    //console.log("address        -> " + address);
    //console.log("---------------------------------------------");

    // 解析已经获得的区域信息
    if ((null != addressCode && null != address) && ("" != addressCode && "" != address)) {
        var _addressCode = addressCode.split(",");
        switch (_addressCode.length) {
            case (1):
                provCode = _addressCode[0];
                break;
            case (2):
                provCode = _addressCode[0];
                countryCode = _addressCode[1];
                break;
            case (3):
                provCode = _addressCode[0];
                countryCode = _addressCode[1];
                cityCode = _addressCode[2];
                break;
        }
    }

    // 仅仅选择省
    if (null != provCode && null == countryCode && null == cityCode) {
        $.post("/areaInfo/country.do", {areaId: provCode}, function (response, status, xhr) {
            countryDiv.append("<option value='-1'>选择区</option>");
            $.each(response.data.country, function (index, value) {
                var opt = "<option value='" + value.areaId + "'>" + value.areaName + "</option>";
                countryDiv.append(opt);
            })
            countryDiv.attr("disabled", false);
        });
    }

    // 仅仅选择省和区
    if (null != provCode && null != countryCode && null == cityCode) {
        countryDiv.attr("disabled", false);
        $.post("/areaInfo/country.do", {areaId: provCode}, function (response, status, xhr) {
            countryDiv.append("<option value='-1'>选择区</option>");
            $.each(response.data.country, function (index, value) {
                var opt = "<option value='" + value.areaId + "'>" + value.areaName + "</option>";
                countryDiv.append(opt);
            })

            // 匹配选中内容
            if (null != countryCode) {
                countryDiv.parent().find("em").attr("code", countryCode);
                countryDiv.find("option[value='" + countryCode + "']").attr("selected", true);
                countryDiv.parent().find("em").html(countryDiv.find("option:selected").text());
            }
        });

        cityDiv.attr("disabled", false);
        $.post("/areaInfo/city.do", {areaPId: countryCode}, function (response, status, xhr) {
            cityDiv.append("<option value='-1'>选择县</option>");

            $.each(response.data.city, function (index, value) {
                var key = value.areaId;
                var val = value.areaName;
                var opt = "<option value='" + key + "'>" + val + "</option>";

                cityDiv.append(opt);
            })

            // 匹配选中内容
            if (null != countryCode) {
                cityDiv.parent().find("em").attr("code", cityCode);
                cityDiv.find("option[value='" + cityCode + "']").attr("selected", true);
                cityDiv.parent().find("em").html(cityDiv.find("option:selected").text());
            }
        });
    }

    // 三项全部选择
    if (null != provCode && null != countryCode && null != cityCode) {
        countryDiv.attr("disabled", false);
        $.post("/areaInfo/country.do", {areaId: provCode}, function (response, status, xhr) {
            countryDiv.append("<option value='-1'>选择区</option>");
            $.each(response.data.country, function (index, value) {
                var opt = "<option value='" + value.areaId + "'>" + value.areaName + "</option>";
                countryDiv.append(opt);
            })

            // 匹配选中内容
            if (null != countryCode) {
                countryDiv.parent().find("em").attr("code", countryCode);
                countryDiv.find("option[value='" + countryCode + "']").attr("selected", true);
                countryDiv.parent().find("em").html(countryDiv.find("option:selected").text());
            }
        });

        cityDiv.attr("disabled", false);
        $.post("/areaInfo/city.do", {areaPId: countryCode}, function (response, status, xhr) {

            cityDiv.append("<option value='-1'>选择县</option>");

            $.each(response.data.city, function (index, value) {
                var key = value.areaId;
                var val = value.areaName;
                var opt = "<option value='" + key + "'>" + val + "</option>";

                cityDiv.append(opt);
            })

            // 匹配选中内容
            if (null != countryCode) {
                cityDiv.parent().find("em").attr("code", cityCode);
                cityDiv.find("option[value='" + cityCode + "']").attr("selected", true);
                cityDiv.parent().find("em").html(cityDiv.find("option:selected").text());
            }
        });
    }

    // 初始化省
    var provObj = jQuery.parseJSON(prov);
    provDiv.append("<option value='-1'>选择省</option>");
    $.each(provObj.prov, function (index, value) {
        var key = value.areaId;
        var val = value.areaName;
        var opt = "<option value='" + key + "'>" + val + "</option>";

        provDiv.append(opt)
    })

    // 设置选中值和状态
    if (null != provCode) {
        provDiv.find("option[value='" + provCode + "']").attr("selected", true);
        provDiv.parent().find("em").html(provDiv.find("option:selected").text());
        provDiv.parent().find("em").attr("code", provCode);
    }

    // 省SELECT事件
    provDiv.change(function () {
        if (-1 == $(this).val()) { // 如果选择省不查询
            countryDiv.attr("disabled", true);
            cityDiv.attr("disabled", true);

            $(this).parent().find("em").html("选择省");
            $(this).parent().find("em").attr("code", "null");

            countryDiv.parent().find("em").html("选择地区");
            countryDiv.parent().find("em").attr("code", "null");

            cityDiv.parent().find("em").html("选择县");
            cityDiv.parent().find("em").attr("code", "null");
        } else {
            //设置自身
            $(this).parent().find("em").html($(this).find("option:selected").text());
            $(this).parent().find("em").attr("code", $(this).val());

            // 启用下一级
            countryDiv.attr("disabled", false);

            // 清除下一级SELECT数据
            countryDiv.html("");
            countryDiv.parent().find("em").html("选择地区");
            countryDiv.parent().find("em").attr("code", "null");
            cityDiv.parent().find("em").html("选择县");
            cityDiv.parent().find("em").attr("code", "null");

            // 请求数据
            $.post("/areaInfo/country.do", {areaId: $(this).val()}, function (response, status, xhr) {
                var result = response.data.country;

                countryDiv.append("<option value='-1'>选择区</option>");

                $.each(result, function (index, value) {
                    var key = value.areaId;
                    var val = value.areaName;
                    var opt = "<option value='" + key + "'>" + val + "</option>";

                    countryDiv.append(opt);
                })
            });
        }
    });

    // 地区SELECT事件
    countryDiv.change(function () {
        if (-1 == $(this).val()) { // 如果选择区不查询
            cityDiv.attr("disabled", true);

            $(this).parent().find("em").html("选择地区");
            $(this).parent().find("em").attr("code", "null");

            cityDiv.parent().find("em").html("选择县");
            cityDiv.parent().find("em").attr("code", "null");
        } else {
            // 设置自身内容
            $(this).parent().find("em").html($(this).find("option:selected").text());
            $(this).parent().find("em").attr("code", $(this).val());

            // 启用下一级
            cityDiv.attr("disabled", false);

            cityDiv.html(""); // 清除下一级SELECT数据
            cityDiv.parent().find("em").html("选择县");
            cityDiv.parent().find("em").attr("code", "null");

            $.post("/areaInfo/city.do", {areaPId: $(this).val()}, function (response, status, xhr) {
                var result = response.data.city;

                cityDiv.append("<option value='-1'>选择县</option>");

                $.each(result, function (index, value) {
                    var key = value.areaId;
                    var val = value.areaName;
                    var opt = "<option value='" + key + "'>" + val + "</option>";

                    cityDiv.append(opt);
                })
            });
        }
    });

    // 市SELECT事件  provDiv, countryDiv
    cityDiv.change(function () {
        //if ($("#countryEM").attr("code") != "null") {
        //    cityDiv.attr("disabled", true);
        //}
        if (-1 == $(this).val()) {
            $(this).parent().find("em").html("选择县");
            $(this).parent().find("em").attr("code", "null");
        } else {
            $(this).parent().find("em").html($(this).find("option:selected").text());
            $(this).parent().find("em").attr("code", $(this).val());
        }
    });
}

return {
    loadAreaAndMatch:loadAreaAndMatch
}
});